'use server';
 
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { z } from "zod";
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { DateTime } from 'luxon';
import updateRatings from '@/app/lib/ratingCalc';
import { fetchSport, fetchSportSlug, getPlayerRating, createSubmitGameSession } from '@/app/lib/queries';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

const schemaRegister = z.object({
  name: z.string().min(3).max(20, {
    message: "Name must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: State, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const hashedPassword = await bcrypt.hash(formData.get("password") as string, 3);
  try {
    await sql`
      INSERT INTO players (name, email, password)
      VALUES (${formData.get("name") as string}, ${formData.get("email") as string}, ${hashedPassword})
    `;
  } catch (error:any) {
    if (error.code === '23505') {
      return {
        errors: {
          email: ["Email already registered."],
        },
      };
    } else {
      console.log("Database Error.");
    }
  }

  redirect('/login');
}

export type GameState = {
  errors: {
    player1_id?: string[];
    player2_id?: string[];
    score1?: string[];
    score2?: string[];
    sport_id?: string[];
  };
};

const gameSchema = z.object({
  player1_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Player.' }),
  player2_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Player.' }),
  score1: z
    .string()
    .min(1, { message: 'Score 1 is required.' }) // Ensure it's not empty
    .transform((val) => parseFloat(val)) // Transform to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Please enter a score greater than or equal to 0.',
    }), // Validate the transformed value
  score2: z
    .string()
    .min(1, { message: 'Score 2 is required.' }) // Ensure it's not empty
    .transform((val) => parseFloat(val)) // Transform to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Please enter a score greater than or equal to 0.',
    }), // Validate the transformed value
  sport_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Sport.' }),
})
.refine(
  (data) => data.player1_id !== data.player2_id,
  {
    message: 'Player 2 and must be different from Player 1.',
    path: ['player2_id', 'player1_id'],
  }
)

export async function submitGame(prevState: GameState, formData: FormData) {
  const validatedFields = gameSchema.safeParse({
    player1_id: formData.get("player1_id"),
    player2_id: formData.get("player2_id"),
    score1: formData.get("score1"),
    score2: formData.get("score2"),
    sport_id: formData.get("sport_id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: { ...formData },
    };
  }

  let new_ratings = null;
  let old_p1Rating = null;
  let old_p2Rating = null;
  
  try {
    await sql`
      INSERT INTO games (player1_id, player2_id, score1, score2, sport_id, created_at)
      VALUES (
        ${validatedFields.data.player1_id}, 
        ${validatedFields.data.player2_id}, 
        ${validatedFields.data.score1}, 
        ${validatedFields.data.score2}, 
        ${validatedFields.data.sport_id}, 
        ${DateTime.local().toISO()}
      )
    `;
    old_p1Rating = await getPlayerRating(validatedFields.data.player1_id, validatedFields.data.sport_id);
    old_p2Rating = await getPlayerRating(validatedFields.data.player2_id, validatedFields.data.sport_id);
    new_ratings = await updateRatings(validatedFields.data.player1_id, validatedFields.data.player2_id, validatedFields.data.sport_id, validatedFields.data.score1, validatedFields.data.score2);
  } catch (error) {
    console.error(error);
  }
  const sport = await fetchSport(validatedFields.data.sport_id);
  const increment1 = new_ratings?.p1Rating - old_p1Rating;
  const increment2 = new_ratings?.p2Rating - old_p2Rating;

  await createSubmitGameSession(validatedFields.data.player1_id, validatedFields.data.player2_id, validatedFields.data.score1, validatedFields.data.score2, increment1, increment2, new_ratings?.p1Rating, new_ratings?.p2Rating);
  redirect(`/${sport.slug}/thank_you`);
}

export type SportState = {
  errors?: {
    name?: string[];
  };
};

const sportSchema = z.object({
  name: z.string().min(2).max(20, {
    message: "Sport name must be between 2 and 20 characters",
  }),
});

export async function createSport(prevState: SportState, formData: FormData) {
  const validatedFields = sportSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: { ...formData },
    };
  }

  const slug = validatedFields.data.name.toLowerCase().replace(/\s+/g, '');

  try {
    // Check if the slug already exists
    const existingSport = await sql`
      SELECT 1 FROM sports WHERE slug = ${slug};
    `;

    if (existingSport.rows.length > 0) {
      // Return an error if the slug already exists
      return {
        errors: { name: ["Sport already exists."] },
        values: { ...formData },
      };
    }

    // Insert new sport if slug is unique
    await sql`
      INSERT INTO sports (name, slug, created_at)
      VALUES (
        ${validatedFields.data.name}, 
        ${slug},
        ${DateTime.local().toISO()}
      )
    `;
  } catch (error) {
    console.error(error);
    return {
      errors: { name: ["An error occurred while creating the sport."] },
      values: { ...formData },
    };
  }

  // Fetch the sport to redirect
  const sport = await fetchSportSlug(slug);

  redirect(`/${sport.slug}`);
}

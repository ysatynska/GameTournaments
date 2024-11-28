'use server';
 
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { z } from "zod";
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

// ...
 
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
  message?: string;
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
      message: "Missing Fields. Failed to Register.",
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
      return {
        message: "Database Error.",
      };
    }
  }

  redirect('/login');
}

const gameSchema = z.object({
  player1_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Player.' }),
  player2_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Player.' }),
  score1: z
    .string()
    .min(1, { message: 'Score1 is required.' }) // Ensure it's not empty
    .transform((val) => parseFloat(val)) // Transform to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Please enter a score greater than or equal to 0.',
    }), // Validate the transformed value
  score2: z
    .string()
    .min(1, { message: 'Score2 is required.' }) // Ensure it's not empty
    .transform((val) => parseFloat(val)) // Transform to number
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Please enter a score greater than or equal to 0.',
    }), // Validate the transformed value
  sport_id: z.coerce
    .number()
    .gt(0, { message: 'Invalid Sport.' }),
});

export async function submitGame (prevState: State, formData: FormData) {
  const validatedFields = gameSchema.safeParse({
    player1_id: formData.get('player1_id'),
    player2_id: formData.get('player2_id'),
    score1: formData.get('score1'),
    score2: formData.get('score2'),
    sport_id: formData.get('sport_id'),
  });
 console.log(validatedFields.success);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to submit game.',
    };
  }

  try {
    console.log("adding to database")
    await sql`
      INSERT INTO games (player1_id, player2_id, score1, score2, sport_id, created_at)
      VALUES (${formData.get("player1_id") as string}, ${formData.get("player2_id") as string}, ${parseInt(formData.get("score1") as string, 10)}, ${parseInt(formData.get("score2") as string, 10)}, ${formData.get("sport_id") as string}, ${new Date().toISOString().slice(0, 19).replace('T', ' ')})
    `;
  } catch (error) {
    console.log(error)
    return {
      message: 'Database Error: Failed to Submit Game.',
    };
  }
 
  redirect('/');
}
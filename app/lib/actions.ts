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
  message?: string | null;
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
      INSERT INTO players (player_name, email, password)
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
    .gt(0, { message: 'Please enter a score greater than 0.' }),
  player2_id: z.coerce
    .number()
    .gt(0, { message: 'Please enter a score greater than 0.' }),
  score1: z.coerce
    .number()
    .gt(0, { message: 'Please enter a score greater than 0.' }),
  score2: z.coerce
    .number()
    .gt(0, { message: 'Please enter a score greater than 0.' }),
});

export async function submitGame (prevState: State, formData: FormData) {
  const validatedFields = gameSchema.safeParse({
    player1_id: formData.get('player1_id'),
    player2_id: formData.get('player2_id'),
    score1: formData.get('score1'),
    score2: formData.get('score2'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to submit game.',
    };
  }

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
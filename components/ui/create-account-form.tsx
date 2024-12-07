'use client';
import { fontSans } from '@/config/fonts';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import * as InputFields from '@/components/input-fields';
import { registerUserAction, State } from "@/app/lib/actions";

export default function CreateAccountForm() {
  const initialState: State = { errors: {} };
  const [state, formAction] = useFormState(registerUserAction, initialState);

  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg outline outline-red-900 px-6 pb-4 pt-8">
        <h1 className={`${fontSans.className} mb-7 text-2xl text-center`}>
          Please sign up to continue
        </h1>
        <div className="flex flex-col gap-2 space-y-5">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <InputFields.Name/>
          </div>
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <InputFields.Email/>
          </div>
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <InputFields.Password/>
          </div>
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
            ))}
        </div>
        <Button className="mt-7 w-full">
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className='text-center mt-2'>
            <p className="inline">Have an account?</p> <Link href="/login" className="text-blue-600">Log in</Link>
        </div>
      </div>
    </form>
  );
}
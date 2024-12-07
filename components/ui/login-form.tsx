'use client';
import { fontSans } from '@/config/fonts';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from "react-dom";
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import * as InputFields from '@/components/input-fields';
 
export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );
 
  return (
    <form action={formAction}>
      <div className="flex-1 rounded-lg outline outline-red-900 px-6 pb-4 pt-8">
        <h1 className={`${fontSans.className} mb-7 text-2xl text-center`}>
          Please log in to continue
        </h1>
        <div className="flex flex-col gap-2 space-y-6">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <InputFields.Email/>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <InputFields.Password/>
          </div>
        </div>
        <div className="flex h-5 items-end space-x-1" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className='text-center mt-2'>
            <p className="inline">Do not have an account?</p> <Link href="/create_account" className="text-blue-600">Sign up</Link>
        </div>
      </div>
    </form>
  );
}
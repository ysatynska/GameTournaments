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
      <div className="flex-1 shadow-2xl rounded-lg outline outline-red-900 px-6 pb-4 pt-8">
        <h2 className="text-center text-red-900 text-2xl mb-7 font-semibold">
          Please log in to continue
        </h2>
        <div className="flex flex-col gap-2 space-y-6">
          <div className="flex w-full flex-wrap md:flex-nowrap">
            <InputFields.Email/>
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0">
            <InputFields.Password/>
          </div>
        </div>
        <div className="flex h-5 items-end space-x-1 mt-2" aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <Button className="w-full mt-3" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className='text-center mt-2'>
            <p className="inline">Do not have an account?</p> <Link href="/signup" className="text-blue-600">Sign up</Link>
        </div>
      </div>
    </form>
  );
}
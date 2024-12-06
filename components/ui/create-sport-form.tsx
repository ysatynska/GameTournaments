'use client';
import { fontSans } from '@/config/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import * as InputFields from '@/components/input-fields';
import { createSport, SportState } from "@/app/lib/actions";
import { Input, Card } from '@nextui-org/react';

export default function CreateSportForm() {
  const initialState: SportState = { errors: {} };
  const [state, formAction] = useFormState(createSport, initialState);

  // inpurt.toLowerCase().replace(/\s+/g, '')
  return (
    <div className="min-h-full flex justify-center items-center">
      <Card className="p-6 max-w-4xl rounded-lg shadow-md w-2/4">
        <h2 className="text-center text-red-900 text-3xl font-bold mb-10">
          Create New Sport
        </h2>
        <form action={formAction}>
          <div className="grid gap-6">
              <div className="flex flex-col">
                <div>
                  <InputFields.SportName/>
                </div>
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                ))}
            </div>
            <div>
                <Button className="w-full mt-3 bg-red-900 text-white flex items-center justify-center">
                    Add Sport
                </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
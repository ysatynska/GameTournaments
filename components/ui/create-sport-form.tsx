'use client';
import { Button } from './button';
import { useFormState } from 'react-dom';
import * as InputFields from '@/components/input-fields';
import { createSport, SportState } from "@/app/lib/actions";
import { Card } from '@nextui-org/react';

export default function CreateSportForm() {
  const initialState: SportState = { errors: {} };
  const [state, formAction] = useFormState(createSport, initialState);

  return (
    <div className="min-h-full flex justify-center items-center">
      <Card className="p-6 max-w-4xl rounded-lg shadow-2xl w-full md:w-2/4 outline outline-red-900">
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
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                ))}
            </div>
            <div>
                <Button className="w-full bg-red-900 text-white flex items-center justify-center">
                    Add Sport
                </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
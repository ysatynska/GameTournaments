"use client";
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
      <div>
        <p>Hello, {session.user?.name}!</p>
        {/* Access other user data from session.user */}
      </div>
    );
  }

  return <p>You are not signed in.</p>;
}
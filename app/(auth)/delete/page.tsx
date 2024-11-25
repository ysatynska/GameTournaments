// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { auth } from '@/app/auth';

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    return (
      <a href="/login">Login to continue</a>
    )
  } else {
    return (
      <div>
        <h2>User Information:</h2>
        <ul>
          {Object.entries(session.user).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

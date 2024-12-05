import { Suspense } from 'react';
import { SportHomeAsync } from '@/components/ui/sport_home_async';

export function SportHomePage({ sportSlug }: any) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SportHomeAsync sportSlug={sportSlug} />
        </Suspense>
    );
}

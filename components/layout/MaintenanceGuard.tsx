"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading } = useAuth();
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Real-time listener for maintenance setting
        const docRef = doc(db, "settings", "home");
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                setMaintenanceMode(data.general?.maintenanceMode || false);
            }
            setIsChecking(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (authLoading || isChecking) return;

        const isPublicPath =
            pathname.startsWith('/maintenance') ||
            pathname.startsWith('/admin') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/_next') ||
            pathname.startsWith('/static');

        // If maintenance is ON
        if (maintenanceMode) {
            // If user is Admin -> ALLOW
            if (user) return;

            // If already on maintenance page -> ALLOW
            if (pathname === '/maintenance') return;

            // If on admin login page -> ALLOW (handled by startsWith '/admin')
            if (pathname.startsWith('/admin')) return;

            // Otherwise -> REDIRECT TO MAINTENANCE
            router.push('/maintenance');
        } else {
            // If maintenance is OFF and user is on maintenance page -> REDIRECT TO HOME
            if (pathname === '/maintenance') {
                router.push('/');
            }
        }
    }, [maintenanceMode, user, authLoading, isChecking, pathname, router]);

    // Optional: Show nothing while checking initial state to prevent flash
    // But allowing children to render (and potential flash) is better for UX than a blank white screen
    // if the check is fast. For now, we render children. 

    return <>{children}</>;
}

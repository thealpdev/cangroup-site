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
                const mode = data.general?.maintenanceMode;
                // Handle boolean or string "true" just in case
                setMaintenanceMode(mode === true || mode === 'true');
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

    if (authLoading || isChecking) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white text-stone-900">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-stone-200 border-t-[#C8102E] animate-spin"></div>
                    <span className="text-xs font-bold tracking-widest uppercase">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    // Strict Guard: Prevent rendering children if maintenance is active and user is blocked
    // This prevents the "flash" of content before the useEffect redirect happens
    if (maintenanceMode) {
        const isPublicPath =
            pathname === '/maintenance' ||
            pathname.startsWith('/admin') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/_next') ||
            pathname.startsWith('/static');

        if (!user && !isPublicPath) {
            return null; // Or keep showing loader
        }
    }

    return <>{children}</>;
}

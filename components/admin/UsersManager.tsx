"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { initializeApp, getApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, firebaseConfig } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Trash, UserPlus, Shield } from 'lucide-react';

// Removed local config definition, utilizing shared config from @/lib/firebase
// to ensure consistency and use the same Env vars.

interface AdminUser {
    id: string; // email as id or uid
    email: string;
    role: string;
    createdAt?: any;
}

export default function UsersManager() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [creating, setCreating] = useState(false);

    // Fetch users list (We maintain a redundant 'admins' collection for listing purposes)
    // because Client SDK cannot list all users from Auth directly.
    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "admins"));
            const fetchedUsers: AdminUser[] = [];
            querySnapshot.forEach((doc) => {
                fetchedUsers.push({ id: doc.id, ...doc.data() } as AdminUser);
            });
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        // Secondary App Pattern to avoid logging out the current admin
        let secondaryApp;
        try {
            const appName = "secondaryApp-" + new Date().getTime();
            secondaryApp = initializeApp(firebaseConfig, appName);
            const secondaryAuth = getAuth(secondaryApp);

            // 1. Create in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, newEmail, newPassword);
            const user = userCredential.user;

            // 2. Create in Firestore 'admins' collection for listing
            await setDoc(doc(db, "admins", user.uid), {
                email: user.email,
                role: 'admin',
                createdAt: new Date().toISOString()
            });

            alert("New Admin User Created Successfully");
            setNewEmail('');
            setNewPassword('');
            fetchUsers();

            // Cleanup
            await secondaryAuth.signOut(); // Just in case
        } catch (error: any) {
            console.error("Error creating user:", error);
            alert("Error: " + error.message);
        } finally {
            if (secondaryApp) {
                await deleteApp(secondaryApp);
            }
            setCreating(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!confirm("Are you sure? This removes their dashboard access listing (User invalidation requires admin SDK, they might still be able to login until you disable them in console).")) return;

        try {
            await deleteDoc(doc(db, "admins", userId));
            // Note: We cannot delete from Auth via Client SDK. 
            alert("User removed from list. IMPORTANT: Manually disable/delete this user in Firebase Console Authentication tab to prevent login.");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            {/* Create User Form */}
            <Card className="border-t-4 border-t-[#C8102E] h-fit">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <UserPlus className="h-5 w-5 text-[#C8102E]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">Access Control</span>
                    </div>
                    <CardTitle className="text-xl font-bold uppercase tracking-tight">Add New Admin</CardTitle>
                    <CardDescription>
                        Create a new user with full access to this dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateUser} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                value={newEmail}
                                onChange={e => setNewEmail(e.target.value)}
                                placeholder="new.admin@canmarkt.de"
                                className="rounded-none focus-visible:ring-[#C8102E]"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Temporary Password</Label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="rounded-none focus-visible:ring-[#C8102E]"
                                required
                                minLength={6}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={creating}
                            className="w-full bg-[#C8102E] hover:bg-[#A00C24] text-white font-bold uppercase tracking-widest rounded-none"
                        >
                            {creating ? <Loader2 className="animate-spin" /> : "Create Account"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* User List */}
            <Card className="h-fit">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-stone-900" />
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Authorized Personnel</span>
                    </div>
                    <CardTitle className="text-xl font-bold uppercase tracking-tight">Active Admins</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin h-8 w-8 text-[#C8102E]" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {users.length === 0 && <p className="text-stone-500 italic">No other admins found.</p>}
                            {users.map(user => (
                                <div key={user.id} className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200">
                                    <div>
                                        <div className="font-bold text-stone-900">{user.email}</div>
                                        <div className="text-xs text-stone-500 uppercase tracking-wider">{user.role}</div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-stone-400 hover:text-red-600 hover:bg-transparent"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Trash, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Partner {
    id: string;
    imageUrl: string;
    name?: string;
}

export default function PartnersManager() {
    const [loading, setLoading] = useState(false);
    const [partners, setPartners] = useState<Partner[]>([]);
    const [newPartnerImage, setNewPartnerImage] = useState<string[]>([]);

    // Real-time subscription
    useEffect(() => {
        const q = query(collection(db, "partners"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Partner[];
            setPartners(data);
        });
        return () => unsubscribe();
    }, []);

    const handleAddPartner = async () => {
        if (newPartnerImage.length === 0) return;
        try {
            setLoading(true);
            await addDoc(collection(db, "partners"), {
                imageUrl: newPartnerImage[0],
                createdAt: new Date().toISOString()
            });
            setNewPartnerImage([]);
            alert("Partner added!");
        } catch (error) {
            console.error("Error adding partner:", error);
            alert("Failed to add partner.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteDoc(doc(db, "partners", id));
        } catch (error) {
            console.error("Error deleting partner:", error);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Add New Partner */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Partner</CardTitle>
                    <CardDescription>Upload a partner/brand logo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ImageUpload
                        value={newPartnerImage}
                        onChange={(url) => setNewPartnerImage([url])}
                        onRemove={() => setNewPartnerImage([])}
                        disabled={loading}
                    />
                    <Button
                        onClick={handleAddPartner}
                        disabled={loading || newPartnerImage.length === 0}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Partner Logo
                    </Button>
                </CardContent>
            </Card>

            {/* List Partners */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {partners.map(partner => (
                    <div key={partner.id} className="relative group bg-white border rounded-lg p-4 flex items-center justify-center aspect-square shadow-sm">
                        <div className="relative w-full h-full">
                            <Image
                                src={partner.imageUrl}
                                alt="Partner"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <button
                            onClick={() => handleDelete(partner.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

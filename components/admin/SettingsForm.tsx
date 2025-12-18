"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/admin/ImageUpload';
import { Loader2 } from 'lucide-react';

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState<string[]>([]);
    const [heroImage, setHeroImage] = useState<string[]>([]); // Keeping state name for simplicity, but mapping to hero_banner

    // Load initial data
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.logo) setLogo([data.logo]);
                    if (data.hero_banner) setHeroImage([data.hero_banner]);
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        try {
            setLoading(true);
            await setDoc(doc(db, "settings", "general"), {
                logo: logo[0] || '',
                hero_banner: heroImage[0] || '',
                updatedAt: new Date().toISOString()
            }, { merge: true });
            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>General Site Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-4">
                        <Label>Site Logo</Label>
                        <p className="text-sm text-gray-500">Upload your brand logo (PNG/SVG recommended).</p>
                        <ImageUpload
                            value={logo}
                            onChange={(url) => setLogo([url])}
                            onRemove={() => setLogo([])}
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Hero Banner Image</Label>
                        <p className="text-sm text-gray-500">Main image displayed at the top of the homepage.</p>
                        <ImageUpload
                            value={heroImage}
                            onChange={(url) => setHeroImage([url])}
                            onRemove={() => setHeroImage([])}
                            disabled={loading}
                        />
                    </div>

                    <Button onClick={handleSave} disabled={loading} size="lg">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}

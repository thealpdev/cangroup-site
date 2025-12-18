"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Trash2, Loader2, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    disabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange: (value: string) => void;
    // eslint-disable-next-line no-unused-vars
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        try {
            setLoading(true);
            const file = acceptedFiles[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'canmarkt_upload');

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            if (!cloudName) throw new Error("Cloudinary Cloud Name not found");

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Upload failed");
            }

            const data = await response.json();
            onChange(data.secure_url);
        } catch (error) {
            console.error('[IMAGE_UPLOAD_ERROR]', error);
            alert("Upload failed. Check console.");
        } finally {
            setLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.webp', '.jpg'] },
        disabled: disabled || loading,
        maxFiles: 1
    });

    return (
        <div className="space-y-6">
            {/* Gallery Grid */}
            {value.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {value.map((url) => (
                        <div key={url} className="group relative aspect-square bg-stone-100 border border-stone-200 overflow-hidden rounded-sm">
                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    onClick={() => onRemove(url)}
                                    className="bg-red-600 text-white p-2 rounded-sm shadow-md hover:bg-red-700 transition"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <Image
                                fill
                                className="object-cover"
                                alt="Product Image"
                                src={url}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={`
                    relative group border-2 border-dashed
                    flex flex-col items-center justify-center gap-4 py-16 px-4
                    transition-all duration-300 cursor-pointer
                    ${isDragActive
                        ? 'border-[#C8102E] bg-[#C8102E]/5'
                        : 'border-stone-300 bg-stone-50 hover:bg-stone-100 hover:border-stone-400'
                    }
                    ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <input {...getInputProps()} />

                {loading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-12 w-12 animate-spin text-[#C8102E]" />
                        <p className="text-sm font-bold uppercase tracking-widest text-stone-500">Uploading...</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                            <UploadCloud className={`h-8 w-8 ${isDragActive ? 'text-[#C8102E]' : 'text-stone-400'}`} />
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-sm font-bold uppercase tracking-widest text-stone-700">
                                {isDragActive ? "Drop to upload" : "Click or Drag Image"}
                            </p>
                            <p className="text-xs text-stone-500 font-medium">
                                SVG, PNG, JPG or WEBP (MAX. 5MB)
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ImageUpload;

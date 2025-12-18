"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, Trash, Loader2 } from 'lucide-react';
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
            formData.append('upload_preset', 'canmarkt_upload'); // Unsigned preset

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            if (!cloudName) {
                throw new Error("Cloudinary Cloud Name not found");
            }

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Cloudinary Error:", errorData);
                throw new Error(errorData.error?.message || "Upload failed");
            }

            const data = await response.json();
            onChange(data.secure_url);
        } catch (error) {
            console.error('[IMAGE_UPLOAD_ERROR]', error);
            alert("Error uploading image. Please check console for details.");
        } finally {
            setLoading(false);
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.webp', '.jpg']
        },
        disabled: disabled || loading,
        maxFiles: 1
    });

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                            >
                                <Trash className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                            sizes="200px"
                        />
                    </div>
                ))}
            </div>

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-lg p-10 
          flex flex-col items-center justify-center gap-4 
          cursor-pointer hover:opacity-75 transition
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
          ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />
                {loading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
                ) : (
                    <ImagePlus className="h-10 w-10 text-gray-400" />
                )}
                <div className="text-sm text-gray-600">
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop an image here, or click to select files</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;

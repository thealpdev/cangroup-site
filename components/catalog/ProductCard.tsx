"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
    id: string;
    name_de: string;
    description_de: string;
    category: string;
    brand: string;
    images: string[];
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-stone-50 dark:bg-stone-900">
            <div className="relative aspect-square overflow-hidden bg-white">
                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name_de}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No Image</span>
                    </div>
                )}
                <div className="absolute top-2 left-2">
                    {product.brand === 'canadam' && (
                        <Badge className="bg-red-600 hover:bg-red-700">CAN GROUP</Badge>
                    )}
                </div>
            </div>
            <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category || 'Kitchen'}</div>
                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-2">{product.name_de}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {product.description_de}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
}

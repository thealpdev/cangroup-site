import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductDetailView from '@/components/product/ProductDetailView';
import { Metadata } from 'next';

// Force dynamic rendering to ensure new products appear immediately
export const dynamic = "force-dynamic";

async function getProduct(id: string) {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as any;
        }
        return null;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null; // Return null on error
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const product = await getProduct(params.id);

    if (!product) {
        return {
            title: 'Ürün Bulunamadı | CanMarkt',
        };
    }

    const title = product.name_tr || product.name_en || 'Ürün Detayı';
    const description = (product.description_tr || product.description_en || '').slice(0, 160);
    const images = product.images?.[0] ? [product.images[0]] : [];

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: images,
        }
    };
}

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const product = await getProduct(params.id);

    if (!product) {
        return notFound();
    }

    return <ProductDetailView product={product} />;
}

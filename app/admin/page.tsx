import ProductForm from '@/components/admin/ProductForm';

export default function AdminPage() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <ProductForm />
            </div>
        </div>
    );
}

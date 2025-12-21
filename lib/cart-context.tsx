"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: string;
    currency: string;
    image: string;
    quantity: number;
    brand: string;
    productCode: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (product: any) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    totalItems: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product: any) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, {
                id: product.id,
                name: product.name_de || product.name_en || 'Product',
                price: product.price,
                currency: product.currency,
                image: product.images?.[0] || product.image || '',
                quantity: 1,
                brand: product.brand,
                productCode: product.productCode
            }];
        });
        setIsOpen(true); // Open cart when adding
    };

    const removeItem = (id: string) => {
        setItems(current => current.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

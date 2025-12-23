"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
    id: string;
    productNumber: string;
    name_tr: string;
    price: string;
    image?: string;
    slug: string;
}

interface WishlistContextType {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleItem: (item: WishlistItem) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('wishlist');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('wishlist', JSON.stringify(items));
        }
    }, [items, isLoaded]);

    const addItem = (item: WishlistItem) => {
        setItems(prev => {
            if (prev.some(i => i.id === item.id)) return prev;
            return [...prev, item];
        });
    };

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const isInWishlist = (id: string) => {
        return items.some(i => i.id === id);
    };

    const toggleItem = (item: WishlistItem) => {
        if (isInWishlist(item.id)) {
            removeItem(item.id);
        } else {
            addItem(item);
        }
    };

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggleItem }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}

"use client";

import { ShieldCheck, Truck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: ShieldCheck,
        title: "Premium Quality",
        description: "Hand-selected steel and craftsmanship for professional durability."
    },
    {
        icon: Truck,
        title: "Global Shipping",
        description: "Reliable logistics partners ensuring safe delivery worldwide."
    },
    {
        icon: Headphones,
        title: "Expert Support",
        description: "Dedicated team available 24/7 for your wholesale inquiries."
    }
];

export default function Features() {
    return (
        <div className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="text-center space-y-4 group"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-50 text-stone-900 mb-4 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
                                <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-serif text-stone-900">{feature.title}</h3>
                            <p className="text-stone-500 leading-relaxed max-w-sm mx-auto font-light">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

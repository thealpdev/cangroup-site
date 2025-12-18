"use client";

import { ShieldCheck, Truck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: ShieldCheck,
        title: "Swiss Precision",
        description: "Authentic craftsmanship ensuring lifetime durability."
    },
    {
        icon: Truck,
        title: "Global Logistics",
        description: "Fast, secure, and insured shipping to any destination."
    },
    {
        icon: Headphones,
        title: "Pro Service",
        description: "Dedicated B2B support for partners and wholesalers."
    }
];

export default function Features() {
    return (
        <div className="py-24 bg-stone-50 border-y border-stone-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="text-center px-8 py-12 group hover:bg-white transition-colors duration-300"
                        >
                            <div className="inline-flex items-center justify-center mb-6 text-[#C8102E]">
                                <feature.icon className="w-10 h-10" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 mb-3 group-hover:text-[#C8102E] transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-stone-600 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

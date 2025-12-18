"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
    return (
        <div className="bg-[#111] py-32 relative text-center">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
                        Elevate Your Inventory
                    </h2>
                    <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-xl mx-auto">
                        Join our network of professional partners. Exclusive b2b pricing and priority support.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-0 pt-8">
                        <Link href="/contact" className="px-10 py-5 bg-[#C8102E] text-white font-bold uppercase tracking-widest hover:bg-white hover:text-[#C8102E] transition-colors w-full sm:w-auto">
                            Become a Partner
                        </Link>
                        <Link href="/about" className="px-10 py-5 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
                            Learn More
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

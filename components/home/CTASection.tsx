"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
    return (
        <div className="bg-stone-900 py-32 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
                        Ready to Elevate Your Business?
                    </h2>
                    <p className="text-stone-400 text-lg font-light leading-relaxed">
                        Join hundreds of satisfied partners and access our exclusive wholesale catalog today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/contact" className="px-8 py-4 bg-white text-stone-900 font-medium uppercase tracking-widest hover:bg-stone-200 transition-colors w-full sm:w-auto">
                            Become a Partner
                        </Link>
                        <Link href="/about" className="px-8 py-4 border border-stone-700 text-white font-medium uppercase tracking-widest hover:bg-stone-800 transition-colors w-full sm:w-auto">
                            Learn More
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

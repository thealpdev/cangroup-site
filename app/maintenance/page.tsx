"use client";

import { Wrench } from 'lucide-react';
import Image from 'next/image';

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="relative z-10 text-center space-y-8 max-w-lg">
                <div className="w-24 h-24 mx-auto bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-2xl animate-pulse">
                    <Wrench className="w-10 h-10 text-[#C8102E]" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
                        We Are Currently <br />
                        <span className="text-[#C8102E] italic">Under Maintenance</span>
                    </h1>
                    <p className="text-stone-400 text-lg leading-relaxed">
                        We are upgrading our experience to serve you better.
                        <br />
                        Please check back shortly.
                    </p>
                </div>

                <div className="pt-8 border-t border-white/10 w-full">
                    <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                        <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-ping"></span>
                        System Upgrade In Progress
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 text-stone-600 text-xs tracking-widest uppercase">
                &copy; CAN GROUP
            </div>
        </div>
    );
}

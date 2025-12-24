// Geometric Ice Crystal Pattern Background
export default function IceCrystalPattern() {
    return (
        <svg
            className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="ice-crystal" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    {/* Hexagon - Ice Crystal Shape */}
                    <path
                        d="M 50 10 L 70 25 L 70 50 L 50 65 L 30 50 L 30 25 Z"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        fill="none"
                        className="text-stone-400"
                    />
                    {/* Inner lines - Cold steel */}
                    <line x1="50" y1="10" x2="50" y2="65" stroke="currentColor" strokeWidth="0.3" className="text-blue-200" />
                    <line x1="30" y1="25" x2="70" y2="50" stroke="currentColor" strokeWidth="0.3" className="text-blue-200" />
                    <line x1="30" y1="50" x2="70" y2="25" stroke="currentColor" strokeWidth="0.3" className="text-blue-200" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ice-crystal)" />
        </svg>
    );
}

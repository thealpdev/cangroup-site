"use client";

import Snowfall from 'react-snowfall';

export default function SnowEffect() {
    return (
        <Snowfall
            color="#fff"
            snowflakeCount={400}  // KAR FIRTINASI! (200'den 400'e)
            speed={[1, 3]}        // Daha hızlı düşüş
            wind={[-1, 2]}        // Rüzgar efekti
            radius={[0.5, 4.0]}   // Daha büyük ve küçük karışık
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                pointerEvents: 'none'
            }}
        />
    );
}

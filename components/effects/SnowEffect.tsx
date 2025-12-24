"use client";

import Snowfall from 'react-snowfall';

export default function SnowEffect() {
    return (
        <Snowfall
            color="#fff"
            snowflakeCount={80}  // Azaltıldı (200'den 80'e)
            speed={[0.5, 1.0]}   // Yavaşlatıldı
            wind={[-0.5, 0.5]}   // Hafif rüzgar
            radius={[0.5, 2.0]}  // Daha küçük taneler
            style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                zIndex: 9999,
                pointerEvents: 'none',
                opacity: 0.4  // Daha subtle
            }}
        />
    );
}

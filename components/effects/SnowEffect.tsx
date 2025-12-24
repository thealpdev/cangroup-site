"use client";

import Snowfall from 'react-snowfall';

export default function SnowEffect() {
    return (
        <Snowfall
            color="#fff"
            snowflakeCount={150}  // Azaltıldı (400'den 150'ye)
            speed={[1, 3]}
            wind={[-1, 2]}
            radius={[0.5, 4.0]}
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

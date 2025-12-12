import React from 'react';
import { motion } from 'framer-motion';

interface GlowOrbsProps {
    count?: number;
}

const orbColors = [
    { bg: '#c9a9e9', shadow: 'rgba(201, 169, 233, 0.5)' }, // Lilac
    { bg: '#64ffda', shadow: 'rgba(100, 255, 218, 0.5)' }, // Aqua
    { bg: '#ffd700', shadow: 'rgba(255, 215, 0, 0.5)' },   // Gold
];

const orbConfigs = [
    { size: 300, x: '10%', y: '20%', duration: 20 },
    { size: 250, x: '80%', y: '30%', duration: 25 },
    { size: 200, x: '20%', y: '70%', duration: 18 },
    { size: 350, x: '70%', y: '80%', duration: 22 },
    { size: 180, x: '50%', y: '50%', duration: 30 },
];

export const GlowOrbs: React.FC<GlowOrbsProps> = ({ count = 5 }) => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {orbConfigs.slice(0, count).map((config, index) => {
                const color = orbColors[index % orbColors.length];

                return (
                    <motion.div
                        key={index}
                        className="absolute rounded-full blur-3xl opacity-30"
                        style={{
                            width: config.size,
                            height: config.size,
                            left: config.x,
                            top: config.y,
                            background: `radial-gradient(circle, ${color.bg} 0%, transparent 70%)`,
                            boxShadow: `0 0 100px ${color.shadow}`,
                        }}
                        animate={prefersReducedMotion ? {} : {
                            x: [0, 50, -30, 0],
                            y: [0, -40, 30, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{
                            duration: config.duration,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default GlowOrbs;

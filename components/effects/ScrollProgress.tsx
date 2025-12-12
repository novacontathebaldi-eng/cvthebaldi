import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #c9a9e9, #64ffda, #ffd700)',
            }}
        />
    );
};

export default ScrollProgress;

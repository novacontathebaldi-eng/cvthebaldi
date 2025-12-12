import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    const trailRef = useRef<{ x: number; y: number }[]>([]);

    useEffect(() => {
        // Check if it's a touch device
        const checkTouchDevice = () => {
            const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            setIsTouchDevice(isTouchCapable && hasCoarsePointer);
        };

        checkTouchDevice();

        if (isTouchDevice) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const updateCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            // Update trail
            trailRef.current.push({ x: e.clientX, y: e.clientY });
            if (trailRef.current.length > 5) {
                trailRef.current.shift();
            }
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleHoverStart = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hoverable')
            ) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => setIsHovering(false);

        document.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleHoverStart);
        document.addEventListener('mouseout', handleHoverEnd);

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            document.removeEventListener('mousemove', updateCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleHoverStart);
            document.removeEventListener('mouseout', handleHoverEnd);
            document.body.style.cursor = 'auto';
        };
    }, [isTouchDevice]);

    // Don't render on touch devices
    if (isTouchDevice) return null;

    return (
        <>
            {/* Outer circle */}
            <motion.div
                className={`cursor-outer ${isHovering ? 'hover-link' : ''}`}
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    mass: 0.1,
                }}
            />

            {/* Inner dot */}
            <motion.div
                className={`cursor-inner ${isHovering ? 'hover-link' : ''}`}
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isHovering ? 0.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.1,
                }}
            />

            {/* Trail particles */}
            {trailRef.current.map((trail, index) => (
                <motion.div
                    key={index}
                    className="fixed w-1 h-1 rounded-full bg-neon-aqua/50 pointer-events-none z-[9998]"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{
                        x: trail.x - 2,
                        y: trail.y - 2,
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                />
            ))}
        </>
    );
};

export default CustomCursor;

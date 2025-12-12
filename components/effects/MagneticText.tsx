import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface MagneticTextProps {
    text: string;
    className?: string;
    strength?: number;
}

interface LetterPosition {
    x: number;
    y: number;
}

export const MagneticText: React.FC<MagneticTextProps> = ({
    text,
    className = '',
    strength = 30,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Check if it's a touch device
        const checkTouchDevice = () => {
            const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            setIsTouchDevice(isTouchCapable && hasCoarsePointer);
        };

        checkTouchDevice();

        // Initialize letter positions
        setLetterPositions(text.split('').map(() => ({ x: 0, y: 0 })));
    }, [text]);

    useEffect(() => {
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isTouchDevice]);

    // Render simple text on touch devices
    if (isTouchDevice) {
        return (
            <span className={className}>
                {text}
            </span>
        );
    }

    return (
        <div ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
            {text.split('').map((letter, index) => (
                <MagneticLetter
                    key={index}
                    letter={letter}
                    mousePosition={mousePosition}
                    strength={strength}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
};

interface MagneticLetterProps {
    letter: string;
    mousePosition: { x: number; y: number };
    strength: number;
    containerRef: React.RefObject<HTMLDivElement>;
}

const MagneticLetter: React.FC<MagneticLetterProps> = ({
    letter,
    mousePosition,
    strength,
    containerRef,
}) => {
    const letterRef = useRef<HTMLSpanElement>(null);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    useEffect(() => {
        if (!letterRef.current || !containerRef.current) {
            x.set(0);
            y.set(0);
            return;
        }

        const letterRect = letterRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const letterCenterX = letterRect.left - containerRect.left + letterRect.width / 2;
        const letterCenterY = letterRect.top - containerRect.top + letterRect.height / 2;

        const deltaX = mousePosition.x - letterCenterX;
        const deltaY = mousePosition.y - letterCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const maxDistance = 100;

        if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * strength;
            const angle = Math.atan2(deltaY, deltaX);

            // Push letter away from cursor
            x.set(-Math.cos(angle) * force);
            y.set(-Math.sin(angle) * force);
        } else {
            x.set(0);
            y.set(0);
        }
    }, [mousePosition, strength, x, y, containerRef]);

    if (letter === ' ') {
        return <span className="inline-block">&nbsp;</span>;
    }

    return (
        <motion.span
            ref={letterRef}
            className="inline-block"
            style={{ x, y }}
        >
            {letter}
        </motion.span>
    );
};

export default MagneticText;

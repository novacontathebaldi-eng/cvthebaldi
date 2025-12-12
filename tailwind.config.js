/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'serif'],
            },
            colors: {
                // Legacy colors (mantidos para compatibilidade)
                primary: '#1a1a1a',
                secondary: '#6b7280',
                accent: '#d4bbb0',

                // New 2025 Cosmos Dark Theme
                cosmos: {
                    dark: '#0a0e27',
                    mid: '#1a1f3a',
                    light: '#2d1b4e',
                },
                neon: {
                    lilac: '#c9a9e9',
                    aqua: '#64ffda',
                    gold: '#ffd700',
                },
                text: {
                    light: '#f8f9fa',
                    muted: '#b8c5d6',
                },
                glass: {
                    light: 'rgba(255, 255, 255, 0.1)',
                    border: 'rgba(255, 255, 255, 0.2)',
                },
            },
            backgroundImage: {
                'cosmos-gradient': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b4e 100%)',
                'cosmos-radial': 'radial-gradient(ellipse at center, #1a1f3a 0%, #0a0e27 70%)',
                'text-gradient': 'linear-gradient(90deg, #c9a9e9 0%, #64ffda 50%, #ffd700 100%)',
                'neon-gradient': 'linear-gradient(90deg, #c9a9e9, #64ffda)',
                'card-gradient': 'linear-gradient(135deg, rgba(201,169,233,0.2) 0%, rgba(100,255,218,0.1) 100%)',
            },
            boxShadow: {
                'glow-lilac': '0 0 30px rgba(201, 169, 233, 0.4)',
                'glow-aqua': '0 0 30px rgba(100, 255, 218, 0.4)',
                'glow-gold': '0 0 30px rgba(255, 215, 0, 0.4)',
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            },
            animation: {
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            backdropBlur: {
                'glass': '20px',
            },
        }
    },
    plugins: [],
}

import { ThemeConfig } from '../types';

export const defaultTheme: ThemeConfig = {
    colors: {
        primary: '#3B82F6',   // blue-500
        secondary: '#6B7280', // gray-500
        accent: '#10B981',    // emerald-500
        background: '#F9FAFB', // gray-50
        text: '#1F2937',      // gray-800
        textLight: '#6B7280', // gray-500
        textDark: '#111827',  // gray-900
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: {
            base: '1rem',
            sm: '0.875rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },
    spacing: {
        base: '1rem',
        sm: '0.5rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
    components: {
        heading: {
            h1: 'text-4xl font-bold mb-4',
            h2: 'text-3xl font-semibold mb-3',
            h3: 'text-2xl font-medium mb-2',
            paragraph: 'text-base mb-4',
        },
        section: {
            base: 'py-12',
            variants: {
                light: 'bg-gray-50',
                dark: 'bg-gray-900 text-white',
                primary: 'bg-primary-50',
            },
        },
        container: {
            base: 'mx-auto px-4',
            sizes: {
                sm: 'max-w-3xl',
                md: 'max-w-5xl',
                lg: 'max-w-7xl',
            },
        },
        card: {
            base: 'rounded-lg overflow-hidden',
            variants: {
                light: 'bg-white shadow',
                dark: 'bg-gray-800 text-white',
                bordered: 'border border-gray-200',
            },
            sizes: {
                sm: 'p-4',
                md: 'p-6',
                lg: 'p-8',
            },
        },
        button: {
            base: 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
            variants: {
                primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
                secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
                outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
                white: 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
            },
            sizes: {
                sm: 'px-3 py-2 text-sm',
                md: 'px-4 py-2 text-base',
                lg: 'px-6 py-3 text-lg',
            },
        },
        grid: {
            base: 'grid',
            cols: {
                '1': 'grid-cols-1',
                '2': 'grid-cols-2',
                '3': 'grid-cols-3',
                '4': 'grid-cols-4',
            },
            gap: {
                sm: 'gap-4',
                md: 'gap-6',
                lg: 'gap-8',
            },
        },
        flex: {
            base: 'flex',
            center: 'items-center justify-center',
            between: 'items-center justify-between',
            gap: {
                sm: 'gap-4',
                md: 'gap-6',
                lg: 'gap-8',
            },
        },
    },
}; 
import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  safelist: ['dark'],
  prefix: '',

  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: '#F8D7DA', // Background color for destructive
          foreground: '#C71C26', // Text color for destructive
        },
        success: {
          DEFAULT: '#DAF7E5', // Background color for success
          foreground: '#279866', // Text color for success
        },
        error: {
          // New error color
          DEFAULT: '#FF5731', // Background color for error
          foreground: '#FFFFFF', // Text color for error
        },
        warning: {
          DEFAULT: '#FFF3CD', // Background color for warning
          foreground: '#856404', // Text color for warning
        },
        info: {
          DEFAULT: '#D6F4F9', // Background color for info
          foreground: '#06719F', // Text color for info
        },
        flipkart: {
          DEFAULT: '#FDF6E3',
          foreground: '#BDAE29',
        },
        myntra: {
          DEFAULT: '#FED7CF',
          foreground: '#985041',
        },
        amazon: {
          DEFAULT: '#FEEBC3',
          foreground: '#8E691D',
        },
        woocommerce: {
          DEFAULT: '#E5CFFF',
          foreground: '#4F2584',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'collapsible-up': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        ping: {
          '75%, 90%': { transform: 'scale(1.2)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'collapsible-down': 'collapsible-down 0.2s ease-in-out',
        'collapsible-up': 'collapsible-up 0.2s ease-in-out',
        spin: 'spin 1s linear infinite',
        ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [animate],
}

export default config

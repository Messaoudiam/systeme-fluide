/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Système Fluide Color Palette
        'sf-black': '#000000',
        'sf-gray-darkest': '#1A1A1A',
        'sf-gray-dark': '#2D2D2D',
        'sf-gray-medium': '#696969',
        'sf-gray-light': '#C8C8C8',
        'sf-off-white': '#F5F5F5',
        'sf-white': '#FFFFFF',
        
        // Keep standard colors for compatibility
        black: '#000000',
        'gray-darkest': '#1A1A1A',
        'gray-dark': '#2D2D2D',
        'gray-medium': '#696969',
        'gray-light': '#C8C8C8',
        'off-white': '#F5F5F5',
        white: '#FFFFFF',
        
        // Functional colors with enhanced variants
        primary: {
          50: '#f8fafc',
          500: '#000000',
          900: '#1A1A1A'
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#059669',
          600: '#047857',
          900: '#064e3b'
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#d97706',
          600: '#c2610c',
          900: '#78350f'
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#dc2626',
          600: '#c53030',
          900: '#7f1d1d'
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
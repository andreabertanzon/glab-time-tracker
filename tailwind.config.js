/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#4cd9e0',
        'on-primary': '#003739',
        'primary-container': '#004f52',
        'on-primary-container': '#6ff6fc',
        secondary: '#b1cccd',
        'on-secondary': '#1b3436',
        'secondary-container': '#324b4c',
        'on-secondary-container': '#cce8e9',
        tertiary: '#b5c7e9',
        'on-tertiary': '#1f314c',
        'tertiary-container': '#364764',
        'on-tertiary-container': '#d5e3ff',
        error: '#ff0000',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        background: '#191c1c',
        'on-background': '#e0e3e3',
        surface: '#191c1c',
        'on-surface': '#e0e3e3',
        'surface-variant': '#3f4949',
        'on-surface-variant': '#bec8c9',
        outline: '#899393'
      },
      textColor: {
        primary: '#4cd9e0',
        'on-primary': '#003739',
        'primary-container': '#004f52',
        'on-primary-container': '#6ff6fc',
        secondary: '#b1cccd',
        'on-secondary': '#1b3436',
        'secondary-container': '#324b4c',
        'on-secondary-container': '#cce8e9',
        tertiary: '#1e1e1e',
        'on-tertiary': '#1f314c',
        'tertiary-container': '#364764',
        'on-tertiary-container': '#d5e3ff',
        error: '#ff0000',
        'on-error': '#690005',
        'error-container': '#93000a',
        'on-error-container': '#ffdad6',
        background: '#191c1c',
        'on-background': '#e0e3e3',
        surface: '#ff0000',
        'on-surface': '#e0e3e3',
        'surface-variant': '#3f4949',
        'on-surface-variant': '#bec8c9',
        outline: '#899393',
        'container-dark': '#1E1E1E',
        'container-blue': '#C8E3E4',
        'card-dark': '#8091B1',
        'container-tertiary': '#4A6364',
        'input-dark': '#414141'
      }
    }
  },
  plugins: []
}

// app/fonts/isidoraSans.js
import localFont from 'next/font/local';

const isidoraSans = localFont({
  src: [
    {
      path: '../',
      weight: '400', // Regular weight
      style: 'normal',
    },
    {
      path: '/fonts/Fontspring-DEMO-isidorasansalt-bold.otf',
      weight: '700', // Bold weight
      style: 'normal',
    },
    // Add more weights or styles (e.g., italic) as needed
  ],
  variable: '--font-isidora-sans', // Optional CSS variable for Tailwind or custom styling
  display: 'swap', // Ensures fallback font is used while loading
});

export default isidoraSans;
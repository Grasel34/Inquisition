/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };

  /* No arquivo Tailwind CSS config */
theme: {
  extend: {
    colors: {
      primary: '#3b82f6',
      secondary: '#9333ea',
      accent: '#10b981',
      neutral: '#1f2937',
    },
    fontFamily: {
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
  },
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
}

.animate-fade-in-out {
  animation: fadeInOut 2.5s ease-in-out forwards;
}

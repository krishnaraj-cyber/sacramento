/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#195593",
        "secondary":"#288043"
      },
      backgroundImage:{
        "wall1":"url('/assets/Images/Wallpaper/Wall_02.jpg')",
        "wall2":"url('/assets/Images/Wallpaper/Wall_04.png')"
      },
    },
  },
  plugins: [
    nextui(),
    require('preline/plugin'),
    require('tailwindcss-animated')
  ],
}


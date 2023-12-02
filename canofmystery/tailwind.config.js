/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
    },
  },
  daisyui: {
      themes: [
        {
          mytheme: {
          'primary' : '#fec700',           /* Primary color */
           'primary-focus' : '#ffb43f',     /* Primary color - focused */
           'primary-content' : '#ebebeb',   /* Foreground content color to use on primary color */

           'secondary' : '#b1dd8c',         /* Secondary color */
           'secondary-focus' : '#96d35f',   /* Secondary color - focused */
           'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

           'accent' : '#a8c6fe',            /* Accent color */
           'accent-focus' : '#b18cfe',      /* Accent color - focused */
           'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

           'neutral' : '#3b424e',           /* Neutral color */
           'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
           'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

           'base-100' : '#ebebeb',          /* Base color of page, used for blank backgrounds */
           'base-200' : '#c0c0c0',          /* Base color, a little darker */
           'base-300' : '#000000',          /* Base color, even more darker */
           'base-content' : '#1e2734',      /* Foreground content color to use on base color */

           'info' : '#1c92f2',              /* Info */
           'success' : '#009485',           /* Success */
           'warning' : '#ff9900',           /* Warning */
           'error' : '#ff5724',             /* Error */
  
        },
        },
      ],
    },
  plugins: [require("daisyui")],
  corePlugins: {     
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false
  },
}

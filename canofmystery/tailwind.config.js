/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    letterSpacing: {
      tighter: '-.15em',
    },
    colors: {
      "bright-orenge" : "#fcc800",
      "sunset" : "#f9af7d",
      "pale-green" : "#74be81",
      "dark-purple" : "#836589",
      "light-purple" : "#c4bfff",
      "light-green" : "#7fffb3",

      'primary-dark' : '#29ff80',
      'secondary-dark' : '#5c578d',
      'base-100-dark' : '#1c1a1a',

      't-header-light' : '#1c1b1c',
      't-header-dark' : '#ebebeb',
      't-dark' :  '#ebebeb',
      't-light' :  '#59595a'
    },
    borderWidth: {
      '0': "0px",
      '2': "2px",
      '3': "3px"
    },
    boxShadow: {
      'md': '0px 5px 0px 0px #000',
      'lg': '0px 10px 0px 0px #000',
    },
    borderColor: {
      DEFAULT: '#000000',
    },
    fontSize: {
      'md': '10px',
      'lg': '13px',
      'xl': '15px',
      '2xl': '19px',
      '2.2xl': '20px',
      '2.5xl': '21px',
      '2.7xl': '27px',
      '3xl': '32px',
      '4xl': '42px',
      '5xl': '52px',
      '6xl': '62px',
      '7xl': '72px',
    },
    borderRadius: {
      'none': '0',
      DEFAULT: '4px',
      'md': '10px',
      'lg': '20px',
    },
    screens: {
      'xs': '0px',
      'xs-sm': '480px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '806px',
      // => @media (min-width: 768px) { ... }

      'lg': '1134px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1290px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1980px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage:{
        'grid-image': 'url("../components/Assets/grid.png")',
        'dark-grid-image': 'url("../components/Assets/dark-grid.png")',
      },
    },
  },
  daisyui: {
      themes: [
          {
            mytheme: {

            'primary' : '#fcc800',           /* Primary color */
            'primary-focus' : '#fad02d',     /* Primary color - focused */
            'primary-content' : '#000000',   /* Foreground content color to use on primary color */

            'secondary' : '#29ff80',         /* Secondary color */
            'secondary-focus' : '#61fa9f',   /* Secondary color - focused */
            'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

            'primary-dark' : '#29ff80',
            'secondary-dark' : '#5c578d',
            'base-100-dark' : '#1c1a1a',


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
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.a': {
          'border-right': '3px solid black',
          'border-left': '3px solid black'
          // You can add more styles if needed
        },
        '.neo-bottom-sm': {
          'box-shadow': '0px 4px 0px 0px rgba(0,0,0,1)',
          'border': '2px solid black',
          'border-radius': '10px'
        },
        '.neo-bottom-lg': {
          'box-shadow': '0px 4px 0px 0px rgba(0,0,0,1)',
          'border': '2px solid black',
          'border-radius': '10px'
        },
        '.neo-bottom-xl': {
          'box-shadow': '0px 4px 0px 0px rgba(0,0,0,1)',
          'border': '3px solid black',
          'border-radius': '10px'
        },
        '.neo-input': {
          'border': '3px solid black',
          'border-radius': '6px',
          'min-height' : '29.17px',
        },
        '.neo-input-sm': {
          'border': '2px solid black',
          'border-radius': '6px',
          'min-height' : '29.17px',
        },
        '.explore-itm-size-2xl': {
          'width' : '290px',
          'height' : '100%'
        },
        '.explore-itm-size-xl': {
          'width' : '18vw',
          'height' : '100%'
        },
        '.explore-itm-size-lg': {
          'width' : '230.39px',
          'height' : '100%'
        },
        '.explore-itm-top-size-md': {
          'width' : '250px',
          'height' : '165px'
        },
        '.explore-itm-btm-size-md': {
          'width' : '520px',
          'height' : '200px'
        },
        '.explore-itm-top-size-sm': {
          'width' : 'calc(50% - 16px)', 
          'height' : '40vw'
        },
        '.explore-itm-btm-size-sm': {
          'width' : '100%',
          'height' : '40vw'
        },
        '.explore-itm-top-size-xs': {
          'width' : 'calc(50% - 20px) ', 
          'height' : '30vw'
        },
        '.explore-size-2xl': {
          'font-size' : '15px',
          'width' : '100vw',
          'height' : '240px'
        },
        '.explore-size-xl': {
          'font-size' : '1.1vw',
          'width' : '100vw',
          'height' : '16vw'
        },
        '.explore-size-lg': {
          'font-size' : '14.08px',
          'width' : '100vw',
          'height' : '204.9px'
        },
        '.explore-size-md': {
          'width' : '100vw',
          'height' : 'calc(100vh - 67px)',
          'font-size' : '12.62px'
        },
        '.article-link': {
          'color': '#fcc800',
        }
      });
    },
    require("daisyui")
  ],
  corePlugins: {     
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
    textOpacity: false
  },
}

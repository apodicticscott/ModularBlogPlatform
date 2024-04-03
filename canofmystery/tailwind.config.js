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
      "light-gray":"#D9D9D9",
      "dark-red": "#d32a00",

      'primary-dark' : '#29ff80',
      'secondary-dark' : '#252425',
      'base-100-dark' : '#100f12',
      'title-color' : '#c4bfff',
      't-header-light' : '#1c1b1c',
      't-header-dark' : '#ebebeb',
      't-dark' :  '#ebebeb',
      't-light' :  '#59595a'
    },
    borderWidth: {
      '0': "0px",
      '2': "2px",
      '3': "3px",
    },
    boxShadow: {
      'md': '0px 5px 0px 0px #000',
      'lg': '0px 10px 0px 0px #000',
      'sidelg': '-10px 10px 0px 0px #000',
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
      'full': '100%',
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
        'image-missing-image': 'url("../components/Assets/variable-placeholder-product-31.png")',
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
            'base-100-dark' : '#100f12',


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
        '.shadow-md-move': {
          'box-shadow': '5px 5px 0px 1px rgba(0,0,0,1)',
          '-webkit-box-shadow': '5px 5px 0px 1px rgba(0,0,0,1)',
          '-moz-box-shadow': '5px 5px 0px 1px rgba(0,0,0,1)',
          // You can add more styles if needed
        },
        '.shadow-lg-move': {
          'box-shadow': '10px 10px 0px 1px rgba(0,0,0,1)',
          '-webkit-box-shadow': '10px 10px 0px 1px rgba(0,0,0,1)',
          '-moz-box-shadow': '10px 10px 0px 1px rgba(0,0,0,1)',
          // You can add more styles if needed
        },
        ".grid-lines-light": {
          "background-size": "100px 100px",
          "background-image": "linear-gradient(to right, rgb(0, 0, 0) 1px, transparent 1px), linear-gradient(to bottom, rgb(0, 0, 0) 1px, transparent 1px)",
        },
        ".grid-lines-dark": {
          "background": "#252425",
          "background-size": "100px 100px",
          "background-image": "linear-gradient(to right, #100f12 1px, transparent 1px), linear-gradient(to bottom, #100f12 1px, transparent 1px)",
        },
        ".linear-gradient-overlay-light" : {
          "background": "rgb(255,255,255)",
          "background-image" : "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
        },
        ".linear-gradient-overlay-dark" : {
          "background": "rgb(27,27,30)",
          "background-image" : "linear-gradient(90deg, rgba(27,27,30,0) 0%, rgba(27,27,30,1) 100%)"
        },
        '.neo-bottom-sm': {
          'box-shadow': '0px 4px 0px 0px rgba(0,0,0,1)',
          'border': '2px solid black',
          'border-radius': '10px'
        },
        '.shadow': {
          'box-shadow': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
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
          'width' : 'calc(50% - 30px) ', 
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
          'font-size' : '16px'
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

import type { Config } from 'tailwindcss';

import { heroui } from '@heroui/theme';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|link|number-input|progress|toggle|toast|ripple|spinner|form).js"
  ],
   theme: {
      extend: {
         fontFamily: {
            sans: ['var(--font-sans)', ...fontFamily.sans],
            mono: ['var(--font-mono)', ...fontFamily.mono],
         }
      },
   },
  plugins: [heroui()],
};

export default config;

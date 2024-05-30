import formsPlugin from '@tailwindcss/forms';
import aspectRation from '@tailwindcss/aspect-ratio';

export default {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [formsPlugin, aspectRation],
};

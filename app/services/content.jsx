const content = {
  'zero-gravity-glider': {
    highlights: ['FCS Fins', 'Squash Tail', 'Intermediate to Advanced'],
    construction: `Made from a durable EPS foam core and layered with a robust epoxy shell, it's built to withstand the toughest waves.`,
  },
  'local-wax': {
    highlights: ['Locally made', 'Biodegradable', 'Keep the fish happy'],
    construction: `Made from locally sourced beeswax and coconut oil, it's designed to keep you on your board and the fish happy.`,
  },
  'wax-comb': {
    highlights: ['Creates an excellent texture', 'Sustainably sourced'],
    construction: `Laser cut from a single piece of wood, it's designed to last a lifetime.`,
  },
  'base-coat': {
    highlights: ['Designed for the first layer', 'For warm water'],
    construction: `Made from a trademarked blend of natural and synthetic materials, it's designed to keep your board in top shape.`,
  },
  'repair-kit': {
    highlights: ['Includes tiny wooden surfboard because AI says so'],
    construction: `Closable box with a tiny wooden surfboard inside. It's a mystery.`,
  },
};

export default function getProductContent(handle) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(content[handle]), 1000),
  );
}

const reviews = {
  'zero-gravity-glider': [
    {
      id: 1,
      name: 'Jane Smith',
      date: 'May 21, 2023',
      content:
        "I'm new to surfing and this board has been a great starter for me. It's stable and easy to maneuver, which has helped me build confidence. The quality is also impressive for the price.",
      starRating: 4,
    },
    {
      id: 2,
      name: 'Sally Johnson',
      date: 'May 23, 2023',
      content:
        "The surfboard is okay. It's good for beginners but if you're an experienced surfer, you might find it a bit basic. It's durable though, and the design is pretty cool.",
      starRating: 3,
    },
  ],
  'local-wax': [
    {
      id: 3,
      name: 'Jane Smith',
      date: 'May 21, 2023',
      content:
        "Super sticky, but it's a bit too soft for my liking. I prefer a harder wax.",
      starRating: 4,
    },
  ],
  'wax-comb': [
    {
      id: 4,
      name: 'Jane Smith',
      date: 'May 21, 2023',
      content: "Wouldn't recommend as a hair comb.",
      starRating: 4,
    },
  ],
  'base-coat': [
    {
      id: 5,
      name: 'Jane Smith',
      date: 'May 21, 2023',
      content:
        "This base coat is great. It's easy to apply and protects the board well.",
      starRating: 5,
    },
  ],
  'repair-kit': [
    {
      id: 6,
      name: 'Jane Smith',
      date: 'May 21, 2023',
      content:
        "Strangest repair kit I've ever recieved. I'm not sure why it looks like a tiny surfboard.",
      starRating: 2,
    },
  ],
};

export default function getProductReviews(handle) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(reviews[handle]), 2000),
  );
}

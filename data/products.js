const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise-canceling features, ideal for music lovers.",
    price: 3000,
    quantity: 25,
    status: "approved", // Product approved
    images: [
      "https://images.pexels.com/photos/610945/pexels-photo-610945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    owner: "651a1b76f57c1e67b3f8e2b1", // User who uploaded this product
    reviews: [
      {
        reviewText: "Good sound quality, but lacks deep bass.",
        rating: 4,
        adminReviewer: "651a1b76f57c1e67b3f8e2c1", // Admin who reviewed this product
        createdAt: "2024-09-27T12:30:00Z",
      },
    ],
    published: true, // Product is published after approval
  },
  {
    name: "Smartwatch Series 5",
    description:
      "A sleek smartwatch with health monitoring, fitness tracking, and customizable watch faces.",
    price: 2550,
    quantity: 40,
    status: "approved", // Product approved
    images: [
      "https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "hhttps://images.pexels.com/photos/2861929/pexels-photo-2861929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    owner: "651a1b76f57c1e67b3f8e2b2", // Another user who uploaded this product
    reviews: [
      {
        reviewText: "Excellent smartwatch with great health tracking features.",
        rating: 5,
        adminReviewer: "651a1b76f57c1e67b3f8e2c1", // Admin who reviewed this product
        createdAt: "2024-09-25T12:30:00Z",
      },
    ],
    published: true, // Product is published after approval
  },
  {
    name: "4K Ultra HD TV",
    description:
      "Experience stunning visuals with this 55-inch 4K Ultra HD TV, featuring HDR support and smart TV functionality.",
    price: 22000,
    quantity: 10,
    status: "rejected", // Product rejected
    images: [
      "https://images.pexels.com/photos/5202925/pexels-photo-5202925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1682519/pexels-photo-1682519.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    owner: "651a1b76f57c1e67b3f8e2b3", // Product owner's ID
    reviews: [
      {
        reviewText: "The image quality is poor for a 4K display.",
        rating: 2,
        adminReviewer: "651a1b76f57c1e67b3f8e2c2", // Admin who rejected this product
        createdAt: "2024-09-25T13:45:00Z",
      },
    ],
    published: false, // Product is not published since it was rejected
  },
  {
    name: "Smooth Laptop",
    description:
      "A powerful gaming laptop with an Intel i7 processor, 16GB RAM, and a dedicated NVIDIA graphics card.",
    price: 70000,
    quantity: 15,
    status: "approved", // Product approved
    images: [
      "https://images.pexels.com/photos/5412270/pexels-photo-5412270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
    owner: "651a1b76f57c1e67b3f8e2b4", // Owner's ID
    reviews: [
      {
        reviewText: "Fantastic performance for gaming and multitasking.",
        rating: 5,
        adminReviewer: "651a1b76f57c1e67b3f8e2c1", // Admin who reviewed this product
        createdAt: "2024-09-27T12:45:00Z",
      },
    ],
    published: true, // Product is published after approval
  },
];

export default products;

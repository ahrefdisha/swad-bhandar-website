// Categories, each with its own flavors (products) inside.
// Each flavor has weight options, each weight has priceOil/priceGhee.
const categories = [
  {
    id: "thekua",
    name: "Thekua",
    icon: "🍪",
    image: "/images/sugar-thekua.png",
    products: [
      {
        id: "sugar-thekua",
        name: "Thekua",
        description: "Crispy Bihari thekua made the traditional way, mildly sweetened with sugar.",
        image: "/images/sugar-thekua.png",
        color: "#F5C518",
        tag: "Sale",
        weights: [
          { label: "400g", priceOil: 229, priceGhee: 269, oldPriceOil: 299, oldPriceGhee: 339 },
          { label: "750g", priceOil: 389, priceGhee: 449, oldPriceOil: 479, oldPriceGhee: 549 },
          { label: "900g", priceOil: 449, priceGhee: 519, oldPriceOil: 549, oldPriceGhee: 629 },
        ],
      },
      {
        id: "gud-thekua",
        name: "Gud Thekua",
        description: "Rich, earthy jaggery sweetness in every bite — a true Bihari classic.",
        image: "/images/gud-thekua.png",
        color: "#F5C518",
        tag: "New",
        weights: [
          { label: "400g", priceOil: 239, priceGhee: 279, oldPriceOil: 309, oldPriceGhee: 349 },
          { label: "750g", priceOil: 409, priceGhee: 469, oldPriceOil: 499, oldPriceGhee: 569 },
          { label: "900g", priceOil: 469, priceGhee: 539, oldPriceOil: 569, oldPriceGhee: 649 },
        ],
      },
      {
        id: "dryfruit-thekua",
        name: "Dry Fruits Thekua",
        description: "Loaded with premium dry fruits for a royal, indulgent treat.",
        image: "/images/dryfruit-thekua.png",
        color: "#F5C518",
        tag: "Premium",
        weights: [
          { label: "400g", priceOil: 379, priceGhee: 429, oldPriceOil: 469, oldPriceGhee: 529 },
          { label: "750g", priceOil: 649, priceGhee: 729, oldPriceOil: 779, oldPriceGhee: 869 },
          { label: "900g", priceOil: 749, priceGhee: 839, oldPriceOil: 899, oldPriceGhee: 999 },
        ],
      },
    ],
  },
  {
    id: "khakra",
    name: "Khakra",
    icon: "🫓",
    image: "/images/khakra-packaging.png",
    products: [
      {
        id: "jeera-khakra",
        name: "Jeera Khakra",
        description: "Thin, crispy khakra with a light cumin flavor — perfect with tea.",
        image: "/images/khakra-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "Sale",
        weights: [
          { label: "400g", priceOil: 199, priceGhee: 239, oldPriceOil: 259, oldPriceGhee: 299 },
          { label: "750g", priceOil: 349, priceGhee: 419, oldPriceOil: 429, oldPriceGhee: 499 },
          { label: "900g", priceOil: 399, priceGhee: 469, oldPriceOil: 479, oldPriceGhee: 559 },
        ],
      },
      {
        id: "methi-khakra",
        name: "Methi Khakra",
        description: "Crispy khakra with a hint of fenugreek — a wholesome everyday snack.",
        image: "/images/khakra-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "New",
        weights: [
          { label: "400g", priceOil: 209, priceGhee: 249, oldPriceOil: 269, oldPriceGhee: 309 },
          { label: "750g", priceOil: 369, priceGhee: 439, oldPriceOil: 449, oldPriceGhee: 519 },
          { label: "900g", priceOil: 419, priceGhee: 489, oldPriceOil: 499, oldPriceGhee: 579 },
        ],
      },
      {
        id: "masala-khakra",
        name: "Masala Khakra",
        description: "Spiced, crunchy khakra loaded with a blend of everyday Indian spices.",
        image: "/images/khakra-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "Premium",
        weights: [
          { label: "400g", priceOil: 219, priceGhee: 259, oldPriceOil: 279, oldPriceGhee: 319 },
          { label: "750g", priceOil: 389, priceGhee: 459, oldPriceOil: 469, oldPriceGhee: 539 },
          { label: "900g", priceOil: 439, priceGhee: 509, oldPriceOil: 519, oldPriceGhee: 599 },
        ],
      },
    ],
  },
  {
    id: "makhana",
    name: "Makhana",
    icon: "🌰",
    image: "/images/makhana-packaging.png",
    products: [
      {
        id: "roasted-makhana",
        name: "Roasted Makhana",
        description: "Light, crunchy fox nuts roasted to perfection — a wholesome guilt-free snack.",
        image: "/images/makhana-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "Sale",
        weights: [
          { label: "400g", priceOil: 249, priceGhee: 289, oldPriceOil: 319, oldPriceGhee: 359 },
          { label: "750g", priceOil: 429, priceGhee: 489, oldPriceOil: 519, oldPriceGhee: 589 },
          { label: "900g", priceOil: 489, priceGhee: 559, oldPriceOil: 589, oldPriceGhee: 669 },
        ],
      },
      {
        id: "peri-peri-makhana",
        name: "Peri Peri Makhana",
        description: "Crunchy fox nuts tossed in tangy, spicy peri peri seasoning.",
        image: "/images/makhana-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "New",
        weights: [
          { label: "400g", priceOil: 269, priceGhee: 309, oldPriceOil: 339, oldPriceGhee: 379 },
          { label: "750g", priceOil: 459, priceGhee: 519, oldPriceOil: 549, oldPriceGhee: 619 },
          { label: "900g", priceOil: 519, priceGhee: 589, oldPriceOil: 619, oldPriceGhee: 699 },
        ],
      },
      {
        id: "masala-makhana",
        name: "Masala Makhana",
        description: "Fox nuts roasted with a classic blend of Indian spices for an everyday munch.",
        image: "/images/makhana-packaging.png",
        comingSoon: true,
        color: "#F5C518",
        tag: "Premium",
        weights: [
          { label: "400g", priceOil: 259, priceGhee: 299, oldPriceOil: 329, oldPriceGhee: 369 },
          { label: "750g", priceOil: 439, priceGhee: 499, oldPriceOil: 529, oldPriceGhee: 599 },
          { label: "900g", priceOil: 499, priceGhee: 569, oldPriceOil: 599, oldPriceGhee: 679 },
        ],
      },
    ],
  },
];

export default categories;

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "sale" | "new" | "popular";
  description: string;
  dosage: string;
  capsules: number;
  inStock: boolean;
};

export const categories = [
  "All",
  "SARMs",
  "Peptides",
  "Nootropics",
  "PCT",
  "Stacks",
];

export const products: Product[] = [
  {
    id: "1",
    name: "RAD-140 (Testolone)",
    slug: "rad-140",
    category: "SARMs",
    price: 89.95,
    image: "/bottles/1.jpg",
    badge: "popular",
    description: "RAD-140 is one of the most popular SARMs for research purposes. Each capsule contains 10mg of RAD-140 for precise dosing.",
    dosage: "10mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "2",
    name: "BPC-157 (Body Protection Compound)",
    slug: "bpc-157",
    category: "Peptides",
    price: 69.95,
    originalPrice: 89.95,
    image: "/bottles/2.jpg",
    badge: "sale",
    description: "BPC-157 is a peptide chain consisting of 15 amino acids. It is considered synthetic because it does not occur naturally.",
    dosage: "500mcg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "3",
    name: "MK-677 (Ibutamoren)",
    slug: "mk-677",
    category: "SARMs",
    price: 79.95,
    image: "/bottles/3.jpg",
    badge: "popular",
    description: "MK-677 promotes the secretion of the growth hormone and increases insulin-like growth factor 1.",
    dosage: "10mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "4",
    name: "5-Amino-1MQ",
    slug: "5-amino-1mq",
    category: "Nootropics",
    price: 189.0,
    originalPrice: 249.0,
    image: "/bottles/4.jpg",
    badge: "sale",
    description: "5-Amino-1MQ is a small molecule that blocks NNMT enzyme activity to potentially boost cellular energy.",
    dosage: "50mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "5",
    name: "Ostarine (MK-2866)",
    slug: "ostarine",
    category: "SARMs",
    price: 69.95,
    image: "/bottles/5.jpg",
    description: "Ostarine is the most well-known SARM, and it is also the most research-backed.",
    dosage: "10mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "6",
    name: "GW-501516 (Cardarine)",
    slug: "cardarine",
    category: "SARMs",
    price: 79.95,
    image: "/bottles/1.jpg",
    badge: "new",
    description: "Cardarine is a research chemical that was being investigated for its potential effects on metabolic and cardiovascular conditions.",
    dosage: "10mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "7",
    name: "Clomiphene Citrate (PCT)",
    slug: "clomiphene",
    category: "PCT",
    price: 49.95,
    image: "/bottles/2.jpg",
    description: "Clomiphene Citrate is a selective estrogen receptor modulator commonly used in post-cycle therapy.",
    dosage: "25mg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "8",
    name: "TB-500 (Thymosin Beta-4)",
    slug: "tb-500",
    category: "Peptides",
    price: 99.95,
    image: "/bottles/3.jpg",
    badge: "new",
    description: "TB-500 is a synthetic version of the naturally occurring peptide present in virtually all animal and human cells.",
    dosage: "500mcg/capsule",
    capsules: 60,
    inStock: true,
  },
  {
    id: "9",
    name: "LGD-4033 + RAD-140 Stack",
    slug: "lgd-rad-stack",
    category: "Stacks",
    price: 149.95,
    originalPrice: 179.9,
    image: "/bottles/4.jpg",
    badge: "sale",
    description: "A powerful research stack combining LGD-4033 and RAD-140 for comprehensive study protocols.",
    dosage: "Varies",
    capsules: 120,
    inStock: true,
  },
  {
    id: "10",
    name: "Noopept",
    slug: "noopept",
    category: "Nootropics",
    price: 39.95,
    image: "/bottles/5.jpg",
    description: "Noopept is a potent nootropic compound known for its cognitive-enhancing research potential.",
    dosage: "20mg/capsule",
    capsules: 90,
    inStock: true,
  },
];

export const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    status: "Delivered" as const,
    total: 239.85,
    items: [
      { product: products[0], quantity: 2 },
      { product: products[4], quantity: 1 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-12-28",
    status: "Shipped" as const,
    total: 189.0,
    items: [{ product: products[3], quantity: 1 }],
  },
  {
    id: "ORD-2025-001",
    date: "2025-01-10",
    status: "Processing" as const,
    total: 149.95,
    items: [{ product: products[8], quantity: 1 }],
  },
];

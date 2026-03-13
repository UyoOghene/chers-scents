const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

// Cloudinary base URL - replace with your actual cloud name
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dk0e6pgpj';
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/v1/perfume-store`;

const perfumes = [
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "men",
    price: 135,
    size: "100ml",
    stock: 15,
    sku: "CS-MEN-001",
    description: "A timeless fragrance for the modern man. Fresh, woody, and aromatic.",
    notes: ["Grapefruit", "Ginger", "Incense"],
    imageUrl: `${CLOUDINARY_BASE}/bluedechanel2.jpg`,
    isFeatured: true
  },
  {
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "women",
    price: 120,
    size: "100ml",
    stock: 12,
    sku: "CS-WOM-001",
    description: "A sweet and joyful fragrance that captures the essence of happiness.",
    notes: ["Iris", "Patchouli", "Vanilla"],
    imageUrl: `${CLOUDINARY_BASE}/lancomelavie.jpg`,
    isFeatured: true
  },
  {
    name: "Sauvage",
    brand: "Dior",
    category: "men",
    price: 140,
    size: "100ml",
    stock: 20,
    sku: "CS-MEN-002",
    description: "A bold and fresh fragrance inspired by wide-open spaces.",
    notes: ["Bergamot", "Pepper", "Amber"],
    imageUrl: `${CLOUDINARY_BASE}/dior-sauvage.jpg`,
    isFeatured: true
  },
  {
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    category: "women",
    price: 155,
    size: "100ml",
    stock: 8,
    sku: "CS-WOM-002",
    description: "An explosion of flowers with a feminine and addictive character.",
    notes: ["Rose", "Jasmine", "Patchouli"],
    imageUrl: `${CLOUDINARY_BASE}/flowebomb.jpg`,
    isFeatured: false
  },
  {
    name: "Acqua di Gio",
    brand: "Giorgio Armani",
    category: "men",
    price: 125,
    size: "100ml",
    stock: 25,
    sku: "CS-MEN-003",
    description: "A fresh and aquatic scent that evokes the Mediterranean.",
    notes: ["Sea Notes", "Bergamot", "Rosemary"],
    imageUrl: `${CLOUDINARY_BASE}/acquadigio.jpg`,
    isFeatured: true
  },
  {
    name: "Coco Mademoiselle",
    brand: "Chanel",
    category: "women",
    price: 150,
    size: "100ml",
    stock: 17,
    sku: "CS-WOM-003",
    description: "A fresh oriental fragrance with a strong and sensual character.",
    notes: ["Orange", "Rose", "Patchouli"],
    imageUrl: `${CLOUDINARY_BASE}/cocomademoiselle.jpg`,
    isFeatured: true
  },
  {
    name: "Black Opium",
    brand: "YSL",
    category: "women",
    price: 138,
    size: "90ml",
    stock: 19,
    sku: "CS-WOM-004",
    description: "A seductive gourmand fragrance with a modern rock edge.",
    notes: ["Coffee", "Vanilla", "White Flowers"],
    imageUrl: `${CLOUDINARY_BASE}/blackopium.jpg`,
    isFeatured: false
  },
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "unisex",
    price: 320,
    size: "70ml",
    stock: 10,
    sku: "CS-UNI-001",
    description: "An iconic luxurious fragrance with a luminous woody amber tone.",
    notes: ["Saffron", "Amberwood", "Fir Resin"],
    imageUrl: `${CLOUDINARY_BASE}/baracatrougen.jpg`,
    isFeatured: true
  },
  {
    name: "CK One",
    brand: "Calvin Klein",
    category: "unisex",
    price: 95,
    size: "100ml",
    stock: 30,
    sku: "CS-UNI-002",
    description: "A clean, refreshing fragrance designed for everyone.",
    notes: ["Green Tea", "Papaya", "Musk"],
    imageUrl: `${CLOUDINARY_BASE}/ckone.jpg`,
    isFeatured: false
  },
  {
    name: "Tom Ford Oud Wood",
    brand: "Tom Ford",
    category: "unisex",
    price: 280,
    size: "50ml",
    stock: 12,
    sku: "CS-UNI-003",
    description: "A rich and exotic fragrance featuring rare oud wood.",
    notes: ["Oud", "Sandalwood", "Vanilla"],
    imageUrl: `${CLOUDINARY_BASE}/tomfordoudwood2.webp`,
    isFeatured: true
  },
  {
    name: "Aventus",
    brand: "Creed",
    category: "men",
    price: 310,
    size: "100ml",
    stock: 8,
    sku: "CS-MEN-004",
    description: "A powerful and sophisticated fragrance inspired by strength.",
    notes: ["Pineapple", "Birch", "Musk"],
    imageUrl: `${CLOUDINARY_BASE}/creedaventus.jpg`,
    isFeatured: true
  },
  {
    name: "Fantasy",
    brand: "Britney Spears",
    category: "women",
    price: 85,
    size: "100ml",
    stock: 28,
    sku: "CS-WOM-005",
    description: "A playful and sweet fragrance with a youthful charm.",
    notes: ["Kiwi", "White Chocolate", "Musk"],
    imageUrl: `${CLOUDINARY_BASE}/Fantasy-by-Britney-spears.jpg`,
    isFeatured: false
  },
  {
    name: "Baby Touch",
    brand: "Burberry",
    category: "kids",
    price: 65,
    size: "100ml",
    stock: 35,
    sku: "CS-KID-001",
    description: "A soft and gentle fragrance specially designed for children.",
    notes: ["Citrus", "Mint", "Vanilla"],
    imageUrl: `${CLOUDINARY_BASE}/burberrybaby.jpg`,
    isFeatured: false
  },
  {
    name: "Tartine et Chocolat",
    brand: "Ptisenbon",
    category: "kids",
    price: 55,
    size: "100ml",
    stock: 40,
    sku: "CS-KID-002",
    description: "A fresh and comforting scent suitable for babies and kids.",
    notes: ["Lemon", "Honeysuckle", "Musk"],
    imageUrl: `${CLOUDINARY_BASE}/tartineetchocolat.avif`,
    isFeatured: false
  },
  {
    name: "Petit Bateau Eau Fraîche",
    brand: "Petit Bateau",
    category: "kids",
    price: 50,
    size: "100ml",
    stock: 45,
    sku: "CS-KID-003",
    description: "A light, fresh fragrance perfect for everyday use by children.",
    notes: ["Orange Blossom", "White Musk", "Citrus"],
    imageUrl: `${CLOUDINARY_BASE}/petitbateau.jpg`,
    isFeatured: false
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(perfumes);
    console.log('✅ Data Imported Successfully!');
    console.log(`📦 Added ${perfumes.length} products`);
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('✅ Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
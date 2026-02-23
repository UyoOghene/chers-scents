const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

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
    imageUrl: "/images/bluedechanel2.jpg",
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
    imageUrl: "/images/lancomelavie.jpg",
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
    imageUrl: "/images/dior sauvage.jpg",
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
    imageUrl: "/images/flowebomb.jpg",
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
    imageUrl: "/images/acquadigio.jpg",
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
    imageUrl: "/images/cocomademoiselle.jpg",
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
    imageUrl: "/images/blackopium.jpg",
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
    imageUrl: "/images/baracatrougen.jpg",
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
    imageUrl: "/images/ckone.jpg",
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
    imageUrl: "images/tomfordoudwood2.webp",
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
    imageUrl: "/images/creedaventus.jpg",
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
    imageUrl: "/images/Fantasy-by-Britney-spears.jpg",
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
    imageUrl: "/images/burberrybaby.jpg",
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
    imageUrl: "/images/tartineetchocolat.avif",
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
    imageUrl: "/images/petitbateau.jpg",
    isFeatured: false
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(perfumes);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
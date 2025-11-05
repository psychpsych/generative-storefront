import { CRMService, UserCRMProfile, PersonalizationData } from './crm'

// Mock Product Database - gerçek projede bu Supabase/MongoDB'den gelecek
export interface Product {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  brand: string
  price: number
  sale_price?: number
  images: string[]
  colors: string[]
  sizes: string[]
  materials: string[]
  tags: string[]
  style_tags: string[]
  occasion_tags: string[]
  mood_tags: string[]
  season_tags: string[]
  stock: number
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
  // Emotional commerce additions
  energy_level?: 'calm' | 'energizing' | 'neutral'
  personality_fit?: string[]
  lifestyle_tags?: string[]
  confidence_boost?: number // 1-10 scale
}

// Dummy product data - Çok daha fazla çeşitli ürün
export const mockProducts: Product[] = [
  // CLOTHING - Sweaters & Knitwear
  {
    id: "prod_001",
    name: "Cashmere Oversized Sweater",
    description: "Luxuriously soft cashmere sweater with a relaxed, oversized fit. Perfect for cozy evenings or stylish layering.",
    category: "clothing",
    subcategory: "sweaters",
    brand: "Everlane",
    price: 180,
    sale_price: 144,
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"
    ],
    colors: ["cream", "navy", "charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["100% Cashmere"],
    tags: ["comfortable", "luxury", "versatile", "sustainable"],
    style_tags: ["minimalist", "casual", "elevated"],
    occasion_tags: ["work from home", "casual dinner", "weekend"],
    mood_tags: ["cozy", "relaxed", "sophisticated"],
    season_tags: ["fall", "winter"],
    stock: 25,
    rating: 4.8,
    reviews_count: 127,
    created_at: "2024-09-15T10:00:00Z",
    updated_at: "2024-11-01T15:30:00Z"
  },
  {
    id: "prod_002",
    name: "Chunky Cable Knit Cardigan",
    description: "Oversized cable knit cardigan in soft wool blend. Perfect for layering on chilly days.",
    category: "clothing",
    subcategory: "cardigans",
    brand: "Madewell",
    price: 128,
    images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop"],
    colors: ["oatmeal", "forest green", "burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["60% Wool", "40% Acrylic"],
    tags: ["cozy", "warm", "trendy", "layering"],
    style_tags: ["bohemian", "casual", "cozy"],
    occasion_tags: ["rainy day", "coffee shop", "casual hangout"],
    mood_tags: ["cozy", "relaxed", "comfortable"],
    season_tags: ["fall", "winter", "spring"],
    stock: 31,
    rating: 4.6,
    reviews_count: 84,
    created_at: "2024-08-10T10:00:00Z",
    updated_at: "2024-10-25T15:30:00Z"
  },

  // CLOTHING - Dresses
  {
    id: "prod_003",
    name: "Silk Midi Dress",
    description: "Elegant silk midi dress with subtle draping and a timeless silhouette. Effortlessly chic for any occasion.",
    category: "clothing",
    subcategory: "dresses",
    brand: "Reformation",
    price: 298,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-0c79e4b1f28e?w=500&h=600&fit=crop"
    ],
    colors: ["emerald", "black", "rust"],
    sizes: ["XS", "S", "M", "L"],
    materials: ["100% Silk"],
    tags: ["elegant", "versatile", "timeless", "luxury"],
    style_tags: ["sophisticated", "classic", "feminine"],
    occasion_tags: ["dinner date", "office", "special event"],
    mood_tags: ["confident", "elegant", "romantic"],
    season_tags: ["spring", "summer", "fall"],
    stock: 18,
    rating: 4.9,
    reviews_count: 89,
    created_at: "2024-08-20T14:00:00Z",
    updated_at: "2024-10-28T09:15:00Z"
  },
  {
    id: "prod_004",
    name: "Flowy Maxi Dress",
    description: "Bohemian-inspired maxi dress in breathable cotton. Perfect for summer festivals or beach walks.",
    category: "clothing",
    subcategory: "dresses",
    brand: "Free People",
    price: 168,
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"],
    colors: ["terracotta", "sage", "navy"],
    sizes: ["XS", "S", "M", "L"],
    materials: ["100% Cotton"],
    tags: ["flowy", "bohemian", "comfortable", "artistic"],
    style_tags: ["bohemian", "free-spirited", "artistic"],
    occasion_tags: ["festival", "beach", "vacation", "creative events"],
    mood_tags: ["free-spirited", "artistic", "relaxed"],
    season_tags: ["spring", "summer"],
    stock: 22,
    rating: 4.5,
    reviews_count: 67,
    created_at: "2024-07-15T14:00:00Z",
    updated_at: "2024-10-15T09:15:00Z"
  },
  {
    id: "prod_005",
    name: "Little Black Dress",
    description: "Classic little black dress with modern tailoring. Your go-to for any elegant occasion.",
    category: "clothing",
    subcategory: "dresses",
    brand: "Theory",
    price: 395,
    images: ["https://images.unsplash.com/photo-1566479179817-0c79e4b1f28e?w=500&h=600&fit=crop"],
    colors: ["black"],
    sizes: ["XS", "S", "M", "L"],
    materials: ["95% Polyester", "5% Elastane"],
    tags: ["classic", "elegant", "versatile", "timeless"],
    style_tags: ["classic", "sophisticated", "elegant"],
    occasion_tags: ["cocktail", "dinner", "business", "date night"],
    mood_tags: ["confident", "sophisticated", "powerful"],
    season_tags: ["year-round"],
    stock: 15,
    rating: 4.8,
    reviews_count: 143,
    created_at: "2024-06-20T14:00:00Z",
    updated_at: "2024-10-28T09:15:00Z"
  },

  // CLOTHING - Pants & Bottoms
  {
    id: "prod_006",
    name: "Organic Cotton Joggers",
    description: "Ultra-soft organic cotton joggers designed for ultimate comfort. Perfect for lounging or casual outings.",
    category: "clothing",
    subcategory: "pants",
    brand: "Pangaia",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1506629905607-8c76e3c63b90?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop"
    ],
    colors: ["sage", "sand", "charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["100% Organic Cotton"],
    tags: ["comfortable", "sustainable", "casual", "soft"],
    style_tags: ["athleisure", "casual", "minimalist"],
    occasion_tags: ["home", "workout", "errands", "travel"],
    mood_tags: ["relaxed", "comfortable", "mindful"],
    season_tags: ["year-round"],
    stock: 42,
    rating: 4.7,
    reviews_count: 203,
    created_at: "2024-07-10T11:30:00Z",
    updated_at: "2024-11-02T16:45:00Z"
  },
  {
    id: "prod_007",
    name: "High-Waisted Wide Leg Jeans",
    description: "Vintage-inspired high-waisted jeans with a flattering wide leg silhouette.",
    category: "clothing",
    subcategory: "jeans",
    brand: "Agolde",
    price: 188,
    images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"],
    colors: ["medium blue", "black", "light wash"],
    sizes: ["24", "26", "28", "30", "32"],
    materials: ["100% Cotton"],
    tags: ["vintage", "flattering", "trendy", "high-waisted"],
    style_tags: ["vintage", "classic", "trendy"],
    occasion_tags: ["casual", "weekend", "date", "shopping"],
    mood_tags: ["confident", "stylish", "casual"],
    season_tags: ["year-round"],
    stock: 28,
    rating: 4.6,
    reviews_count: 156,
    created_at: "2024-08-05T11:30:00Z",
    updated_at: "2024-11-01T16:45:00Z"
  },
  {
    id: "prod_008",
    name: "Linen Wide-Leg Pants",
    description: "Breathable linen wide-leg pants with relaxed fit. Effortlessly elegant for warm weather styling.",
    category: "clothing",
    subcategory: "pants",
    brand: "Mango",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581796204936-9014a7b622a1?w=500&h=600&fit=crop"
    ],
    colors: ["white", "beige", "terracotta"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["100% Linen"],
    tags: ["breathable", "elegant", "relaxed", "natural"],
    style_tags: ["bohemian", "minimalist", "elegant"],
    occasion_tags: ["vacation", "brunch", "summer events"],
    mood_tags: ["relaxed", "elegant", "carefree"],
    season_tags: ["spring", "summer"],
    stock: 38,
    rating: 4.5,
    reviews_count: 167,
    created_at: "2024-04-15T10:45:00Z",
    updated_at: "2024-10-20T13:50:00Z"
  },

  // CLOTHING - Blazers & Outerwear
  {
    id: "prod_009",
    name: "Merino Wool Blazer",
    description: "Tailored merino wool blazer with modern cut. Professional yet comfortable for all-day wear.",
    category: "clothing",
    subcategory: "blazers",
    brand: "Ganni",
    price: 320,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"
    ],
    colors: ["navy", "camel", "burgundy"],
    sizes: ["XS", "S", "M", "L"],
    materials: ["80% Merino Wool", "20% Polyester"],
    tags: ["professional", "tailored", "versatile", "premium"],
    style_tags: ["professional", "sophisticated", "modern"],
    occasion_tags: ["office", "meetings", "business dinner"],
    mood_tags: ["confident", "professional", "empowered"],
    season_tags: ["fall", "winter", "spring"],
    stock: 14,
    rating: 4.8,
    reviews_count: 94,
    created_at: "2024-09-01T13:15:00Z",
    updated_at: "2024-11-03T10:30:00Z"
  },
  {
    id: "prod_010",
    name: "Puffer Jacket",
    description: "Oversized puffer jacket that's both warm and stylish. Perfect for cold city days.",
    category: "clothing",
    subcategory: "outerwear",
    brand: "Ganni",
    price: 425,
    images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"],
    colors: ["black", "cream", "olive"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["Recycled Polyester", "Down Fill"],
    tags: ["warm", "trendy", "oversized", "sustainable"],
    style_tags: ["street style", "trendy", "oversized"],
    occasion_tags: ["winter", "city walking", "casual"],
    mood_tags: ["cozy", "stylish", "protected"],
    season_tags: ["winter"],
    stock: 19,
    rating: 4.7,
    reviews_count: 78,
    created_at: "2024-09-20T13:15:00Z",
    updated_at: "2024-11-03T10:30:00Z"
  },

  // CLOTHING - Tops
  {
    id: "prod_011",
    name: "Vintage Band T-Shirt",
    description: "Authentic vintage-inspired band t-shirt with soft cotton blend. Perfect for expressing your musical style.",
    category: "clothing",
    subcategory: "t-shirts",
    brand: "Urban Outfitters",
    price: 35,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f3425?w=500&h=600&fit=crop"
    ],
    colors: ["black", "white", "vintage gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["60% Cotton", "40% Polyester"],
    tags: ["vintage", "music", "casual", "statement"],
    style_tags: ["bohemian", "casual", "vintage"],
    occasion_tags: ["concerts", "casual hangouts", "festivals"],
    mood_tags: ["creative", "expressive", "free-spirited"],
    season_tags: ["spring", "summer"],
    stock: 67,
    rating: 4.4,
    reviews_count: 312,
    created_at: "2024-05-20T16:00:00Z",
    updated_at: "2024-11-01T14:45:00Z"
  },
  {
    id: "prod_012",
    name: "Silk Camisole",
    description: "Delicate silk camisole with adjustable straps. Perfect for layering or wearing alone.",
    category: "clothing",
    subcategory: "tops",
    brand: "Equipment",
    price: 168,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"],
    colors: ["ivory", "black", "dusty rose"],
    sizes: ["XS", "S", "M", "L"],
    materials: ["100% Silk"],
    tags: ["delicate", "versatile", "luxury", "layering"],
    style_tags: ["feminine", "elegant", "minimalist"],
    occasion_tags: ["date night", "layering", "summer"],
    mood_tags: ["feminine", "delicate", "elegant"],
    season_tags: ["spring", "summer"],
    stock: 33,
    rating: 4.6,
    reviews_count: 89,
    created_at: "2024-06-15T16:00:00Z",
    updated_at: "2024-10-25T14:45:00Z"
  },

  // ACCESSORIES - Bags
  {
    id: "prod_013",
    name: "Leather Crossbody Bag",
    description: "Handcrafted leather crossbody bag with minimalist design. Perfect size for essentials with adjustable strap.",
    category: "accessories",
    subcategory: "bags",
    brand: "Cuyana",
    price: 165,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"
    ],
    colors: ["cognac", "black", "olive"],
    sizes: ["One Size"],
    materials: ["Genuine Leather"],
    tags: ["handcrafted", "minimalist", "versatile", "durable"],
    style_tags: ["classic", "minimalist", "sophisticated"],
    occasion_tags: ["daily", "work", "travel", "weekend"],
    mood_tags: ["practical", "stylish", "confident"],
    season_tags: ["year-round"],
    stock: 31,
    rating: 4.6,
    reviews_count: 156,
    created_at: "2024-06-05T09:00:00Z",
    updated_at: "2024-10-30T12:20:00Z",
    // Emotional commerce additions
    energy_level: "neutral",
    personality_fit: ["practical", "sophisticated", "minimalist"],
    lifestyle_tags: ["professional", "urban", "organized"],
    confidence_boost: 7
  },
  {
    id: "prod_014",
    name: "Canvas Tote Bag",
    description: "Oversized canvas tote perfect for carrying everything you need. Sustainable and stylish.",
    category: "accessories",
    subcategory: "bags",
    brand: "Baggu",
    price: 38,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"],
    colors: ["natural", "black", "forest green"],
    sizes: ["One Size"],
    materials: ["100% Cotton Canvas"],
    tags: ["sustainable", "roomy", "casual", "versatile"],
    style_tags: ["casual", "minimalist", "sustainable"],
    occasion_tags: ["shopping", "beach", "work", "travel"],
    mood_tags: ["practical", "eco-conscious", "relaxed"],
    season_tags: ["year-round"],
    stock: 85,
    rating: 4.3,
    reviews_count: 234,
    created_at: "2024-05-10T09:00:00Z",
    updated_at: "2024-10-20T12:20:00Z",
    // Emotional commerce additions
    energy_level: "calm",
    personality_fit: ["eco-conscious", "practical", "casual"],
    lifestyle_tags: ["sustainable", "minimal", "student"],
    confidence_boost: 4
  },
  {
    id: "prod_015",
    name: "Mini Structured Bag",
    description: "Chic mini bag with structured silhouette. Perfect for evenings when you want to carry just the essentials.",
    category: "accessories",
    subcategory: "bags",
    brand: "Jacquemus",
    price: 485,
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"],
    colors: ["white", "pink", "yellow"],
    sizes: ["One Size"],
    materials: ["Leather"],
    tags: ["mini", "trendy", "statement", "luxury"],
    style_tags: ["trendy", "statement", "luxury"],
    occasion_tags: ["evening", "party", "date night"],
    mood_tags: ["playful", "trendy", "confident"],
    season_tags: ["spring", "summer"],
    stock: 12,
    rating: 4.5,
    reviews_count: 67,
    created_at: "2024-07-25T09:00:00Z",
    updated_at: "2024-10-15T12:20:00Z",
    // Emotional commerce additions
    energy_level: "energizing",
    personality_fit: ["trendy", "playful", "fashion-forward"],
    lifestyle_tags: ["social", "creative", "urban"],
    confidence_boost: 9
  },
  {
    id: "prod_021",
    name: "Classic Leather Handbag",
    description: "Timeless leather handbag with gold hardware. A sophisticated choice that elevates any outfit.",
    category: "accessories",
    subcategory: "bags",
    brand: "Celine",
    price: 1250,
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"],
    colors: ["black", "tan", "burgundy"],
    sizes: ["Medium", "Large"],
    materials: ["Italian Leather", "Gold Hardware"],
    tags: ["luxury", "timeless", "sophisticated", "investment"],
    style_tags: ["classic", "luxury", "sophisticated"],
    occasion_tags: ["work", "special events", "travel"],
    mood_tags: ["confident", "elegant", "professional"],
    season_tags: ["year-round"],
    stock: 8,
    rating: 4.9,
    reviews_count: 234,
    created_at: "2024-09-01T09:00:00Z",
    updated_at: "2024-11-01T12:20:00Z",
    // Emotional commerce additions
    energy_level: "energizing",
    personality_fit: ["sophisticated", "successful", "classic"],
    lifestyle_tags: ["luxury", "professional", "investment"],
    confidence_boost: 10
  },
  {
    id: "prod_022",
    name: "Soft Leather Shoulder Bag",
    description: "Buttery soft leather shoulder bag with elegant draping. Perfect for the sophisticated woman.",
    category: "accessories",
    subcategory: "bags",
    brand: "Bottega Veneta",
    price: 890,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"],
    colors: ["cream", "black", "forest green"],
    sizes: ["One Size"],
    materials: ["Nappa Leather"],
    tags: ["soft", "elegant", "luxury", "comfortable"],
    style_tags: ["modern", "luxury", "elegant"],
    occasion_tags: ["daily luxury", "brunch", "gallery opening"],
    mood_tags: ["sophisticated", "comfortable", "refined"],
    season_tags: ["year-round"],
    stock: 15,
    rating: 4.8,
    reviews_count: 112,
    created_at: "2024-08-15T09:00:00Z",
    updated_at: "2024-11-01T12:20:00Z",
    // Emotional commerce additions
    energy_level: "calm",
    personality_fit: ["sophisticated", "refined", "elegant"],
    lifestyle_tags: ["luxury", "mindful", "quality-focused"],
    confidence_boost: 8
  },

  // ACCESSORIES - Jewelry
  {
    id: "prod_016",
    name: "Gold Statement Earrings",
    description: "Bold geometric gold earrings that catch the light beautifully. Perfect for adding drama to any outfit.",
    category: "accessories",
    subcategory: "jewelry",
    brand: "Mejuri",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop"
    ],
    colors: ["gold", "rose gold"],
    sizes: ["One Size"],
    materials: ["14k Gold Plated", "Sterling Silver"],
    tags: ["statement", "geometric", "bold", "luxury"],
    style_tags: ["modern", "bold", "sophisticated"],
    occasion_tags: ["evening", "special events", "date night"],
    mood_tags: ["confident", "glamorous", "bold"],
    season_tags: ["year-round"],
    stock: 23,
    rating: 4.9,
    reviews_count: 78,
    created_at: "2024-08-12T12:30:00Z",
    updated_at: "2024-10-25T17:15:00Z"
  },
  {
    id: "prod_017",
    name: "Delicate Chain Necklace",
    description: "Minimalist gold chain necklace perfect for everyday wear or layering with other pieces.",
    category: "accessories",
    subcategory: "jewelry",
    brand: "Mejuri",
    price: 88,
    images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"],
    colors: ["gold", "silver"],
    sizes: ["16 inch", "18 inch"],
    materials: ["14k Gold Filled"],
    tags: ["delicate", "everyday", "layering", "minimalist"],
    style_tags: ["minimalist", "classic", "delicate"],
    occasion_tags: ["daily", "work", "casual"],
    mood_tags: ["subtle", "elegant", "refined"],
    season_tags: ["year-round"],
    stock: 47,
    rating: 4.7,
    reviews_count: 192,
    created_at: "2024-07-08T12:30:00Z",
    updated_at: "2024-10-22T17:15:00Z"
  },

  // SHOES
  {
    id: "prod_018",
    name: "White Leather Sneakers",
    description: "Classic white leather sneakers that go with everything. Comfortable and stylish.",
    category: "shoes",
    subcategory: "sneakers",
    brand: "Veja",
    price: 135,
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"],
    colors: ["white", "white with black"],
    sizes: ["6", "7", "8", "9", "10"],
    materials: ["Leather", "Rubber"],
    tags: ["comfortable", "versatile", "classic", "sustainable"],
    style_tags: ["casual", "minimalist", "classic"],
    occasion_tags: ["daily", "casual", "weekend", "travel"],
    mood_tags: ["comfortable", "effortless", "clean"],
    season_tags: ["year-round"],
    stock: 29,
    rating: 4.6,
    reviews_count: 245,
    created_at: "2024-06-20T12:30:00Z",
    updated_at: "2024-10-18T17:15:00Z"
  },
  {
    id: "prod_019",
    name: "Block Heel Sandals",
    description: "Comfortable block heel sandals in soft leather. Perfect height for all-day wear.",
    category: "shoes",
    subcategory: "sandals",
    brand: "Everlane",
    price: 98,
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop"],
    colors: ["tan", "black", "nude"],
    sizes: ["6", "7", "8", "9", "10"],
    materials: ["Leather"],
    tags: ["comfortable", "versatile", "work-appropriate", "walkable"],
    style_tags: ["classic", "professional", "comfortable"],
    occasion_tags: ["work", "dinner", "walking", "date"],
    mood_tags: ["confident", "comfortable", "polished"],
    season_tags: ["spring", "summer"],
    stock: 34,
    rating: 4.5,
    reviews_count: 167,
    created_at: "2024-05-25T12:30:00Z",
    updated_at: "2024-10-12T17:15:00Z"
  },
  {
    id: "prod_020",
    name: "Combat Boots",
    description: "Edgy leather combat boots with lace-up detail. Perfect for adding attitude to any outfit.",
    category: "shoes",
    subcategory: "boots",
    brand: "Dr. Martens",
    price: 170,
    images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d6e?w=500&h=600&fit=crop"],
    colors: ["black", "brown"],
    sizes: ["6", "7", "8", "9", "10"],
    materials: ["Leather"],
    tags: ["edgy", "durable", "statement", "versatile"],
    style_tags: ["edgy", "grunge", "street style"],
    occasion_tags: ["casual", "concerts", "weekend"],
    mood_tags: ["rebellious", "confident", "strong"],
    season_tags: ["fall", "winter"],
    stock: 21,
    rating: 4.8,
    reviews_count: 189,
    created_at: "2024-08-30T12:30:00Z",
    updated_at: "2024-10-28T17:15:00Z"
  }
]

// Product search and filtering functions
export class ProductDatabase {
  static getAllProducts(): Product[] {
    return mockProducts
  }

  static getProductsByCategory(category: string): Product[] {
    return mockProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    )
  }

  static searchByTags(tags: string[]): Product[] {
    const lowerTags = tags.map(tag => tag.toLowerCase())
    return mockProducts.filter(product => {
      const allProductTags = [
        ...product.tags,
        ...product.style_tags,
        ...product.occasion_tags,
        ...product.mood_tags,
        ...product.season_tags
      ].map(tag => tag.toLowerCase())
      
      return lowerTags.some(tag => 
        allProductTags.some(productTag => 
          productTag.includes(tag) || tag.includes(productTag)
        )
      )
    })
  }

  static searchByMood(moodKeywords: string[]): Product[] {
    const lowerKeywords = moodKeywords.map(keyword => keyword.toLowerCase())
    return mockProducts.filter(product => 
      product.mood_tags.some(mood => 
        lowerKeywords.some(keyword => 
          mood.toLowerCase().includes(keyword) || keyword.includes(mood.toLowerCase())
        )
      )
    )
  }

  static searchByOccasion(occasionKeywords: string[]): Product[] {
    const lowerKeywords = occasionKeywords.map(keyword => keyword.toLowerCase())
    return mockProducts.filter(product => 
      product.occasion_tags.some(occasion => 
        lowerKeywords.some(keyword => 
          occasion.toLowerCase().includes(keyword) || keyword.includes(occasion.toLowerCase())
        )
      )
    )
  }

  static searchByPriceRange(min: number, max: number): Product[] {
    return mockProducts.filter(product => {
      const price = product.sale_price || product.price
      return price >= min && price <= max
    })
  }

  static intelligentSearch(intent: string): Product[] {
    const intentLower = intent.toLowerCase()
    const words = intentLower.split(' ').filter(word => word.length > 2)
    
    // Extract mood/style keywords
    const moodKeywords = words.filter(word => 
      ['cozy', 'elegant', 'casual', 'professional', 'romantic', 'relaxed', 'confident', 'comfortable'].includes(word)
    )
    
    // Extract occasion keywords
    const occasionKeywords = words.filter(word => 
      ['work', 'date', 'dinner', 'casual', 'evening', 'office', 'home', 'weekend', 'special'].includes(word)
    )
    
    // Extract style keywords
    const styleKeywords = words.filter(word => 
      ['minimalist', 'bohemian', 'vintage', 'modern', 'classic', 'sophisticated'].includes(word)
    )
    
    // Combine all search results
    const allKeywords = [...moodKeywords, ...occasionKeywords, ...styleKeywords, ...words]
    let results = this.searchByTags(allKeywords)
    
    // If no results, broaden search
    if (results.length === 0) {
      results = mockProducts.filter(product => 
        words.some(word => 
          product.name.toLowerCase().includes(word) ||
          product.description.toLowerCase().includes(word) ||
          product.category.toLowerCase().includes(word)
        )
      )
    }
    
    // Sort by relevance (mock scoring)
    return results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, allKeywords)
      const scoreB = this.calculateRelevanceScore(b, allKeywords)
      return scoreB - scoreA
    }).slice(0, 8) // Return top 8 results
  }

  private static calculateRelevanceScore(product: Product, keywords: string[]): number {
    let score = 0
    const allProductText = [
      product.name,
      product.description,
      product.category,
      product.brand,
      ...product.tags,
      ...product.style_tags,
      ...product.mood_tags,
      ...product.occasion_tags
    ].join(' ').toLowerCase()
    
    keywords.forEach(keyword => {
      if (allProductText.includes(keyword.toLowerCase())) {
        score += 1
      }
    })
    
    // Boost score for highly rated products
    score += product.rating * 0.1
    
    return score
  }

  // Emotional commerce search method
  static emotionalSearch(filters: {
    mood?: string; // 'confident', 'cozy', 'elegant', etc.
    energy?: 'calm' | 'energizing' | 'neutral';
    personality?: string[]; // ['minimalist', 'bold', 'classic']
    occasion?: string; // 'presentation', 'date', 'home', etc.
    lifestyle?: string; // 'professional', 'creative', 'social'
    confidence_level?: number; // 1-10, product should boost to this level
  }): Product[] {
    return mockProducts.filter(product => {
      // Filter by mood
      if (filters.mood && !product.mood_tags.some(tag => 
          tag.toLowerCase().includes(filters.mood!.toLowerCase()) ||
          filters.mood!.toLowerCase().includes(tag.toLowerCase()))) {
        return false;
      }
      
      // Filter by energy level
      if (filters.energy && product.energy_level !== filters.energy) {
        return false;
      }
      
      // Filter by personality fit
      if (filters.personality && filters.personality.length > 0 && 
          !filters.personality.some(trait => 
            product.personality_fit?.some(fit => 
              fit.toLowerCase().includes(trait.toLowerCase()) ||
              trait.toLowerCase().includes(fit.toLowerCase())))) {
        return false;
      }
      
      // Filter by occasion
      if (filters.occasion && !product.occasion_tags.some(tag => 
          tag.toLowerCase().includes(filters.occasion!.toLowerCase()) ||
          filters.occasion!.toLowerCase().includes(tag.toLowerCase()))) {
        return false;
      }
      
      // Filter by lifestyle
      if (filters.lifestyle && !product.lifestyle_tags?.some(tag => 
          tag.toLowerCase().includes(filters.lifestyle!.toLowerCase()) ||
          filters.lifestyle!.toLowerCase().includes(tag.toLowerCase()))) {
        return false;
      }
      
      // Filter by confidence level (product should boost to desired level)
      if (filters.confidence_level && product.confidence_boost &&
          product.confidence_boost < filters.confidence_level) {
        return false;
      }
      
      return true;
    });
  }

  // Get personality types available in the product database
  static getPersonalityTypes(): string[] {
    const personalities = new Set<string>();
    mockProducts.forEach(product => {
      if (product.personality_fit) {
        product.personality_fit.forEach(trait => personalities.add(trait));
      }
    });
    return Array.from(personalities).sort();
  }

  // Get lifestyle tags available in the product database
  static getLifestyleTags(): string[] {
    const lifestyles = new Set<string>();
    mockProducts.forEach(product => {
      if (product.lifestyle_tags) {
        product.lifestyle_tags.forEach(tag => lifestyles.add(tag));
      }
    });
    return Array.from(lifestyles).sort();
  }

  // CRM-Enhanced Personalized Search
  static personalizedSearch(intent: string, userId?: string): Product[] {
    const userProfile = CRMService.getUserProfile(userId);
    const personalizationData = CRMService.getPersonalizationData(userId);
    
    // Start with intelligent search
    let results = this.intelligentSearch(intent);
    
    if (!userProfile) {
      return results; // Return basic results if no user profile
    }
    
    // Score products based on CRM data
    const scoredProducts = results.map(product => ({
      product,
      score: this.calculatePersonalizationScore(product, userProfile, personalizationData)
    }));
    
    // Sort by personalization score and return top products
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .map(item => item.product)
      .slice(0, 20); // Return top 20 personalized results
  }

  // Calculate personalization score based on CRM data
  private static calculatePersonalizationScore(
    product: Product, 
    userProfile: UserCRMProfile, 
    personalizationData: PersonalizationData
  ): number {
    let score = 0;
    
    // Brand preference (high weight)
    if (userProfile.preferredBrands.includes(product.brand)) {
      score += 30;
    }
    
    // Category preference
    if (userProfile.preferredCategories.includes(product.category)) {
      score += 25;
    }
    
    // Style personality match
    const styleMatch = product.style_tags.some(tag => 
      userProfile.stylePersonality.some(style => 
        style.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(style.toLowerCase())
      )
    );
    if (styleMatch) score += 20;
    
    // Price range compatibility
    const productPrice = product.sale_price || product.price;
    if (productPrice >= personalizationData.priceRange.min && 
        productPrice <= personalizationData.priceRange.max) {
      score += 15;
    }
    
    // Energy level preference
    if (product.energy_level === userProfile.energyPreference) {
      score += 15;
    }
    
    // Mood history alignment
    const recentMood = userProfile.moodHistory[0]?.mood;
    if (recentMood && product.mood_tags.includes(recentMood)) {
      score += 20;
    }
    
    // Confidence level alignment
    if (product.confidence_boost && product.confidence_boost >= userProfile.confidenceLevel - 2) {
      score += 10;
    }
    
    // Lifestyle compatibility
    const lifestyleMatch = product.lifestyle_tags?.some(tag =>
      userProfile.lifestyleSegment.toLowerCase().includes(tag.toLowerCase()) ||
      tag.toLowerCase().includes(userProfile.lifestyleSegment.toLowerCase())
    );
    if (lifestyleMatch) score += 15;
    
    // Color preferences (if available in user profile)
    const colorMatch = product.colors.some(color =>
      personalizationData.colorPreferences.some(prefColor =>
        color.toLowerCase().includes(prefColor.toLowerCase()) ||
        prefColor.toLowerCase().includes(color.toLowerCase())
      )
    );
    if (colorMatch) score += 10;
    
    // Material preferences
    const materialMatch = product.materials.some(material =>
      personalizationData.materialPreferences.some(prefMaterial =>
        material.toLowerCase().includes(prefMaterial.toLowerCase()) ||
        prefMaterial.toLowerCase().includes(material.toLowerCase())
      )
    );
    if (materialMatch) score += 10;
    
    // Recent search alignment
    const searchMatch = userProfile.recentSearches.some(search =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.tags.some(tag => search.toLowerCase().includes(tag.toLowerCase()))
    );
    if (searchMatch) score += 25;
    
    // Wishlist items
    if (userProfile.wishlistItems.includes(product.name)) {
      score += 40; // High score for wishlist items
    }
    
    // Loyalty tier bonus
    if (userProfile.loyaltyTier === 'Platinum') score += 5;
    else if (userProfile.loyaltyTier === 'Gold') score += 3;
    else if (userProfile.loyaltyTier === 'Silver') score += 1;
    
    return score;
  }

  // Get recommended products based on user profile
  static getRecommendationsForUser(userId?: string, limit: number = 10): Product[] {
    const userProfile = CRMService.getUserProfile(userId);
    if (!userProfile) {
      // Return popular products for new users
      return mockProducts
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    }
    
    const personalizationData = CRMService.getPersonalizationData(userId);
    
    // Score all products for this user
    const scoredProducts = mockProducts.map(product => ({
      product,
      score: this.calculatePersonalizationScore(product, userProfile, personalizationData)
    }));
    
    // Return top recommendations
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }

  // Get products similar to user's recent purchases
  static getSimilarToRecentPurchases(userId?: string, limit: number = 5): Product[] {
    const userProfile = CRMService.getUserProfile(userId);
    if (!userProfile || userProfile.orderCount === 0) {
      return [];
    }
    
    // For demo purposes, use preferred categories and brands
    return mockProducts.filter(product => 
      userProfile.preferredCategories.includes(product.category) ||
      userProfile.preferredBrands.includes(product.brand)
    ).slice(0, limit);
  }
}
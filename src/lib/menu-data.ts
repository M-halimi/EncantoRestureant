export interface MenuItem {
  id: number
  name: { en: string; fr: string; ar: string }
  category: "starters" | "moroccan" | "international" | "pasta" | "burgers" | "pizza" | "sandwich"
  price: number
  isVegan: boolean
  isGlutenFree: boolean
  description?: { en: string; fr: string; ar: string }
}

export const menuItems: MenuItem[] = [
  // Starters
  { id: 1, name: { en: "Harira soup", fr: "Soupe Harira", ar: "حساء الحريرة" }, category: "starters", price: 25, isVegan: true, isGlutenFree: true },
  { id: 2, name: { en: "Tomato soup", fr: "Soupe tomate", ar: "حساء الطماطم" }, category: "starters", price: 25, isVegan: true, isGlutenFree: true },
  { id: 3, name: { en: "Moroccan tapas", fr: "Tapas marocaines", ar: "تاباس مغربي" }, category: "starters", price: 55, isVegan: false, isGlutenFree: true },
  { id: 4, name: { en: "Greek salad", fr: "Salade grecque", ar: "سلطة يونانية" }, category: "starters", price: 65, isVegan: true, isGlutenFree: true },
  { id: 5, name: { en: "Capresse salad", fr: "Salade Caprese", ar: "سلطة كابريزي" }, category: "starters", price: 70, isVegan: true, isGlutenFree: true },
  { id: 6, name: { en: "Caesar salad", fr: "Salade César", ar: "سلطة سيزر" }, category: "starters", price: 70, isVegan: false, isGlutenFree: true },
  { id: 7, name: { en: "Encanto salad", fr: "Salade Encanto", ar: "سلطة إنسنتو" }, category: "starters", price: 70, isVegan: true, isGlutenFree: true },
  { id: 8, name: { en: "Smoothie bowl", fr: "Bol smoothie", ar: "وعاء سموثي" }, category: "starters", price: 70, isVegan: true, isGlutenFree: true },

  // Moroccan
  { id: 9, name: { en: "Veg tajin", fr: "Tajine végétarien", ar: "طاجين خضروات" }, category: "moroccan", price: 65, isVegan: true, isGlutenFree: true },
  { id: 10, name: { en: "Veg couscous", fr: "Couscous végétarien", ar: "كسكس خضروات" }, category: "moroccan", price: 70, isVegan: true, isGlutenFree: true },
  { id: 11, name: { en: "Veg pastilla", fr: "Pastilla végétarienne", ar: "بسطيلة خضروات" }, category: "moroccan", price: 70, isVegan: false, isGlutenFree: false },
  { id: 12, name: { en: "Chicken tajin", fr: "Tajine poulet", ar: "طاجين الدجاج" }, category: "moroccan", price: 75, isVegan: false, isGlutenFree: true },
  { id: 13, name: { en: "Chicken couscous", fr: "Couscous poulet", ar: "كسكس الدجاج" }, category: "moroccan", price: 80, isVegan: false, isGlutenFree: true },
  { id: 14, name: { en: "Chicken pastilla", fr: "Pastilla poulet", ar: "بسطيلة الدجاج" }, category: "moroccan", price: 80, isVegan: false, isGlutenFree: false },
  { id: 15, name: { en: "Lamb tajin", fr: "Tajine agneau", ar: "طاجين اللحم" }, category: "moroccan", price: 85, isVegan: false, isGlutenFree: true },
  { id: 16, name: { en: "Lamb couscous", fr: "Couscous agneau", ar: "كسكس اللحم" }, category: "moroccan", price: 90, isVegan: false, isGlutenFree: true },
  { id: 17, name: { en: "Kefta tajin", fr: "Tajine kefta", ar: "طاجين الكفتة" }, category: "moroccan", price: 75, isVegan: false, isGlutenFree: true },
  { id: 18, name: { en: "Sea food pastilla", fr: "Pastilla fruits de mer", ar: "بسطيلة البحر" }, category: "moroccan", price: 85, isVegan: false, isGlutenFree: false },

  // International
  { id: 19, name: { en: "Ratatouille", fr: "Ratatouille", ar: "راتاتوي" }, category: "international", price: 75, isVegan: true, isGlutenFree: true },
  { id: 20, name: { en: "Lasagna veggie", fr: "Lasagnes végétariennes", ar: "لازانيا خضروات" }, category: "international", price: 75, isVegan: true, isGlutenFree: false },
  { id: 21, name: { en: "Bolognese", fr: "Bolognaise", ar: "بولونيز" }, category: "international", price: 75, isVegan: false, isGlutenFree: false },
  { id: 22, name: { en: "Chicken parmesan", fr: "Poulet parmesan", ar: "دجاج بارميزان" }, category: "international", price: 80, isVegan: false, isGlutenFree: false },
  { id: 23, name: { en: "Creamy ranch chicken", fr: "Poulet ranch crémeux", ar: "دجاج رانش كريمي" }, category: "international", price: 90, isVegan: false, isGlutenFree: false },
  { id: 24, name: { en: "Mixed grilled", fr: "Grillade mixte", ar: "مشاوي مشكلة" }, category: "international", price: 95, isVegan: false, isGlutenFree: true },
  { id: 25, name: { en: "Fillet de boeuf", fr: "Fillet de boeuf", ar: "فيليه لحم" }, category: "international", price: 100, isVegan: false, isGlutenFree: true },

  // Pasta
  { id: 26, name: { en: "Napolitan", fr: "Napolitaine", ar: "نابوليتان" }, category: "pasta", price: 50, isVegan: true, isGlutenFree: false },
  { id: 27, name: { en: "Vegetarian", fr: "Végétarienne", ar: "نباتي" }, category: "pasta", price: 55, isVegan: true, isGlutenFree: false },
  { id: 28, name: { en: "Aglio e olio", fr: "Aglio e olio", ar: "أجليو إي أوليو" }, category: "pasta", price: 55, isVegan: true, isGlutenFree: false },
  { id: 29, name: { en: "Bolognese", fr: "Bolognaise", ar: "بولونيز" }, category: "pasta", price: 65, isVegan: false, isGlutenFree: false },
  { id: 30, name: { en: "Carbonara", fr: "Carbonara", ar: "كربونارا" }, category: "pasta", price: 65, isVegan: false, isGlutenFree: false },
  { id: 31, name: { en: "Alfredo", fr: "Alfredo", ar: "ألفريدو" }, category: "pasta", price: 70, isVegan: false, isGlutenFree: false },
  { id: 32, name: { en: "Sea food", fr: "Fruits de mer", ar: "مأكولات بحرية" }, category: "pasta", price: 75, isVegan: false, isGlutenFree: false },

  // Burgers (with fries)
  { id: 33, name: { en: "Veg burger", fr: "Burger végétarien", ar: "برغر نباتي" }, category: "burgers", price: 55, isVegan: true, isGlutenFree: false },
  { id: 34, name: { en: "Crispy chicken", fr: "Poulet croustillant", ar: "دجاج مقرمش" }, category: "burgers", price: 75, isVegan: false, isGlutenFree: false },
  { id: 35, name: { en: "Camel burger", fr: "Burger chameau", ar: "برغر جمل" }, category: "burgers", price: 85, isVegan: false, isGlutenFree: false },
  { id: 36, name: { en: "American burger", fr: "Burger américain", ar: "برغر أمريكي" }, category: "burgers", price: 90, isVegan: false, isGlutenFree: false },

  // Pizza (home made)
  { id: 37, name: { en: "Margherita", fr: "Margherita", ar: "مارغريتا" }, category: "pizza", price: 55, isVegan: true, isGlutenFree: false },
  { id: 38, name: { en: "Vegetarian", fr: "Végétarienne", ar: "نباتي" }, category: "pizza", price: 60, isVegan: true, isGlutenFree: false },
  { id: 39, name: { en: "Tuna", fr: "Thon", ar: "تونة" }, category: "pizza", price: 60, isVegan: false, isGlutenFree: false },
  { id: 40, name: { en: "Chicken", fr: "Poulet", ar: "دجاج" }, category: "pizza", price: 65, isVegan: false, isGlutenFree: false },
  { id: 41, name: { en: "Hawaiian", fr: "Hawaïenne", ar: "هاواي" }, category: "pizza", price: 65, isVegan: false, isGlutenFree: false },
  { id: 42, name: { en: "Regina", fr: "Regina", ar: "ريجينا" }, category: "pizza", price: 70, isVegan: false, isGlutenFree: false },
  { id: 43, name: { en: "Sea food", fr: "Fruits de mer", ar: "مأكولات بحرية" }, category: "pizza", price: 75, isVegan: false, isGlutenFree: false },
  { id: 44, name: { en: "4 Frommages", fr: "4 Fromages", ar: "4 أجبان" }, category: "pizza", price: 75, isVegan: false, isGlutenFree: false },
  { id: 45, name: { en: "Pepperoni", fr: "Pepperoni", ar: "بيبروني" }, category: "pizza", price: 75, isVegan: false, isGlutenFree: false },

  // Sandwich (with fries)
  { id: 46, name: { en: "Vegetarian", fr: "Végétarien", ar: "نباتي" }, category: "sandwich", price: 50, isVegan: true, isGlutenFree: false },
  { id: 47, name: { en: "Falafel", fr: "Falafel", ar: "فلافل" }, category: "sandwich", price: 50, isVegan: true, isGlutenFree: false },
  { id: 48, name: { en: "Chicken", fr: "Poulet", ar: "دجاج" }, category: "sandwich", price: 55, isVegan: false, isGlutenFree: false },
  { id: 49, name: { en: "Mexicain", fr: "Mexicain", ar: "مكسيكي" }, category: "sandwich", price: 55, isVegan: false, isGlutenFree: false },
  { id: 50, name: { en: "Chawarma", fr: "Chawarma", ar: "شاورما" }, category: "sandwich", price: 60, isVegan: false, isGlutenFree: false },
]

export const categories = [
  { id: "all", label: { en: "All", fr: "Tout", ar: "الكل" } },
  { id: "starters", label: { en: "Starters", fr: "Entrées", ar: "المقبلات" } },
  { id: "moroccan", label: { en: "Moroccan", fr: "Marocain", ar: "مغربي" } },
  { id: "international", label: { en: "International", fr: "International", ar: "عالمي" } },
  { id: "pasta", label: { en: "Pasta", fr: "Pâtes", ar: "معكرونة" } },
  { id: "burgers", label: { en: "Burgers", fr: "Burgers", ar: "برغر" } },
  { id: "pizza", label: { en: "Pizza", fr: "Pizza", ar: "بيتزا" } },
  { id: "sandwich", label: { en: "Sandwich", fr: "Sandwich", ar: "ساندويتش" } },
]

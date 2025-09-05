'use client'
import MainHome from "@/components/MainHome";
import { useCategoriesStore } from "../providers/categoriesStoreProvider";
import { useProductsStore } from "../providers/productsStoreProvider";
import { useEffect } from "react";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio. Perfeito para quem busca performance e qualidade fotográfica excepcional.",
    price: 8999.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 25,
    rating: 4.8,
    brand: "Apple"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone premium com S Pen integrada, câmera de 200MP e tela Dynamic AMOLED 2X de 6.8 polegadas. Ideal para produtividade e criatividade.",
    price: 7499.99,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 18,
    rating: 4.7,
    brand: "Samsung"
  },
  {
    id: 3,
    name: "MacBook Air M3",
    description: "Notebook ultrafino com chip M3, tela Liquid Retina de 13.6 polegadas e até 18 horas de bateria. Perfeito para trabalho e estudos.",
    price: 12999.99,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 12,
    rating: 4.9,
    brand: "Apple"
  },
  {
    id: 4,
    name: "PlayStation 5",
    description: "Console de nova geração com SSD ultra-rápido, ray tracing e controle DualSense com feedback tátil. A revolução dos games chegou.",
    price: 4199.99,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 8,
    rating: 4.6,
    brand: "Sony"
  },
  {
    id: 5,
    name: "Camiseta Básica Premium",
    description: "Camiseta 100% algodão com corte moderno e acabamento premium. Disponível em várias cores, ideal para o dia a dia.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "roupas",
    stock: 50,
    rating: 4.4,
    brand: "BasicWear"
  },
  {
    id: 6,
    name: "Jeans Skinny Masculino",
    description: "Calça jeans com elastano para maior conforto e mobilidade. Corte skinny moderno com lavagem escura premium.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "roupas",
    stock: 30,
    rating: 4.3,
    brand: "DenimCo"
  },
  {
    id: 7,
    name: "Vestido Floral Feminino",
    description: "Vestido midi com estampa floral delicada, tecido fluido e corte evasê. Perfeito para ocasiões especiais e uso casual.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    category: "roupas",
    stock: 22,
    rating: 4.5,
    brand: "FloralStyle"
  },
  {
    id: 8,
    name: "Tênis Esportivo Running",
    description: "Tênis para corrida com tecnologia de amortecimento avançado, cabedal respirável e solado antiderrapante.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    category: "roupas",
    stock: 35,
    rating: 4.6,
    brand: "RunTech"
  },
  {
    id: 9,
    name: "Sofá 3 Lugares Retrátil",
    description: "Sofá confortável com assento retrátil e reclinável, revestimento em tecido suede e estrutura de madeira maciça.",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "casa",
    stock: 6,
    rating: 4.7,
    brand: "ComfortHome"
  },
  {
    id: 10,
    name: "Mesa de Jantar 6 Lugares",
    description: "Mesa de jantar em madeira MDF com acabamento laminado, design moderno e capacidade para 6 pessoas.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop",
    category: "casa",
    stock: 10,
    rating: 4.4,
    brand: "ModernLiving"
  }
]

const categories = [
  {
    id: "eletronicos",
    name: "Eletrônicos",
    description: "Smartphones, laptops, consoles e mais",
    icon: "📱",
    productCount: 4
  },
  {
    id: "roupas",
    name: "Roupas e Calçados",
    description: "Moda masculina, feminina e acessórios",
    icon: "👕",
    productCount: 4
  },
  {
    id: "casa",
    name: "Casa e Decoração",
    description: "Móveis, decoração e utilidades domésticas",
    icon: "🏠",
    productCount: 3
  },
  {
    id: "livros",
    name: "Livros",
    description: "Literatura, técnicos, educacionais e mais",
    icon: "📚",
    productCount: 3
  },
  {
    id: "esportes",
    name: "Esportes e Lazer",
    description: "Equipamentos esportivos e atividades ao ar livre",
    icon: "⚽",
    productCount: 3
  }
]

export default function Home() {
  const { setProducts } = useProductsStore((state => state));
  const { setCategories } = useCategoriesStore((state => state));

  useEffect(() => {
    setProducts(products);
    setCategories(categories);
  }, [setProducts]);

  return <MainHome />
}

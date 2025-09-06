"use client"
import ChartItem from '@/components/ChartItem';
import React from 'react';

const product = {
    id: 1,
    name: "iPhone 15 Pro",
    description: "O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio. Perfeito para quem busca performance e qualidade fotográfica excepcional.",
    price: 8999.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    category: "eletronicos",
    stock: 25,
    rating: 4.8,
    brand: "Apple"
}

export default function Page() {

    return (
        <div style={{ marginTop: '10rem', fontFamily: 'Inter' }}>
            <ChartItem name={product.name} description={product.description} price={product.price} image={product.image} />
        </div>
    )
}

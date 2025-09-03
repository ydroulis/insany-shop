'use client'
import ProductCard from "@/components/ProductCard";
import Selector from "@/components/Selector";
import { useState } from "react";

const optionsCategory = [
  { value: 'eletronics', label: 'Eletrônicos' },
  { value: 'clothing', label: 'Roupas e Calçados' },
  { value: 'decoration', label: 'Casa e Decoração' },
  { value: 'books', label: 'Livros' },
  { value: 'sport', label: 'Esporte e Lazer' },
]

const optionsSort = [
  { value: 'newers', label: 'Novidades' },
  { value: 'higher', label: 'Preço: Maior - menor' },
  { value: 'lower', label: 'Preço: Menor - maior' },
]

export default function Home() {
  const [valueCategory, setValueCategory] = useState('Selecione a categoria');
  const [valueSort, setValueSort] = useState('Organizar por');
  return (
    <main style={{ padding: "0rem 10rem", fontFamily: "Inter, sans-serif" }}>
      <section style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
        <Selector type="category" options={optionsCategory} setValue={setValueCategory} value={valueCategory} label="Selecione a categoria" id="category" />
        <Selector type="sort" options={optionsSort} setValue={setValueSort} value={valueSort} label="Selecione a organização dos produtos" id="sort" />
      </section>
      <ProductCard
        id={1}
        name="Produto 1"
        description="Descrição do produto 1"
        price={99.99}
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
        category="Roupas e Calçados"
        stock={50}
        rating={4.5}
      />
    </main>
  );
}

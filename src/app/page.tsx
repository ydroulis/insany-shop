'use client'
import Button from "@/components/Button";
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
    <div style={{ padding: "0rem 10rem", fontFamily: "Inter, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
        <Selector type="category" options={optionsCategory} setValue={setValueCategory} value={valueCategory} label="Selecione a categoria" />
        <Selector type="sort" options={optionsSort} setValue={setValueSort} value={valueSort} label="Selecione a organização dos produtos" />
      </div>
    </div>
  );
}

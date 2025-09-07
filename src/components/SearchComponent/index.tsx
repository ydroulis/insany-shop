import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { searchProducts, SearchResponse } from '../../services/search';
import { useProductsStore } from '../../providers/productsStoreProvider';
import { getProducts } from '../../services/products';
import { Products } from '@/types/Products';

const SearchComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState<SearchResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState<Products>([]);

    const { setProducts } = useProductsStore((state) => state);

    useEffect(() => {
        if (!inputValue.trim()) {
            setResults(null);
            setIsOpen(false);
            return;
        }

        const fetchAllProducts = async () => {
            const res = await getProducts(1, 100);
            setAllProducts(res.products);
        };
        fetchAllProducts();

        setLoading(true);
        searchProducts(inputValue)
            .then((response) => {
                setResults(response);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [inputValue, setProducts]);

    useEffect(() => {
        if (inputValue.trim() === '') {

            const fetchProducts = async () => {
                const response = await getProducts();
                setProducts(response.products);
            }
            fetchProducts();
        }
    }, [inputValue, setProducts]);

    const handleClick = (item: string) => {
        const searchedProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(item.toLowerCase())
        );
        setInputValue(item);
        setProducts(searchedProducts);
        setIsOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === '') {
            setIsOpen(false);
            setResults(null);
        } else {
            setIsOpen(true);
        }
    };

    const handleClear = () => {
        setInputValue('');
        setResults(null);
    };

    return (
        <S.Container role="search" aria-label="Pesquisar no site">
            <label htmlFor="site-search" className="sr-only">
                <S.SrOnly>Procurar produtos</S.SrOnly>
            </label>

            <S.SearchWrapper>
                <S.SearchInput
                    value={inputValue}
                    onChange={handleChange}
                    id="site-search"
                    type="search"
                    placeholder="Procurando algo específico"
                    aria-label="Campo de busca"
                />

                <S.SearchIcon
                    data-testid="search-icon"
                    size={24}
                    aria-hidden={true}
                    focusable="false"
                />

                {inputValue && (
                    <S.ClearButton onClick={handleClear} aria-label="Limpar busca">
                        ×
                    </S.ClearButton>
                )}

                {loading && <p>Carregando...</p>}

                {isOpen && results && results.suggestions.length > 0 && (
                    <S.Suggestions role="listbox" aria-label="Sugestões de busca">
                        {!loading &&
                            results.suggestions.map((s, i) => (
                                <S.SuggestionItem
                                    key={i}
                                    role="option"
                                    aria-selected={false}
                                    tabIndex={0}
                                    onClick={() => handleClick(s)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleClick(s);
                                        }
                                    }}
                                >
                                    {s}
                                </S.SuggestionItem>
                            ))}
                    </S.Suggestions>
                )}
            </S.SearchWrapper>
        </S.Container>
    );
};

export default SearchComponent;

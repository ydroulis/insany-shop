'use client'
import React, { useRef, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

import * as S from './styles';
import { Options } from './Options';

interface SelectorProps {
    options: Options[]
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    label?: string
    type: 'category' | 'sort'
}

const Selector: React.FC<SelectorProps> = ({ options, setValue, value, label, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (option: string) => {
        setValue(option);
        setIsOpen(false);
        buttonRef.current?.focus();
    }

    return (
        <S.Container>
            <S.Selector
                $selectType={type}
                as="button"
                ref={buttonRef}
                id="custom-selector"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="selector-menu"
                aria-label={label}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{value}</span>
                <FaChevronDown className='icon' size={16} color='#737380' aria-hidden="true" />
            </S.Selector>
            <S.SelectorMenu
                id="selector-menu"
                role="listbox"
                aria-labelledby="custom-selector"
                $isOpen={isOpen}
            >
                {
                    options.map(option => (
                        <S.SelectorItem
                            key={option.value}
                            role="option"
                            tabIndex={0}
                            aria-selected={value === option.label}
                            onClick={() => handleClick(option.label)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleClick(option.label);
                                }
                            }}
                        >
                            {option.label}
                        </S.SelectorItem>
                    ))
                }
            </S.SelectorMenu>
        </S.Container>
    );
}

export default Selector;
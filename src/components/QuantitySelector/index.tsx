import React, { useRef, useState } from 'react';

import * as S from './styles';
import { Options } from '@/types/SelectorOptions';
import { FaChevronDown } from 'react-icons/fa';

interface QuantitySelectorProps {
    options: Options[]
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    label: string
    id: string
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ options, setValue, value, label, id }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (option: string) => {
        setValue(option);
        setIsOpen(false);
    }

    return (
        <S.QuantityContainer>
            <label id={`${id}-label`} className="sr-only">
                {label}
            </label>
            <S.QuantitySelector
                id={id}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${id}-label`}
                aria-controls={`${id}-listbox`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{value}</span>
                <FaChevronDown className='icon' size={16} color='#737380' aria-hidden="true" />
            </S.QuantitySelector>

            <S.QuantitySelectorMenu
                id={`${id}-listbox`}
                role="listbox"
                aria-labelledby={`${id}-label`}
                $isOpen={isOpen}
            >
                {options.map(option => (
                    <S.QuantitySelectorItem
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
                    </S.QuantitySelectorItem>
                ))}
            </S.QuantitySelectorMenu>
        </S.QuantityContainer>
    );
}

export default QuantitySelector;
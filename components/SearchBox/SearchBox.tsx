import styles from './SearchBox.module.css';
import { useState } from 'react';

export interface SearchBoxProps {
    onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {

    const [inputValue, setInputValue] = useState("");

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value; 
        setInputValue(newValue);
        onChange(newValue);
    }


    return (
    <input
            className={styles.input}
            type="text"
            placeholder="Search notes"
            value={inputValue}
            onChange={handleChange}
 />

)
}
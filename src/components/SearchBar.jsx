'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search images..."
                className="border px-4 py-2 rounded w-full"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
                Search
            </button>
        </form>
    );
}
'use client';
import { useState } from 'react';

export default function RandomImageViewer({ images }) {
    const [index, setIndex] = useState(Math.floor(Math.random() * images.length));

    const handleChange = () => {
        let newIndex = Math.floor(Math.random() * images.length);
        while (newIndex === index && images.length > 1) {
            newIndex = Math.floor(Math.random() * images.length);
        }
        setIndex(newIndex);
    };

    const image = images[index];

    return (
        <div className="text-center mt-6">
            <img src={image.src.large} alt={image.alt} className="rounded shadow-md mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Photo by {image.photographer}</p>
            <button
                onClick={handleChange}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
                Show Another Random Image
            </button>
        </div>
    );
}
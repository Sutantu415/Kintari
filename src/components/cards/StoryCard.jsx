'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const colorClassMap = {
  green: "from-green-100 to-green-200 border-green-300",
  blue: "from-blue-100 to-blue-200 border-blue-300",
  red: "from-red-100 to-red-200 border-red-300",
  yellow: "from-yellow-100 to-yellow-200 border-yellow-300",
};

const StoryCard = ({ title, color = "green", theme, country, image }) => {
  const [mounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState(image);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10); // Small delay for smoother transition
    return () => clearTimeout(timeout);
  }, []);

  const bgColorClasses = colorClassMap[color.toLowerCase()] || colorClassMap["green"];

  return (
    <div
      onClick={() => alert(`${title} pressed!`)}
      className={`cursor-pointer p-4 w-72 h-44 rounded-2xl bg-gradient-to-r ${bgColorClasses} border shadow-lg hover:scale-105 transition-transform flex flex-col justify-center items-center space-y-2
        transform transition duration-500 ease-out
        ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
        <Image
            src={imageUrl}
            alt={title}
            width={60}
            height={60}
            className="mb-2"
            onError={() => setImageUrl("/Logo.png")}
        />

        <h2 className="text-lg font-semibold text-center">{title}</h2>
        <p className="text-sm text-gray-700 text-center">
            {country} | {theme}
        </p>
    </div>
  );
};

export default StoryCard;

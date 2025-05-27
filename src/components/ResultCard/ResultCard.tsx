import React from 'react';
import { SearchResult } from '../../types/lastfm.types';

export interface ResultCardProps {
  result: SearchResult;
  onClick?: () => void;
  index?: number; // 🔧 ДОБАВЬ ЭТУ СТРОКУ
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onClick, index }) => {
  const { type, data } = result;

  const getImageUrl = () => {
    if ('image' in data && data.image?.length) {
      return data.image[data.image.length - 1]['#text'];
    }
    return '/placeholder-image.jpg';
  };

  // Пример вывода карточки (упрощён)
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer"
    >
      <div className="text-sm text-white">
        {index !== undefined ? `${index + 1}. ` : ''}
        {'name' in data ? data.name : 'Untitled'}
      </div>
    </div>
  );
};

export default ResultCard;

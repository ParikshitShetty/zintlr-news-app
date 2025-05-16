import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * A reusable card component that displays an image, title, and description using Tailwind CSS.
 */
export default function Card({ imageSrc, a_link, imageAlt, title, description, id }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/article/${id}`);
  };
  
  const handleIconClick = (e) => {
    e.stopPropagation();
    window.open(a_link, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div 
      className="max-w-2xl bg-gray-900 rounded-xl shadow-md overflow-hidden mx-auto flex flex-col sm:flex-row h-52 cursor-pointer relative" 
      key={id}
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 w-full sm:w-52 h-52">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-2xl transition ease-in-out hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4 flex flex-col justify-center h-48 flex-1">
        <h3 className="text-lg font-semibold my-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>
      <ExternalLink 
        size={20} 
        onClick={handleIconClick}
        className='absolute top-2 right-2 text-gray-400 hover:text-white transition focus:outline-none cursor-pointer'
      />
    </div>
  );
}

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id : PropTypes.number.isRequired,
  a_link : PropTypes.string.isRequired,
};

Card.defaultProps = {
  imageAlt: '',
};
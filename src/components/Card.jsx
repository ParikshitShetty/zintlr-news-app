import React from 'react';
import PropTypes from 'prop-types';
import { ExternalLink } from 'lucide-react';

/**
 * A reusable card component that displays an image, title, and description using Tailwind CSS.
 */
export default function Card({ imageSrc, a_link, imageAlt, title, description, id }) {
  return (
    <div className="max-w-2xl bg-gray-900 rounded-xl shadow-md overflow-hidden mx-auto flex flex-col sm:flex-row h-48 cursor-pointer relative" 
    key={id}
    >
      <div className="flex-shrink-0 w-full sm:w-48 h-48">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover rounded-2xl transition ease-in-out hover:scale-105 duration-300"
        />
      </div>
      <div className="p-4 flex flex-col justify-center h-48 flex-1">
        <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>
      <a
        href={a_link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 text-gray-400 hover:text-white transition"
        title="Read full article"
      >
        <ExternalLink size={20} />
      </a>
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
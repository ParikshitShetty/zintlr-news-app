import React from 'react'
import { Twitter, Facebook, Linkedin } from 'lucide-react';

const iconSize = 20;
export default function Socials({ url, title}) {
    const links = [
        {
            icon: <Twitter size={iconSize} />,
            link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        },
        {
            icon: <Facebook size={iconSize} />,
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        },
        {
            icon: <Linkedin size={iconSize} />,
            link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        }
    ]
    const handleIconClick = (e,link) => {
        e.stopPropagation();
        window.open(link, '_blank', 'noopener,noreferrer');
    };
  return (
    <>
        <div className="flex justify-center space-x-3 absolute top-1 right-10">
            {
                links.map((link,index) => (
                    <button
                        className="text-blue-500 hover:text-blue-700 cursor-pointer"
                        title="Share on Twitter"
                        onClick={(e) => handleIconClick(e,link.link)}
                    >
                        {link.icon}
                    </button>
                ))
            }
        </div>
    </>
  )
}
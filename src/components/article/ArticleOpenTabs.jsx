import { X } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';

function ArticleOpenTabs({ setMenuOpen, handleCardClick, handleCloseTab }) {
    const openTabs = useSelector(state => state.tabs.open);
  return (
    <>
        <div className="px-4 py-4 flex justify-between items-center">
              <h2 className="font-semibold">Open Tabs</h2>
              <button onClick={() => setMenuOpen(false)} className="p-1 mr-2  hover:bg-gray-900 rounded">
                <X size={20} />
              </button>
        </div>
        <div className="px-4 py-2">
              {openTabs.map((tab,index) => (
                <div key={index} className="flex items-center justify-between py-1">
                <button onClick={handleCardClick}>
                    <a className="text-blue-600 truncate w-full line-clamp-1">
                        {tab.length > 22 ? `${tab.slice(0,22)}...` : tab }
                    </a>
                </button>
                  <button onClick={() => handleCloseTab(tab)} className="p-1 hover:bg-gray-900 rounded">
                    <X size={14} />
                  </button>
                </div>
              ))}
        </div>
    </>
  )
}

export default ArticleOpenTabs
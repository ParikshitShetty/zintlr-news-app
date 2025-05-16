import React from 'react'
import { MoreHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

function ArticleHeader({ handleNewsChange, handleCloseTab, menuOpen ,setMenuOpen, article }) {
    const router = useRouter();
    const openTabs = useSelector(state => state.tabs.open);
  return (
    <>
        <div className="border-b px-6 py-4 flex items-center space-x-4">
              <button onClick={() => router.back()} className="p-1 hover:bg-gray-900 rounded cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => router.forward()} className="p-1 hover:bg-gray-900 rounded cursor-pointer">
                <ChevronRight size={20} />
              </button>

              {/* Tab bar */}
              <div className="flex space-x-2 overflow-x-scroll w-[75%] h-full">
                {openTabs.map((tab,index) => (
                  <button key={index}
                    className={`px-3 py-1 rounded-xl border inline-flex items-center justify-between cursor-pointer transition ease-in-out delay-300 ${tab === article.title ? 'bg-blue-600 border-blue-300' : 'border-gray-200'} whitespace-nowrap`}
                    onClick={() => handleNewsChange({ title:tab })}
                  >                
                        {tab}
                    <X 
                        size={20} 
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCloseTab(tab)
                        }}
                    />
                  </button>
                ))}
              </div>

            {!menuOpen && (
                <button
                    onClick={() => setMenuOpen(open => !open)}
                    className="ml-auto p-1 hover:bg-gray-900 rounded cursor-pointer"
                    aria-label="Open tabs menu"
                >
                    <MoreHorizontal size={20} />
                </button>
            )}
        </div>
    </>
  )
}

export default ArticleHeader
"use client";

import React, { use, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { openTab, closeTab } from '@/store/slices/tabsSlice';
import { ExternalLink, MoreHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Article({ params }) {
    const articles = useSelector(state => state.articles.articles);

    // console.log("Uooooo in Article",openTabs,closedTabs)
    const { id } = use(params);
    const router = useRouter();
    const dispatch = useDispatch();
    const openTabs = useSelector(state => state.tabs.open);
    const closedTabs = useSelector(state => state.tabs.closed);

    const [article, setArticle] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleCardClick = () => {
        router.push(`/article/${id}`);

    };

  // load article data (mock or API)
  useEffect(() => {
    if (!id) return;
    
    const articleObj = articles[id];
    setArticle(articleObj);
    // mark this tab as open
    if (articleObj?.title) {
        dispatch(openTab(articleObj.title));
    }
  }, [id, dispatch]);

  const handleCloseTab = (tabSlug) => {
    dispatch(closeTab(tabSlug));
    // if closing current, navigate to last open or homepage
    if (tabSlug === id) {
      const last = openTabs.filter(s => s !== id).pop();
      router.push(last ? `/article/${last}` : '/');
    }
  };

  const handleNewsChange = ({ title }) => {
    const articleObj = articles.find((art) => art.title === title);
    setArticle(articleObj);
  }

  if (!article) return null;

  return (
    <>
      <Head>
        <title>{article.title} • News</title>
        <meta name="description" content={article.summary} />
      </Head>
      <div className="min-h-screen ">
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
                className={`px-3 py-1  rounded-full border inline-flex items-center justify-between  ${tab === id ? 'bg-blue-600 border-blue-300' : 'border-gray-200'} whitespace-nowrap`}
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

        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <p className="text-gray-500 mb-6">By {article.author} • {article.publishedAt}</p>
          <img src={article.urlToImage} alt={article.title} className="w-full rounded-lg mb-6" />
          <div> {article.content} </div>
        </div>

        {/* Open Tabs Panel */}
        {menuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 shadow-lg border-l">
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
            {closedTabs.length > 0 && (
              <>
                <div className="px-4 py-2 border-t font-semibold">Recently closed</div>
                <div className="px-4 py-2">
                  {closedTabs.map((tab,index) => (
                    <div key={index} className="flex items-center justify-between py-1">
                      <button onClick={handleCardClick}>
                        <a className="text-gray-100 truncate">
                            {tab.length > 22 ? `${tab.slice(0,22)}...` : tab }
                        </a>
                      </button>
                      <button onClick={() => dispatch(openTab(tab))} className="p-1 hover:bg-gray-900 rounded">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

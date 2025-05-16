"use client";

import React, { use, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { openTab, closeTab } from '@/store/slices/tabsSlice';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleMainContianer from '@/components/article/ArticleMainContianer';
import ArticleOpenTabs from '@/components/article/ArticleOpenTabs';
import ArticleClosedTabs from '@/components/article/ArticleClosedTabs';

export default function Article({ params }) {
    const articles = useSelector(state => state.articles.articles);

    // console.log("Uooooo in Article",openTabs,closedTabs)
    const { id } = use(params);
    const router = useRouter();
    const dispatch = useDispatch();
    const openTabs = useSelector(state => state.tabs.open);

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
        <ArticleHeader 
            article={article} 
            handleCloseTab={handleCloseTab} 
            handleNewsChange={handleNewsChange}
            setMenuOpen={setMenuOpen}
        />
        <ArticleMainContianer 
            article={article}
        />
        {/* Open Tabs Panel */}
        {menuOpen && (
          <div className="fixed top-0 right-0 h-full w-64 shadow-lg border-l">
            <ArticleOpenTabs
                handleCardClick={handleCardClick}
                handleCloseTab={handleCloseTab}
                setMenuOpen={setMenuOpen}
            />
            <ArticleClosedTabs 
                handleCardClick={handleCardClick}

            />
          </div>
        )}
      </div>
    </>
  );
}

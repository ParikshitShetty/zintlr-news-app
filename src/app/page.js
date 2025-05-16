"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { concatArticles } from '@/store/slices/articleSlice'
import Card from "@/components/Card";
import { endpoints } from "@/constants/api";
import Loader from "@/utils/Loader";
import Pagination from "@/components/Pagination";

const articlesPerPage = 4;

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.articles);

  const [loading,setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [filteredArticles,setFilteredArticles] = useState([]);

  const currentPage =  useSelector(state => state.articles.currentPage);
  // const [currentPage,setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      fetch(endpoints.news_api).then((res) => res.json()).then((resJson) => {
        console.log("res",resJson)
        if (resJson.status === "ok" && resJson.articles.length > 0){
          dispatch(concatArticles(resJson.articles));
        }
      }).catch((err) => {
        console.error("Error while fetching news data:",err)
      }).finally(() => {
        setLoading(false);
      });
      // { id, slug, title, description, imageUrl }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length === 0) return;

    let filtered = []
    if (searchTerm.length === 0) {
      // setFilteredArticles(articles);
      const lastPostIndex = currentPage * articlesPerPage;
      const firstPostIndex = lastPostIndex - articlesPerPage;
      filtered = articles.slice(firstPostIndex,lastPostIndex)
    } else {
      filtered = articles.filter(({ title }) =>
        (title).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  },[searchTerm, articles, currentPage]);

  console.log("Uooooo",currentPage)
  return (
    <>
      <Head>
        <title>Trending News • Open-Source API</title>
        <meta
          name="description"
          content="Explore the top trending headlines from our open-source news API. Search and discover articles in real time."
        />
        <meta property="og:title" content="Trending News • Open-Source API" />
        <meta
          property="og:description"
          content="Explore the top trending headlines from our open-source news API. Search and discover articles in real time."
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen w-screen p-6">
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h1 className="text-3xl font-bold text-center mb-6">
          Trending news from an open-source API
        </h1>
      { loading ? 
        <Loader text="Fetching articles..." />
      : (
      <>
        <div className="space-y-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles?.map((article,index) => (
            <Card
              key={index}
              id={index}
              imageSrc={article.urlToImage}
              a_link={article.url}
              imageAlt={index}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
        {searchTerm.length === 0 ? (
          <Pagination
            totalArticles={articles.length}
            articlesPerPage={articlesPerPage}
            currentPage={currentPage}
            clicked={currentPage > 1}
            totalFilteredArticles={articles.length}
          />
        ) : (
          <div className="w-full h-full text-center">
            Sorry. Couldn't find what you are looking for.
          </div>
        )}
      </>)
      }
      </div>
    </>
  );
}

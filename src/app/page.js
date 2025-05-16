"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { concatArticles } from '@/store/slices/articleSlice'
import Card from "@/components/Card";
import { endpoints } from "@/constants/api";
import Loader from "@/utils/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.articles);

  const [loading,setLoading] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');
  const [filteredArticles,setFilteredArticles] = useState([]);

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
    if (searchTerm.length === 0) {
      setFilteredArticles(articles);
      return;
    };

    const filtered = articles.filter(({ title }) =>
      (title).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  },[searchTerm,articles]);

  console.log("Uooooo",articles)
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
        <h1 className="text-3xl font-bold text-center mb-6">
          Trending news from an open-source API
        </h1>
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      { loading ? 
        <Loader />
      :
        <div className="space-y-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article,index) => (
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
      }
      </div>
    </>
  );
}

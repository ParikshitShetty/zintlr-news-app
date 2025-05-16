import React from 'react'
import { formatDate } from '@/utils/date';

export default function ArticleMainContianer({article}) {
  return (
    <>
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
            <p className="text-gray-500 mb-6">By {article.author} • {formatDate(article.publishedAt)}</p>
            <img src={article.urlToImage} alt={article.title} className="w-full rounded-lg mb-6" />
            <div> {article.content} </div>
        </div>
    </>
  )
}
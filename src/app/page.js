"use client";

import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { concatArticles } from '@/store/slices/articleSlice'
import Card from "@/components/Card";

let cardsData = [
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "David Nield",
      "title": "How to Use Apple Maps on the Web",
      "description": "Apple’s mapping platform is no longer exclusively for Apple devices. A pared-down version runs in your browser; here’s how to use it.",
      "url": "https://www.wired.com/story/how-to-use-apple-maps-on-the-web/",
      "urlToImage": "https://media.wired.com/photos/681d1858c4e2ebb974e997a0/191:100/w_1280,c_limit/apple-maps-laptop-gear-%202212761261.jpg",
      "publishedAt": "2025-05-13T12:00:00Z",
      "content": "The boundaries ofApples walled garden arent as well defined as they used to be; Apple Maps is the latest app to break out. It has taken a whilethe app launched in 2012but you can now use Apple Maps o… [+2274 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Kate Knibbs",
      "title": "Trump’s Tariffs Are Threatening America’s Apple Juice Supply Chain",
      "description": "Most of the apple juice Americans drink is imported, with a large share coming from China. Experts say families should expect to start paying higher prices for the beloved beverage.",
      "url": "https://www.wired.com/story/apple-juice-shortage-tariffs/",
      "urlToImage": "https://media.wired.com/photos/6812934a8f16f415836a2072/191:100/w_1280,c_limit/Apple-Juice-Shortage-Business-2211147875.jpg",
      "publishedAt": "2025-05-06T11:00:00Z",
      "content": "Few foods are more American than apple pie, but the truth is, some of the countrys favorite apple products arent actually made in the United States. Apple juice, a perennial lunchroom staple, is a pr… [+2760 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Paresh Dave",
      "title": "Apple May Face Criminal Charges for Allegedly Lying to a Federal Judge",
      "description": "A US judge says Apple deliberately chose not to comply with an order requiring it to loosen App Store rules—and then tried to cover up its disobedience.",
      "url": "https://www.wired.com/story/antitrust-judge-asks-doj-prosecute-apple/",
      "urlToImage": "https://media.wired.com/photos/6812b2ad2fb47b18ddd52359/191:100/w_1280,c_limit/Apple-Antitrust-Judge-Business-2194365320.jpg",
      "publishedAt": "2025-05-01T00:20:26Z",
      "content": "Apple willfully chose not to comply with a court order to loosen its app store restrictionsand one of its executives lied under oath about the companys plans, a federal judge wrote on Wednesday.\r\nJud… [+2982 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Lauren Goode, Kylie Robison",
      "title": "Sam Altman's Eye-Scanning Orb Is Now Coming to the US",
      "description": "At a high-profile event in San Francisco, World announced it is launching a series of Apple-like stores, as well as a partnership with dating giant Match Group.",
      "url": "https://www.wired.com/story/sam-altman-orb-eyeball-scan-launch-us/",
      "urlToImage": "https://media.wired.com/photos/68128fbb8756b2b4fe46373f/191:100/w_1280,c_limit/OpenAI-Orb-Sam-Altman-Business-2198164474.jpg",
      "publishedAt": "2025-05-01T02:24:31Z",
      "content": "Sam Altmans iris-scanning, identify-verification technology startup is expanding to the US, and will attempt to bridge the divide between blockchain-based financial networks and the payment services … [+2383 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Steven Levy",
      "title": "Airbnb Is in Midlife Crisis Mode",
      "description": "CEO Brian Chesky is spending hundreds of millions to relaunch his travel company as an everything app. Fitness! Food! Microdermabrasion? A WIRED exclusive.",
      "url": "https://www.wired.com/story/airbnb-is-in-midlife-crisis-mode-reinvention-app-services/",
      "urlToImage": "https://media.wired.com/photos/6822476247f5e6d08106fda0/191:100/w_1280,c_limit/WIRED_2025_05_07_Chesky_-109x.jpg",
      "publishedAt": "2025-05-13T18:30:00Z",
      "content": "Chesky explains that historically, people used Airbnb only once or twice a year, so its design had to be exceptionally simple. Now the company is retooling for more frequent access. Open the app, and… [+3280 chars]"
    },
    {
      "source": {
        "id": "wired",
        "name": "Wired"
      },
      "author": "Christopher Null",
      "title": "EssilorLuxottica Nuance Audio Glasses Review: The Future of Hearing",
      "description": "When hearing aids hide in plain sight.",
      "url": "https://www.wired.com/review/essilorluxottica-nuance-audio-glasses/",
      "urlToImage": "https://media.wired.com/photos/681595c6867602ea02e66d8d/191:100/w_1280,c_limit/EssilorLuxottica-Nuance-Audio-Glasses_052025_Lede.jpg",
      "publishedAt": "2025-05-05T13:00:00Z",
      "content": "Heres the dirty secret about hearing aids. Millions of people need them. Most dont wear them. Why? Because they hate having shit in their ears. Pardon my French.\r\nI often feel the same way. I have mi… [+1678 chars]"
    }
];
cardsData = JSON.parse(JSON.stringify(cardsData));

export default function Home() {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.articles);

  useEffect(() => {
    // Fetch from open-source API, then map to include slug
    async function fetchArticles() {
      const res = await fetch('/api/articles');
      const data = await res.json();
      // data should include an array of articles with { id, slug, title, description, imageUrl }
      // setArticles(data);
    }
    // fetchArticles();
    dispatch(concatArticles(cardsData))
  }, []);

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
            // value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {articles.map((article,index) => (
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
      </div>
    </>
  );
}

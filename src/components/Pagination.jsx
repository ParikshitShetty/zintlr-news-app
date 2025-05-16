import { nextPage, pageReset, prevPage } from "@/store/slices/articleSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({
  totalArticles,
  articlesPerPage,
  totalFilteredArticles,
  clicked,
}) => {
    const [isFiltered, setIsFiltered] = useState(false);

    const currentPage =  useSelector(state => state.articles.currentPage);
    const dispatch = useDispatch();
  

  console.log("totalFilteredArticles",totalFilteredArticles,totalArticles,articlesPerPage)
  // Total pages depending on filtered state
  const totalPages = isFiltered
    ? Math.ceil(totalFilteredArticles / articlesPerPage)
    : Math.ceil(totalArticles / articlesPerPage);

    // console.log("totalPages",totalPages)
//   const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle wrapping backward
  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(prevPage());
    }
  };

  // Handle wrapping forward
  const handleNext = () => {
      if (currentPage < totalPages) {
      dispatch(nextPage());
    }
  };

  // Update filtered status
  useEffect(() => {
    setIsFiltered(totalFilteredArticles > 0);
  }, [totalFilteredArticles, clicked]);

  // Reset to page 1 on filter change
  useEffect(() => {
    if (isFiltered) {
      dispatch(pageReset());
    }
  }, [isFiltered]);

  return (
    <nav className="w-full h-auto flex justify-center items-center">
      <ul className="inline-flex items-center -space-x-px -ml-2 md:ml-0">
        <li>
          <button
            onClick={handlePrev}
            className={`px-2 md:px-3 py-2 border border-gray-300 rounded-l-lg text-gray-500 ${currentPage === 1 ? `cursor-not-allowed` : `cursor-pointer hover:bg-stone-300`}`}
            disabled={currentPage === 1}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        <li>
            <button
              className="px-3 py-2 mx-4 border bg-lime-500 text-white rounded-lg">
              {currentPage}
            </button>
          </li>

        <li>
          <button
            onClick={handleNext}
            className={`px-2 md:px-3 py-2 border border-gray-300 rounded-r-lg text-gray-500 ${currentPage === totalPages ? `cursor-not-allowed` : `cursor-pointer hover:bg-stone-300`}`}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
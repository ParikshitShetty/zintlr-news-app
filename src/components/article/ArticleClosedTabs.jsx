import React from 'react'
import { openTab } from '@/store/slices/tabsSlice';
import { ExternalLink } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

export default function ArticleClosedTabs({ handleCardClick }) {
    const closedTabs = useSelector(state => state.tabs.closed);
    const dispatch = useDispatch();
  return (
    <>
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
    </>
  )
}
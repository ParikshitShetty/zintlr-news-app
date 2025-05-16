"use client";

import React, { use } from 'react'
import { useSelector } from 'react-redux';

export default function Article({ params }) {
    // const openTabs = useSelector(state => state.tabs.open);
    // const closedTabs = useSelector(state => state.tabs.closed);

    // console.log("Uooooo in Article",openTabs,closedTabs)
    const { id } = use(params);
    console.log("params",id)
    return (
        <>
            <div className='text-yellow-400 min-h-screen w-full'>
                Heyo { id }
            </div>
        </>
    )
}

import React from 'react'

export default function Loader({ text = "Loading..." }) {
  return (
    <div className='w-full h-full text-center'>
        <div className="flex flex-col items-center justify-center h-48 w-full">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mb-3"></div>
            <p className="text-gray-300 text-lg">{text}</p>
        </div>
    </div>
  )
}
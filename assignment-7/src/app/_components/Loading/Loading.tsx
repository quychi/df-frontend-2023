import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-10 bg-white w-full h-full flex justify-center items-center">
      <FadeLoader color="#D44C61" />
    </div>
  )
}

export default Loading

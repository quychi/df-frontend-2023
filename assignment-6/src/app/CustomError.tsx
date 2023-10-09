import Link from 'next/link'
import React from 'react'

const CustomError = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-white">
      <h2>Something went wrong!</h2>
      <br />
      <Link href="/books">
        <p className="text-red-primary hover:opacity-80 font-bold">
          &lt; Back to book list page
        </p>
      </Link>
    </div>
  )
}

export default CustomError

import Link from 'next/link'
import React from 'react'

const CustomError = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 bg-white">
      <h2>Something went wrong!</h2>
      <Link href="/books">
        <p className="text-red-primary hover:opacity-80 font-bold">
          &lt; Back to book list page
        </p>
      </Link>
    </div>
  )
}

export default CustomError

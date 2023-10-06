import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col space-y-8 justify-center items-center w-full h-full">
      <h2 className="text-7xl font-bold">404</h2>
      <p className="font-bold">Page not found</p>
      <Link href="/">
        <p className="text-red-primary hover:opacity-80 font-bold">
          &lt; Back to Home
        </p>
      </Link>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'

export const Header = () => (
  <header className="flex justify-between items-center w-full h-[50px] bg-white border-b-2 border-solid border-gray-b9 pl-2.5 pr-2.5">
    <nav className="text-2xl font-bold cursor-pointer">
      <Link href="/">Bookstore</Link>
    </nav>
    <div className="flex justify-between items-center gap-3">
      <Image
        width={30}
        height={30}
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        alt="avatar"
        className="rounded-[50%]"
      />
      <p className="text-base">John Doe</p>
    </div>
  </header>
)

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from './Button'
import { useAuthContext } from '../_context/auth'

export const Header = () => {
  const authContext = useAuthContext()

  const handleLogout = () => {
    if (authContext) {
      authContext.logout()
    }
  }

  return (
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
        <Button
          btnText="Log out"
          className="underline underline-offset-4 font-bold text-amber-400"
          onClick={handleLogout}
        />
      </div>
    </header>
  )
}

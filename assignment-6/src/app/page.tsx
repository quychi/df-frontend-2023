'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PAGE } from './_consts/page'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push(PAGE.SignIn.getUrl({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Home

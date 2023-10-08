'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PAGE } from './_consts/page'
import { useBookStoreContext } from './_stores/bookStore'

const dummyData = [
  {
    id: '1',
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '2',
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  { id: '3', name: 'The Phoenix Project', author: 'Gene Kim', topic: 'DevOps' },
  {
    id: '4',
    name: 'Refactoring 2',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '5',
    name: 'Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '6',
    name: 'Refactoring 3',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '7',
    name: 'Designing Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '8',
    name: 'The Phoenix Project 2',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '9',
    name: 'Refactoring 4',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '10',
    name: 'Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '11',
    name: 'Refactoring 5',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '12',
    name: 'Designing Data-Intensive Applications 3',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '13',
    name: 'The Phoenix Project 3',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '14',
    name: 'Refactoring 6',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '15',
    name: 'Data-Intensive Applications 3',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '16',
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '17',
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '18',
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '19',
    name: 'Refactoring 2',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '20',
    name: 'Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '21',
    name: 'Refactoring 3',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '22',
    name: 'Designing Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '23',
    name: 'The Phoenix Project 2',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '24',
    name: 'Refactoring 4',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '25',
    name: 'Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '26',
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '27',
    name: 'Refactoring 2',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '28',
    name: 'Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '29',
    name: 'Refactoring 3',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '30',
    name: 'Designing Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
  {
    id: '31',
    name: 'The Phoenix Project 2',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: '32',
    name: 'Refactoring 4',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: '33',
    name: 'Data-Intensive Applications 2',
    author: 'Martin Kleppmann',
    topic: 'Database',
  },
]

const Home = () => {
  const router = useRouter()
  const { setBookStore } = useBookStoreContext()

  useEffect(() => {
    const savedBooks = localStorage.getItem('booksData')
    if (savedBooks && savedBooks !== '[]') {
      setBookStore((prev) => ({ ...prev, booksData: JSON.parse(savedBooks) }))
    } else {
      setBookStore((prev) => ({ ...prev, booksData: dummyData }))
    }

    router.push(PAGE.BookList.getUrl({}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default Home

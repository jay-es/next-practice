import { Container } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Pagination } from '../components/Pagination'
import { PostList } from '../components/PostList'
import { Post, User } from '../types'
import { fetchPosts, fetchUsers } from '../utils/fetch'

type Props = { posts: Post[]; users: User[] }

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()])

  return {
    props: { posts, users },
  }
}

const Index = ({ posts, users }: Props) => {
  const ITEMS_PER_PAGE = 8
  const [currentPage, setPage] = useState(0)
  const [currentItems, setItems] = useState<Post[]>([])

  useEffect(() => {
    const start = currentPage * ITEMS_PER_PAGE
    setItems(posts.slice(start, start + ITEMS_PER_PAGE))
  }, [currentPage])

  return (
    <Container py="8">
      <PostList posts={currentItems} users={users} />
      <Pagination
        currentPage={currentPage}
        totalCount={posts.length}
        perPage={ITEMS_PER_PAGE}
        setPage={setPage}
      />
      <DarkModeSwitch />
    </Container>
  )
}

export default Index

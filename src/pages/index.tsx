import { Container } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
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
  return (
    <Container py="8">
      <PostList posts={posts} users={users} />
      <DarkModeSwitch />
    </Container>
  )
}

export default Index

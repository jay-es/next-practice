import { Link as ChakraLink, List, ListItem, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Post, User } from '../types'

type Props = { posts: Post[]; users: User[] }
export const PostList = ({ posts, users }: Props) => {
  const postsWithUserName = posts.map((post) => ({
    ...post,
    userName: users.find((user) => user.id === post.userId)?.name,
  }))
  return (
    <List spacing={3} my={0}>
      {postsWithUserName.map((post) => (
        <ListItem key={post.id} borderRadius={4} borderWidth={1}>
          <NextLink href={`/posts/${post.id}`}>
            <ChakraLink p={4} display="block">
              <Text>{post.title}</Text>
              <Text color="gray.500">by {post.userName}</Text>
            </ChakraLink>
          </NextLink>
        </ListItem>
      ))}
    </List>
  )
}

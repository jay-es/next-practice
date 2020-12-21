import { Container, Heading, List, ListItem, Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { Post, Comment, User } from '../../types'
import {
  fetchCommentsByPostId,
  fetchPostById,
  fetchUserById,
} from '../../utils/fetch'

type Props = { post: Post; comments: Comment[]; user: User }

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const postId = Number(context.query.id)
  const [post, comments] = await Promise.all([
    fetchPostById(postId),
    fetchCommentsByPostId(postId),
  ])
  const user = await fetchUserById(post.userId)

  return {
    props: { post, comments, user },
  }
}

const PostPage = ({ post, comments, user }: Props) => {
  return (
    <Container py="8">
      <Heading as="h1" mb={2}>
        {post.title}
      </Heading>
      <Text fontWeight="600" mb={4}>
        by {user.name}
      </Text>
      <Text>{post.body}</Text>

      <Heading as="h4" size="md" mt={8} mb={2}>
        Comments
      </Heading>

      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id} borderTopWidth={1} py={4}>
            <Heading as="h4" size="sm" mb={1}>
              {comment.name}
            </Heading>
            <Text fontSize="sm">{comment.body}</Text>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default PostPage

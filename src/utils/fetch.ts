import { Comment, Post, User } from '../types'

type Id = number | string
const BESE_URL = 'https://jsonplaceholder.typicode.com'
const toJson = (res: Response) => res.json()

export const fetchPosts = (): Promise<Post[]> =>
  fetch(`${BESE_URL}/posts`).then(toJson)

export const fetchPostById = (postId: Id): Promise<Post> =>
  fetch(`${BESE_URL}/posts/${postId}`).then(toJson)

export const fetchCommentsByPostId = (postId: Id): Promise<Comment[]> =>
  fetch(`${BESE_URL}/posts/${postId}/comments`).then(toJson)

export const fetchUsers = (): Promise<User[]> =>
  fetch(`${BESE_URL}/users`).then(toJson)

export const fetchUserById = (userId: Id): Promise<User> =>
  fetch(`${BESE_URL}/users/${userId}`).then(toJson)

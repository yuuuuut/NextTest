import { Post } from '../models/Post'
import { User } from '../models/User'
import firebase from 'firebase/app'

/**
 * snapshotをmapしてpostに必要な情報を追加し、
 * 新しい配列を既存のpostsにconcatする
 */
async function appendPosts(
  snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>,
  setFunction: any,
  posts: Array<Post>
) {
  const gotPosts: Array<Post> = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const post = doc.data() as Post
      post.id = doc.id

      const user = await post.user.get()

      post.userData = user.data() as User

      return post
    })
  )
  setFunction(posts.concat(gotPosts))
}

/**
 * queryをgetして、存在しなかったら終了。
 * 存在した場合はappendPosts
 */
export async function loadPosts(
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
  setIsPaginationFinished: any,
  setPosts: any,
  posts: Array<Post>
) {
  const snapshot = await query.get()

  if (snapshot.empty) {
    setIsPaginationFinished(true)
    return
  }

  appendPosts(snapshot, setPosts, posts)
}

/**
 * postsが存在する場合、startAfterで次のPost群を取得し、
 * appendPostsする。
 */
export async function loadNextPosts(
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
  setIsPaginationFinished: any,
  setPosts: any,
  posts: Array<Post>
) {
  if (posts.length === 0) {
    return
  }

  const lastPost = posts[posts.length - 1]
  const snapshot = await query.startAfter(lastPost.createdAt).get()

  if (snapshot.empty) {
    setIsPaginationFinished(true)
    return
  }

  appendPosts(snapshot, setPosts, posts)
}

import { User } from './User'

export type Image = {
  id: string
  path: string
}

export type PreviewImage = {
  id: string
  path: string | undefined
  blob: Blob
}

export type Post = {
  id: string
  body: string
  images: Array<Image>
  user: firebase.default.firestore.DocumentReference
  userData: User
  createdAt: firebase.default.firestore.Timestamp
}

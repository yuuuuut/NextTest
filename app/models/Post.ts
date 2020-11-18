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
  userId: string
  createdAt: firebase.default.firestore.Timestamp
}

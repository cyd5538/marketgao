export type PostType = {
  id: string
  userId: string
  localName: string
  koreanName: string
  latitude: string
  longitude: string
  address: string
  title: string
  description: string
  createdAt?: string
  menu: string[]
  phoneNumber: string
  mainImage: string
  subImages: string[]
  link: string
  likedIds : string[]
  comments?: {
    createdAt: string
    id: string
    postId: string
    userId: string
  }[]
}

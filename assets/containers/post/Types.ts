export interface UserType {
    id: number,
    username: string
}

export interface CommentType {
    id: number,
    content: string,
    fkUser: UserType
}

export interface PostType {
    id: number,
    title: string,
    content: string,
    imageUrl: string,
    createdAt: string
    fkBook: {
        id: number,
        title: string
    },
    fkUser: UserType,
    comments: CommentType[]
}

export interface Post {
  id: number,
  content: string,
  createdAt: string,
  title: string,
  imageUrl: string,
  fkBook: {
    id: number,
    title: string
  },
  fkUser: {
    id: number,
    username: string
  }
}

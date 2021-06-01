export interface UserType {
    id: number,
    username: string
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
    comments: {
        id: number,
        content: string
        fkUser: UserType,
    }[]
}

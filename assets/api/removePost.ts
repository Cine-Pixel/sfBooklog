const removePost = async (token: string, postId: number, userId: number) => {
    const response = await fetch("/api/post/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        },
        body: JSON.stringify({postID: postId, userID: userId})
    })

    return response.json();
}

export default removePost;
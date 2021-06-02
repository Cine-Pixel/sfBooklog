const removeComment = async (token: string, id: number, userId: number) => {
    const response = await fetch("/api/comments/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        },
        body: JSON.stringify({commentID: id, userID: userId})
    })

    return response.json();
}

export default removeComment;
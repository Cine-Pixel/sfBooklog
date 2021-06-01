const submitComment = async (token: string, comment: string, id: number) => {
    const response = await fetch("/api/comments/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        },
        body: JSON.stringify({content: comment, postID: id})
    });
    return response.json();
}

export default submitComment;
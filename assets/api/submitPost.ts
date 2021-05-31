const submitPost = async (token: string, formData: FormData) => {
    const response = await fetch("./api/post/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        },
        body: formData
    });
    return await response.json();
}

export default submitPost;
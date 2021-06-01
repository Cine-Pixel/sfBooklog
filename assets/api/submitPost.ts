const submitPost = async (token: string, formData: FormData) => {
    const response = await fetch("./api/post/create", {
        method: "POST",
        headers: {
            "Authorization": `BEARER ${token}`
        },
        body: formData
    });
    return response.json();
}

export default submitPost;
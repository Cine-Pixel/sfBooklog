const fetchComments = async (token:string, id: number) => {
    const response = await fetch("/api/comments/list/"+id, {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
    })
    return response.json();
}

export default fetchComments;
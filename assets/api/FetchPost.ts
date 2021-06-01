const FetchPost = async (token:string, id: number) => {
    try{
        const response = await fetch(`/api/post/show/${id}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        });
        if(!response.ok) throw new Error("bad request");
        else return response.json();
    } catch(e) {
        console.error(e);
    }
}

export default FetchPost;
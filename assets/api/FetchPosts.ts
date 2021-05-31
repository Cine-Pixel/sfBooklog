const fetchPosts = async (token: string) => {
    try{
        const response = await fetch("./api/post/list", {
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

export default fetchPosts;
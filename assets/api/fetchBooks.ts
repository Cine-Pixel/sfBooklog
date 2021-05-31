const fetchBooks = async (token: string) => {
    try {
        const response = await fetch("./api/books/featured", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `BEARER ${token}`
            }
        });
        if(!response.ok) throw new Error("Invalid token");
        else {
            return await response.json();
        }
    } catch(e) {
        console.error(e.message);
    }
}

export default fetchBooks;
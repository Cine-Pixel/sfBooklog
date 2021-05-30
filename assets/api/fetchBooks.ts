const fetchBooks = async (token: string) => {
    const response = await fetch("./api/books/featured", {
        method: "GET",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `BEARER ${token}`
        }
    });
    return response.json();
}

export default fetchBooks;
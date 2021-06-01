const searchBook = async (token: string, keyword: string) => {
    const response = await fetch("/api/books/search/"+keyword, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        }
    });
    return response.json();
}

export default searchBook;
const fetchUserData = async (token: string) => {
    const response = await fetch("/api/user/current", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        }
    });
    return response.json();
}

export default fetchUserData;
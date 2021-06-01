const fetchFullUserData = async (token: string) => {
    const response = await fetch("/api/user/current-full", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `BEARER ${token}`
        }
    });
    return response.json();
}

export default fetchFullUserData;
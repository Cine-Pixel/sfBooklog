const updateProfile = async (token: string, data: FormData) => {
    const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
            "Conteny-Type": "application/json",
            "Authorization": `BEARER ${token}`
        },
        body: data
    });
    return response.json();
}

export default updateProfile;
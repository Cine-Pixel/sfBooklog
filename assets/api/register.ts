const register = async (firstname: string, lastname: string, email:string, pass: string, pass2: string) => {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: pass,
            password2: pass2
        })
    })
    return response.json();
}

export default register;
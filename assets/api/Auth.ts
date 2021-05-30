const Login = async (email: string, passowrd: string) => {
    const response = await fetch("./api/login_check", {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            "username": email,
            "password": passowrd
        })
    });
    return response.json();
}

const Register = async () => {
    console.log("heey");
}

export {Login, Register};
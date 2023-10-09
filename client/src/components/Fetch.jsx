export async function registerUser(userData) {
    const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
}

export async function loginUser(userData) {
    const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    console.log("response : ",response)
    const data = response.status;
    return data;
}


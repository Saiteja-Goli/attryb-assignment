export async function registerUser(userData) {
    const response = await fetch("https://attryb-backend-saiteja-goli.vercel.app/user/register", {
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
    const response = await fetch('https://attryb-backend-saiteja-goli.vercel.app/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    console.log("response : ", response)
    const data1 = await response.json();//Token
    const data = response.status;
    return { data, data1 };
}
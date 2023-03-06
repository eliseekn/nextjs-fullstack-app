
//https://github.com/vercel/next.js/blob/canary/examples/api-routes-rest/pages/index.tsx
export const fetcher = (url: string, method: string, token: string, body: string = '') => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: body
    })
        .then((res) => res.json())
}

//https://javascript.info/task/truncate
export const truncate = (str: string, length: number) => {
    return (str.length > length) ? str.slice(0, length - 1) + '...' : str;
}

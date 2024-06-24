
const backendPath = "http://localhost:3000/api"

export function fetchFromBackend (path: string, method: string, body: any) {
    return  fetch(backendPath + path, {
        headers:{
            "Content-Type": "application/json",
        },
        method: method,
        body: JSON.stringify(body)
    });
}
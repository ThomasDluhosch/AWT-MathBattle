
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

export function fetchFromBackendAuth (path: string, method: string, token: string, body: any = undefined) {
    return  fetch(backendPath + path, {
        headers:{
            "Content-Type": "application/json",
            "authorization": "Bearer " + token,
        },
        method: method,
        body: JSON.stringify(body)
    });
}
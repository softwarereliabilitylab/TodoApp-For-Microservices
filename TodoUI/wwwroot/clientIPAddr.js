export function clientIPAddr() {
    return fetch('https://jsonip.com/')
        .then((response) => response.json())
        .then((data) => {
            return data.ip
        });
}
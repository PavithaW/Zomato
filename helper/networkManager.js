export function sendData(data) {
    const querystring = Object.keys(data)
        .map(key => key + "=" + encodeURIComponent(data[key]))
        .join("&");
    const URL = "https://developers.zomato.com/api/v2.1/search?"+ querystring
    const API_KEY = "b1dc09be3ca9c4079edb830199c38b35"

    return fetch(URL, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'user-key':API_KEY,
        }),
    })
        .then((response) => {return response.json()})
        // .then((responseText) => {
        //     console.log(responseText);
        //   })

        .catch((error) => {
            console.error(error);
        });
}
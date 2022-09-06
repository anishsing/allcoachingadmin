import moment from "moment";
import { serverApiUrl } from "../index"


export const updateConfig =(config,callback) =>
{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admin/updateConfig",
        {
            method: 'PUT',
            headers,
            body:JSON.stringify(config)
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const getConfig =(callback) =>
{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admin/getConfig",
    {
        method: 'GET',
        headers, 
    })
    .then((response) => callback(response))
    .catch((error) => { console.log(error) })
}
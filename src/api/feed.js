import { serverApiUrl } from "..";

export const fetch_feedById = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl + 'feed/byid/' +id,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({feedType})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetch_comments = (feedId, offset, dataLimit, callback) => {
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + 'feed/feed/comment/' + feedId + '/' + offset + '/' + dataLimit,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}



export const deleteByFeedId=(id,callback)=>
{

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + 'feed/deleteFeedById/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })

}
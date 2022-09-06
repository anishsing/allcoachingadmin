import {serverApiUrl} from "../index"


export const fetch_institute_reviews=(insId,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/'+offset+'/'+dataLimit+'/id/'+insId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateReview=(id, review, rating, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/updateReview/',
        {
            method: 'PUT',  
            headers,
            body:JSON.stringify({id, review, rating})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

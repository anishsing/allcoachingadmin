import { serverApiUrl } from "..";

export const fetch_report=(offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
       
    apiUrl = serverApiUrl+`feedReport/getReports/${offset}/${dataLimit}`; 
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const deleteReportById=(id,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
       
    apiUrl = serverApiUrl+`feedReport/deleteById/${id}`; 
    fetch(apiUrl,
    {
        method: 'DELETE',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const deleteReportByFeedId=(id,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
       
    apiUrl = serverApiUrl+`feedReport/deleteByFeedId/${id}`; 
    fetch(apiUrl,
    {
        method: 'DELETE',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const getUnSeenReportCount =(callback) =>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        
            apiUrl = serverApiUrl+`feedReport/UnSeenFeedReportCount`;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateReportSeenStatus =(reportId,status,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`feedReport/updateFeedReportSeenStatus?reportId=${reportId}&status=${status}`;
      
    fetch(apiUrl,
    {
        method: 'PUT',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

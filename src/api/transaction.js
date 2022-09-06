import { serverApiUrl } from "..";

export const fetch_allTransactions=(offset,dataLimit,callback,status=-1)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        if(status==-1)
        {
            apiUrl = serverApiUrl+'transaction/all/'+offset+"/"+dataLimit;
        }
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetch_allTransactionsByStudentName=(name,offset,dataLimit,callback,status=-1)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl  = serverApiUrl+'transaction/allTransactionsByStudentName/'+offset+"/"+dataLimit+"?name="+name;
        
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetch_allSuccessTransactions=(offset,dataLimit,callback,status=-1)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        if(status==-1)
        {
            apiUrl = serverApiUrl+'transaction/allSuccess/'+offset+"/"+dataLimit;
        }
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const fetch_courseTransactions=(id, page, pageSize, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl = serverApiUrl+"transaction/bycourseId/"+id+"/"+page+"/"+pageSize;
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const getUnSeenTransactionsCount =(callback) =>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        
            apiUrl = serverApiUrl+"transaction/UnSeenTransactionCount/";
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateTransactionSeenStatus =(transactionId,status,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`transaction/updateTransactionSeenStatus?transactionId=${transactionId}&status=${status}`;
      
    fetch(apiUrl,
    {
        method: 'PUT',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


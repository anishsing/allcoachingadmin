import {serverApiUrl} from "../index"

export const fetchContactUs=(offset,datalimit,callback)=>
{
    
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'contact_us/'+offset+'/'+datalimit+'/',
    {
        method: 'GET',   
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const deleteContactUs=(id,callback)=>
{
    
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'contact_us/'+id,
    {
        method: 'DELETE',   
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
import {serverApiUrl} from "../index"
    
export const fetch_courses_banners=(courseId,callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'/institute/course/banners/all/'+courseId,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const homeBanners=(callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'mainbanners//',
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const deleteHomeBanners=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'mainbanners/'+id,
        {
            method: 'DELETE',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const editBanner=(id, bannerLink, placeHolder, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'mainbanners/details',
        {
            method: 'PUT',  
            headers,
            body:JSON.stringify({id,placeHolder,bannerLink})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const editBannerImage=(image, id, callback)=>
{
    var formData   = new FormData();  
    formData.append("file", image) 
    formData.append("id",id)
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'mainbanners/image',
    {
        method: 'PUT',  
        // headers,
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const addBanner=(bannerLink, placeholder, image, callback)=>
{
    var formData   = new FormData();  
    formData.append("file", image) 
    formData.append("bannerLink", bannerLink) 
    formData.append("placeholder", placeholder) 
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'mainbanners/upload/',
    {
        method: 'POST',  
        // headers,
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
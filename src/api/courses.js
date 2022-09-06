import {serverApiUrl} from "../index"

    export const fetch_institute_courses=(instId,isDeleted,callback)=>
    {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'institute/'+instId+"/course?isDeleted="+isDeleted,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

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

    export const fetch_courses_videos=(courseId=-1,offset,dataLimit,callback,playlistId=-1)=>
    {

          
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl;
                if(playlistId == -1)
                {
                    apiUrl = serverApiUrl+'institute/course/video/all/'+courseId+"/"+offset+"/"+dataLimit
                }else
                {
                    apiUrl = serverApiUrl+'institute/course/video/playlist/'+playlistId+"/"+offset+"/"+dataLimit
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

    export const fetch_courses_documents=(courseId=-1,offset,dataLimit,callback,playlistId=-1)=>
    {

                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl;
                if(playlistId == -1)
                {
                    apiUrl = serverApiUrl+'/institute/course/document/all/'+courseId+"/"+offset+"/"+dataLimit
                }else
                {
                    apiUrl = serverApiUrl+'/institute/course/document/playlist/'+playlistId+"/"+offset+"/"+dataLimit
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



    export const fetch_testSeries = (courseId,offset,dataLimit,callback)=>
    {

                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl = serverApiUrl+'/institute/course/testseries/all/'+courseId+"/"+offset+"/"+dataLimit
                
                    
                fetch(apiUrl,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }

    export const deleteCourse=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const deleteBanner=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/course/banners/delete/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const deleteVideo=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/course/video/delete/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    
    export const deleteDocument=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/course/document/delete/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const getDocumentCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/document/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getVideoCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/video/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getTestSeriesCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/testseries/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getBannerCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/banners/countbyCoureId/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    

import React,{ useState, useEffect} from 'react'
import { serverBaseUrl } from '../../../..';

function CourseVideoRow(props) {
    const {row,index,delVideo}=props 
      
    const [ title,setTitle] = useState(row.name);
    const [description,setDescription] = useState(row.description)
    const [video,setVideo] = useState(serverBaseUrl+row.videoLocation)
    const [videoId,setVideoId] = useState(row.id);
    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center">{title}</td>
        <td align="center">{description}</td>
        {/* <td align="center"> 
            <video width="320" height="240" controls>
                <source src={video} type="video/mp4"/>
            </video>  
        </td> */}
   
        <td align="center">
        <button aria-label="delete" onClick={()=>delVideo(videoId,index)} className="btn btn-danger mr-1">
            DELETE
        </button> 
        <a href={video} target="_blank" aria-label="view" className="btn btn-primary">
            VIEW
        </a>
          

 
        </td>
    </tr>
    )
}

export default CourseVideoRow

import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { serverBaseUrl } from '../../../..';
 
function CourseBannerRow(props) {
    const {row,index,delBanner}=props 
      
    const [ bannerImage,setBannerImage] = useState(serverBaseUrl+""+ row.bannerImageLink);
    const [bannerId,setBannerId] = useState(row.id);
    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center"> <img src={bannerImage} className="img-responsive w-50 h-50"/></td>
   
        <td align="center">
        <button aria-label="delete" onClick={()=>delBanner(bannerId,index)} className="btn btn-danger mr-1">
            DELETE
        </button> 
          

 
        </td>
    </tr>
    )
}

export default CourseBannerRow

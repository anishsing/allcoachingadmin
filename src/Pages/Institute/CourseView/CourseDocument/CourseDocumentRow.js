import React, { useState, useEffect }from 'react'
import { serverBaseUrl } from '../../../..';

function CourseDocumentRow(props) {
    const {row,index,delDocument}=props 
      
    const [ title,setTitle] = useState(row.name);
    const [document,setDocument] = useState(serverBaseUrl+""+row.fileAddress)
    const [documentId,setDocumentId] = useState(row.id);

    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center">{title}</td>  
   
        <td align="center">
        <button aria-label="delete" onClick={()=>delDocument(documentId,index)} className="btn btn-danger mr-1">
            DELETE
        </button> 
        <a href={document} target="_blank" aria-label="view" className="btn btn-primary">
            VIEW
        </a>
          

 
        </td>
    </tr>
    )
}

export default CourseDocumentRow

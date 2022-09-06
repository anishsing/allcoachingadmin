import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function CourseRow(props) {
    const {row,index,delCourse}=props
    const [title,setTitle] = useState(row.title);
    const [description,setDescription] = useState(row.description);
    const [fees,setFees] = useState(row.fees);
    const [leads,setLeads] = useState(row.leads);
    const [courseId,setCourseId] = useState(row.id);
    return (
        <tr>
        <td align="center">{index+1}</td>
        <td align="center">{title}</td>
        <td align="center">{description}</td>
        <td align="center">{fees}</td>
        <td align="center">{leads}</td>
   
        <td align="center">
        <button aria-label="delete" onClick={()=>delCourse(courseId,index)} className="btn btn-danger mr-1">
            DELETE
        </button> 
        <Link to={"/ins/course/"+courseId+"/courseId"} aria-label="view" className="btn btn-primary">
            VIEW
        </Link>
         

 
        </td>
    </tr>
    )
}

export default CourseRow

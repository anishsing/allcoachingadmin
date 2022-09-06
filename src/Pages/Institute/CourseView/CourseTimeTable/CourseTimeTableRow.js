import React, { useState, useEffect }from 'react'

function CourseTimeTableRow(props) {
    const {row,index,parentIndex,delSubject}=props  
    const [ title,setTitle] = useState(row.title); 
    const [date,setDate] = useState(row.date)
    const [time,setTime] = useState(row.time)
    const [subTitle,setSubTitle] = useState(row.subTitle)
    const [subjectId,setSubjectId] = useState(row.id);

    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center">{title}</td>
        <td align="center">{subTitle}</td> 
        <td align="center">{date}</td>  
        <td align="center">{time}</td>   
        <td align="center">
            <button aria-label="delete" onClick={()=>delSubject(subjectId,index,parentIndex,"item")} className="btn btn-danger mr-1">
                DELETE
            </button> 
         
        </td>
    </tr>
    )
}
export default CourseTimeTableRow

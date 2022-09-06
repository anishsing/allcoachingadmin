import React,{ useState, useEffect} from 'react'

function CourseTestSeriesRow(props) {
    const {row,index,delDocument}=props 
      
    const [ title,setTitle] = useState(row.title); 
    const [maxMarks,setMaxMarks] = useState(row.maxMarks)
    const [duration,setDuration] = useState(row.timeDuration)
    const [questionCount,setQuestionCount] = useState(row.questionCount)
    const [seriesId,setSeriesId] = useState(row.id);

    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center">{title}</td>
        <td align="center">{duration}</td>  
        <td align="center">{maxMarks}</td>  
        <td align="center">{questionCount}</td>  
   
        {/* <td align="center">
        <button aria-label="delete" onClick={()=>delDocument(seriesId,index)} className="btn btn-danger mr-1">
            DELETE
        </button> 
        <a href={document} target="_blank" aria-label="view" className="btn btn-primary">
            VIEW
        </a>
          

 
        </td> */}
    </tr>
    )
}

export default CourseTestSeriesRow

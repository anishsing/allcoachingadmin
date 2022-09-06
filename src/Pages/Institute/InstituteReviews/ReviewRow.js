import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom';

function ReviewRow(props) {
    const {row,index,delReview} = props; 
    const [student,setStudent] = useState(row.studentName);
    const [rating,setRating] = useState(row.insReview.rating);
    const [review,setReview] = useState(row.insReview.review);
    const [reply,setReply] = useState(row.insReview.reply);
    const [reviewId,setReviewId] = useState(row.insReview.id);
    return (
        <tr>
            <td align="center">{index+1}</td>
            <td align="center">{student}</td>
            <td align="center">{rating}</td>
            <td align="center">{review}</td>
            <td align="center">{reply}</td>
    
            <td align="center">
            <button aria-label="delete" onClick={()=>delReview(reviewId,index)} className="btn btn-danger mr-1">
                DELETE
            </button> 
            
            

    
            </td>
        </tr>
    )
}

export default ReviewRow

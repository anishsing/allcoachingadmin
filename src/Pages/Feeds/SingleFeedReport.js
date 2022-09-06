import React, { useState, useEffect } from 'react'
import { deleteStudent, updateStudentStatus } from '../../api/student'

import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import { deleteReportById } from '../../api/feedReport';
import moment from 'moment';
 
export default function SingleFeedReport(props) {

  
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)




    const deleteFeedReportCallback = (response, index) => {
        if (response.status == 200) {
            console.log('data has been delete for student')
            // response.json().then(data=>{
            //     console.log('deleting Student data', data)
            // })
            props.deleteAtIndex(index)
            setSnackBarMessage(" Deleted Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('Ooops! Something went wrong while deleting!')
        }
    }

    const action4DeleteReport = (id,  index) => {
       

        if (window.confirm('Are you sure to Delete')) {

            deleteReportById(id, (response) => deleteFeedReportCallback(response, index))

        } else {
            console.log('cancel mission del')
        }

    }

 

 

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <>

            <tr>
                <td align="center">{props.index + 1}</td>
                <td align="center">{props.row.text}</td>
                <td align="center">{props.row.description}</td>
                <td align="center">{moment(props.row.reportDate).format('DD.MM.YYYY')}</td> 
                <td align="center"> 
                    <button className="btn btn-danger m-1" onClick={(e) => action4DeleteReport(props.row.id,  props.index)}>Delete</button>
                    <Link to={"/feed/"+props.row.feed.id} className="btn btn-info m-1">View</Link>

                 
                    {/* {!isBlock ? (
                        <>
                            <button className="btn btn-success m-1" onClick={(e) => action4ChangeStudentStatus(props.row.id, props.row.name, true)}>UnBlock</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-success m-1" onClick={(e) => action4ChangeStudentStatus(props.row.id, props.row.name, false)}>Block</button>
                        </>
                    )} */}




                    {/*
                delete
                view */}
                </td>
                <Snackbar
                    open={isSnackBarShow}
                    onClose={(e)=>closeSnack(e)}
                    TransitionComponent="TransitionUp"
                    message={SnackBarMessage}
                />
            </tr>

        </>
    )
}

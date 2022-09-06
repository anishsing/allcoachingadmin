import React, { useState, useEffect } from 'react'
import { deleteStudent, updateStudentStatus } from '../../api/student'

import { Link } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import { deleteById } from '../../api/message';
import moment from 'moment';
import { deleteContactUs } from '../../api/contactUs';
export default function ContactUsRow(props) {

  
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)




    const deleteCallback = (response, index) => {
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

    const action4Delete = (id,  index) => {
       

        if (window.confirm('Are you sure to Delete')) {

            deleteContactUs(id, (response) => deleteCallback(response, index))

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
                <td align="center">{props.row.name}</td>
                <td align="center">{props.row.email}</td>
                <td align="center">{props.row.phone}</td>
                <td align="center">{props.row.designation}</td>
                <td align="center">{moment(props.row.createdAt).format('DD-MM-YYYY HH:mm')}</td>
 
                <td align="center">


                    <button className="btn btn-danger m-1" onClick={(e) => action4Delete(props.row.id,  props.index)}>Delete</button>
                    <button className="btn btn-info m-1" onClick={(e) => {

                        props.setShowMessage(true,props.row,props.index)
                    }}>View</button>

                 
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

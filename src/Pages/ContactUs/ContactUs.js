import React, { useState, useEffect, useRef } from 'react'
import { dataLimit, serverBaseUrl, theme } from '../../index'
import { fetch_studentList, findStudentByName, findStudentByEmail } from '../../api/student'
import ClipLoader from "react-spinners/ClipLoader";
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal'
import { Image, Shimmer } from 'react-shimmer'
import {  addMessageReplyImage, addReply, fetch_messagesWithRepliesAs } from '../../api/message';
import { useParams } from 'react-router';
import ContactUsRow from './ContactUsRow';


import Snackbar from '@material-ui/core/Snackbar';
import { fetchContactUs } from '../../api/contactUs';


export default function ContactUs({}) {

    const [contactUsData, setContactUsData] = useState([]);
    
    const [offset, setOffset] = useState(0);
    const [showNextButton, setShowNextButton] = useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
     
    const [isLoading, setLoading] = useState(false)
    const [replyModalVisible,setReplyModalVisible] = useState(false)
    const [messageObj,setMessageObj] = useState(false)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [index,setIndex] = useState(null)
    const fetchContactUsDataCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => { 
                setContactUsData(data)
                console.log(data)
                setShowShimmer(false)
            })
        }
    }

    useEffect(() => {
         
        fetchContactUs(offset, dataLimit, fetchContactUsDataCallback)
    }, [offset])

    const deleteAtIndex = (index) => {
        let studentData_local = [...contactUsData]
        studentData_local.splice(index, 1);
        setContactUsData(studentData_local)
    }

 
    

    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")
        }

    }
    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    const prePageHandler = () => {
        if (offset > 0) {
            setOffset(offset - 1)
        }
        else if (offset == 0) {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)

    }
   
    
  
    return (
        <>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Contact Us</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">

                </div>
            </div>
 
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Name</th>
                                    <th align="center">Email</th>
                                    <th align="center">Phone</th>  
                                    <th align="center">Designation</th>  
                                    <th align="center">Date</th>  
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="6">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <> 
                                        {contactUsData && contactUsData.map((row, i) => (
                                            <ContactUsRow 
                                                row={row} 
                                                index={i} 
                                                deleteAtIndex={deleteAtIndex} 
                                                setShowMessage={(status,data,index)=>{setReplyModalVisible(true);setMessageObj(data)}}
                                                
                                            />
                                        ))} 
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    {offset > 0 ? (

                        <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                    ) : (null)}
                    {!allDataLoaded && showNextButton ? (
                        <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                    ) : (null)}

                </div>
            </div>


            <Modal
                visible={replyModalVisible}
                setModalVisible={setReplyModalVisible}
                modalId={"replyModal"}
            > 
                    <ModalHeader>
                        <h5 className="modal-title">Contact Us Message </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody> 
                        <div class="card-body p-md-1"> 
                            <div class="form-group">
                                <label>Message</label>
                                <textarea  readOnly value={messageObj.message} class="form-control" required placeholder="Student Message"  ></textarea>
                            </div>
                          
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                       
                    </ModalFooter>
               
            </Modal>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />

        </>
    )
}

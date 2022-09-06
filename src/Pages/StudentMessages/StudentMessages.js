import React, { useState, useEffect, useRef } from 'react'
import { dataLimit, serverBaseUrl, theme } from '../../index'
import { fetch_studentList, findStudentByName, findStudentByEmail } from '../../api/student'
import ClipLoader from "react-spinners/ClipLoader";
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal'
import { Image, Shimmer } from 'react-shimmer'
import {  addMessageReplyImage, addReply, fetch_messagesWithRepliesAs } from '../../api/message';
import { useParams } from 'react-router';
import SingleMessageRow from './SingleMessageRow';


import Snackbar from '@material-ui/core/Snackbar';


export default function StudentMessages({}) {

    const [studentMessagesData, setStudentMessagesData] = useState([]);
    
    const [offset, setOffset] = useState(0);
    const [showNextButton, setShowNextButton] = useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    const {messageType,replied} = useParams()
    const [reply,setReply] = useState("")
    const [replyMessageobj,setReplyMessageObj] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [replyModalVisible,setReplyModalVisible] = useState(false)
    const [messageImages,setMessageImages] = useState([])
    const inputFile = useRef(null)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [index,setIndex] = useState(null)
    const fetchStudentMessageCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => { 
                setStudentMessagesData(data)
                console.log(data)
                setShowShimmer(false)
            })
        }
    }

    useEffect(() => {
        console.log("replied ",replied)
        fetch_messagesWithRepliesAs(replied,true,messageType,offset, dataLimit, fetchStudentMessageCallback)
    }, [offset,replied,messageType])

    const deleteAtIndex = (index) => {
        let studentData_local = [...studentMessagesData]
        studentData_local.splice(index, 1);
        setStudentMessagesData(studentData_local)
    }


    const addReplyBtnHandler=()=>
    {

        setLoading(true)

        if(messageImages.length>0)
        {
            addMessageReplyImage({...replyMessageobj,reply,replied:true},messageImages,(response,images)=>{

                if(response.status == 201)
                {
                    setReplyModalVisible(false)
                    setSnackBarMessage("Replied Successfully")
                    let studentData_local = [...studentMessagesData]
                    studentData_local[index] = {...replyMessageobj,reply,replied:true,images:[...replyMessageobj.images, ...images]};
                    setStudentMessagesData(studentData_local)
                    setReply("")
                    setIndex(null)
                    setMessageImages([])
                }else
                {
                    setSnackBarMessage("Something went wrong")
                }
                setLoading(false)
                setIndex(null)
                setIsSnackBarShow(true)
            })
        }else
        {
                 
            addReply({...replyMessageobj,reply,replied:true},(response)=>{

                if(response.status == 201)
                {
                    setReplyModalVisible(false)
                    setSnackBarMessage("Replied Successfully")
                    let studentData_local = [...studentMessagesData]
                    studentData_local[index] = {...replyMessageobj,reply,replied:true};
                    setStudentMessagesData(studentData_local)
                    setReply("")
                    setMessageImages([])
                    setIndex(null)

                }else
                {
                    setSnackBarMessage("Something went wrong")
                }
                setLoading(false)
                setIsSnackBarShow(true)
                setIndex(null)  
            })
        }
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
    const removeImage=(item,index)=>
    {
        let messageImages_arr = [...messageImages]
        messageImages_arr.splice(index, 1);
        // this.setState(messageImages);
        setMessageImages(messageImages_arr)
    }
    const handleImageChange =(e)=>
    {
        let file = e.target.files[0];
         if(file)
         
         {
            setMessageImages([...messageImages,file])
         }
        
    }
    const  renderimages=(item,index)=>
    {
        let url="";
        console.log(item, " pancham")
       if(item.imageLink)
       {
        url = serverBaseUrl+item.imageLink;
       }else{
        url = URL.createObjectURL(item)
       }
     
          return (
              <div style={{margin:5,}}>
                  <button onClick={()=>removeImage(item,index)} style={{ position:"absolute",right:0,top:0,zIndex:1000,backgroundColor:"#ffffff00",border:'none'}}>
                      <div >
                        <i class='bx bx-x' style={{fontSize:22}}></i>
                      </div>
                  </button> 
                  <img src={url} style={{  height:70,width: 70,borderRadius: 10}}/>
              </div>
          )
       
    }
    return (
        <>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Student</div>
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
                                    <th align="center">Message</th>  
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
                                        {studentMessagesData && studentMessagesData.map((row, i) => (
                                            <SingleMessageRow 
                                                row={row} 
                                                index={i} 
                                                deleteAtIndex={deleteAtIndex} 
                                                setReplyModalVisible={(status,messageObj,index)=>{setIndex(index);setReplyModalVisible(status);setReplyMessageObj(messageObj);setReply(messageObj.reply);setMessageImages(messageObj.images.filter((image)=>image.replyImage))}}
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
                        <h5 className="modal-title">Student Message Reply</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody> 
                        <div class="card-body p-md-1"> 
                            <div class="form-group">
                                <label>Student Message</label>
                                <textarea  readOnly value={replyMessageobj.message} class="form-control" required placeholder="Student Message"  ></textarea>
                            </div>
                            <div class="row">
                                {replyMessageobj.images?.filter((image)=>!image.replyImage).map(image=>(
                                    <div className="col-3">
                                        <a href={serverBaseUrl+image.imageLink} target="_blank">
                                            <img src={serverBaseUrl+image.imageLink} className="w-100"/>
                                        </a>
                                    </div>
                                ))}

                            </div>
                            <div class="form-group">
                                <label>Your Reply</label>
                                <div className="row col-1 mb-1">
                                    <a href="javascript:; " onClick={()=>{inputFile.current.click()}}>
                                        <span class="input-group-text" style={{padding:0,paddingTop:1,paddingBottom:1,paddingLeft:10,paddingRight:10}}>
                    
                                                <i class='bx bx-file' style={{fontSize:22}}></i>
                                        
                                            
                                        </span>
                                    </a>
                                </div>
                                <div>
                                <div className="row">
                
                                        {messageImages.map((item,index)=>(
                                            <div className="col-3 col-md-2 col-lg-2">
                                                {renderimages(item,index)}
                                            </div>
                                        ))} 
                                    </div> 
                                    <textarea   class="form-control" value={reply||replyMessageobj.reply} required placeholder="AllCoaching Admin Reply " onChange={(e) => setReply(e.target.value)} ></textarea>

                                    <input type="file" ref={inputFile} style={{visibility: 'hidden'}} onChange={(e)=>handleImageChange(e)} />
                                </div>
                            </div>
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button  type="button"  className="btn btn-primary" onClick={()=>{

                            addReplyBtnHandler()
                        }}> 
                            {isLoading?(
                                    <ClipLoader color={"white"}   loading={isLoading}     />
                                ):("Add Reply")
                            }
                        </button>
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

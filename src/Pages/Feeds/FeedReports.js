import React, { useState, useEffect } from 'react'
import { dataLimit, theme } from '../../index'
import { fetch_studentList, findStudentByName, findStudentByEmail } from '../../api/student'
import ClipLoader from "react-spinners/ClipLoader";
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal'
import { Image, Shimmer } from 'react-shimmer' 
import { useParams } from 'react-router';
 

import Snackbar from '@material-ui/core/Snackbar';
import { fetch_report } from '../../api/feedReport';
import SingleFeedReport from './SingleFeedReport';


export default function FeedReports({}) {

    const [reportsData, setReportsData] = useState([]);
    
    const [offset, setOffset] = useState(0);
    const [showNextButton, setShowNextButton] = useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    const {type} = useParams()  
    const [isLoading, setLoading] = useState(false)
  

    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    const fetchReportCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => { 
                setReportsData(data)
                console.log(data)
                setShowShimmer(false)
            })
        }
    }

    useEffect(() => {
        
        fetch_report(offset, dataLimit, fetchReportCallback)
    }, [offset,type])

    const deleteAtIndex = (index) => {
        let studentData_local = [...reportsData]
        studentData_local.splice(index, 1);
        setReportsData(studentData_local)
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
                <div class="breadcrumb-title pr-3">Feed Reports</div>
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
                                    <th align="center">Text</th>
                                    <th align="center">Description</th>
                                    <th align="center">Report Date</th>  
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
                                        {reportsData && reportsData.map((row, i) => (
                                            <SingleFeedReport 
                                                row={row} 
                                                index={i} 
                                                deleteAtIndex={deleteAtIndex} 
                                                 
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

 

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />

        </>
    )
}

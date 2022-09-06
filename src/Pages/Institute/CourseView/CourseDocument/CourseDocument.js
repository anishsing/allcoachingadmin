import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { dataLimit } from '../../../..';
import { deleteDocument, fetch_courses_documents } from '../../../../api/courses';
import CourseDocumentRow from './CourseDocumentRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';

function CourseDocument(props) {
    const { activeCourse } = props
    const [courseDocuments, setCourseDocuments] = useState([])
    const [courseDocumentLoaded, setCourseDocumentLoaded] = useState(false);
    const [isCourseDocumentLoading, setIsCourseDocumentLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [showPreviousButton, setShowPreviousButton] = useState()
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)


    useEffect(() => {
        fetch_courses_documents(activeCourse, offset, dataLimit, courseDocumentCallback);
    }, [activeCourse])

    useEffect(() => {
        fetch_courses_documents(activeCourse, offset, dataLimit, courseDocumentCallback);
    }, [offset])

    const courseDocumentCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setCourseDocuments(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    console.log("else")
                    console.log(data.length)
                    if(data.length==0) 
                    {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if(data.length!=0)
                    {     
                        setCourseDocuments(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setCourseDocuments(data)
                setCourseDocumentLoaded(true)
                setIsCourseDocumentLoading(false)
            })
        }
    }

    const deleteCourseDocument = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteDocument(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        if (response.status == 200) {
            const arr = [...courseDocuments]
            arr.splice(index, 1)
            setCourseDocuments(arr)
            setSnackBarMessage("Document Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
    }

    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")
        }

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

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <div className="mt-3">
            <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Title</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showShimmer ? (
                            <td colspan="3">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>
                                {courseDocuments.map((row, i) => (
                                    <CourseDocumentRow row={row} index={i} delDocument={deleteCourseDocument} />
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                {offset > 0 && showPreviousButton ? (

                    <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                ) : (null)}
                {!allDataLoaded && showNextButton ? (
                    <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                ) : (null)}

            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}

export default CourseDocument

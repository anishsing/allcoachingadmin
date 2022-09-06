import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { dataLimit } from '../../../..';
import { deleteVideo, fetch_courses_videos } from '../../../../api/courses';
import CourseVideoRow from './CourseVideoRow'
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';


function CourseVideo(props) {
    const { activeCourse } = props;
    const [videos, setVideos] = useState([])
    const [courseVideoLoaded, setCourseVideoLoaded] = useState(false);
    const [isCourseVideoLoading, setIsCourseVideoLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    useEffect(() => {
        fetch_courses_videos(activeCourse, offset, dataLimit, courseVideoCallback);
    }, [activeCourse])

    useEffect(() => {
        fetch_courses_videos(activeCourse, offset, dataLimit, courseVideoCallback);
    }, [offset])

    const courseVideoCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setVideos(data)
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
                        setVideos(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setVideos(data)
                setCourseVideoLoaded(true)
                setIsCourseVideoLoading(false)
                setShowShimmer(false)
            })
        }
    }

    const deleteCourseVideo = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteVideo(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        if (response.status == 200) {
            const arr = [...videos]
            arr.splice(index, 1)
            setVideos(arr)
            setSnackBarMessage("Course Video Deleted Successfully")
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
                            <th align="center">Description</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {showShimmer ? (
                            <td colspan="4">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>

                                {videos.map((row, i) => (
                                    <CourseVideoRow row={row} index={i} delVideo={deleteCourseVideo} />
                                ))}
                            </>

                        )}

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                {offset > 0 ? (

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

export default CourseVideo

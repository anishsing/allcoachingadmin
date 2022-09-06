import React, { useState, useEffect } from 'react'
import { dataLimit } from '../../../..';
import { deleteSubject, deleteSubjectItem, fetch_courses_timetable } from '../../../../api/timetable';
import CourseTimeTableRow from './CourseTimeTableRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';

function CourseTimeTable(props) {


    const { activeCourse } = props;
    const [timeTable, setTimeTable] = useState([])
    const [courseTimeTableListLoaded, setCourseTimeTableListLoaded] = useState(false);
    const [isCourseTimeTableListLoading, setIsCourseTimeTableListLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    useEffect(() => {
        fetch_courses_timetable(activeCourse, offset, dataLimit, courseTimeTableCallback)
    }, [activeCourse])
    useEffect(() => {
        fetch_courses_timetable(activeCourse, offset, dataLimit, courseTimeTableCallback)
    }, [offset])

    const courseTimeTableCallback = (response) => {
        console.log(response.status)
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setTimeTable(data)
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
                        setTimeTable(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }

                setTimeTable(data)
                setIsCourseTimeTableListLoading(false)
                setCourseTimeTableListLoaded(true)
                setShowShimmer(false)

            })
        }
    }

    const deleteCourseTimeTableSubject = (id, index, parentIndex, type) => {
        if (window.confirm("Are you sure you want to delete?")) {
            if (type == "item") {
                deleteSubjectItem(id, (response) => deleteItemCallBack(response, index, parentIndex))
            }
            else {
                deleteSubject(id, (response) => deleteSubjectCallBack(response, index))
            }
        }
    }

    const deleteItemCallBack = (response, index, parentIndex) => {
        if (response.status == 200) {
            const arr = timeTable
            delete arr[parentIndex].courseTimeTableItem[index];
            setTimeTable(arr)
            setSnackBarMessage("Time Table Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete", response.status);
        }
    }

    const deleteSubjectCallBack = (response, index) => {
        if (response.status == 200) {
            const arr = timeTable.slice()
            delete arr[index];
            setTimeTable(arr)
            setSnackBarMessage("Time table deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete", response.status);
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
            {timeTable.map((item, index) => (
                <div id="accordion1" class="accordion">
                    <div className="card-header collapsed" data-toggle="collapse" href={"#collapse" + index}>
                        <a className="card-title">
                            {item.name}
                        </a>
                    </div>
                    <div id={"collapse" + index} className="card-body collapse" data-parent="#accordion1">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered mb-0" id="table1">
                                <thead className="thead-dark">
                                    <tr>
                                        <th align="center">#</th>
                                        <th align="center">Title</th>
                                        <th align="center">Sub Title</th>
                                        <th align="center">Date</th>
                                        <th align="center">Time</th>
                                        <th align="center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showShimmer ? (
                                        <td colspan="6">
                                            <Shimmer width={'100%'} height={40} />
                                        </td>
                                    ) : (
                                        <>
                                            {item.courseTimeTableItem.map((row, i) => (
                                                <CourseTimeTableRow delSubject={deleteCourseTimeTableSubject} row={row} index={i} parentIndex={index} />
                                            ))}
                                        </>
                                    )}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            ))}
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

export default CourseTimeTable

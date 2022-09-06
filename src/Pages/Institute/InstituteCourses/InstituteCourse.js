import React from 'react'
import { useState ,useEffect} from 'react'
import { deleteCourse, fetch_institute_courses } from '../../../api/courses'
import CourseRow from './CourseRow'
import {Image,  Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
 
function InstitueCourse(props) {

    const {insId}=props
    const [courses,setCourses] = useState([])
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    useEffect(() =>{
        fetch_institute_courses(insId, false,coursesCallBack)
    },[insId])

   const coursesCallBack=(response)=>   {
        if(response.status==200)
        {
            response.json().then((data)=>
            {
                if(data.length>0)
                {
                    console.log("courses data")
                    console.log(data)
                   setCourses(data)
                   setShowShimmer(false)
                } else {
                    setShowShimmer(false)
                }
                
            })
        }
    }

    const delCourse=(id,index)=>{

        if(window.confirm("Are you sure you want to delete?"))
        {
        
            deleteCourse(id, (response)=>deleteCourseCallBack(response, index))
        }
    }

    const deleteCourseCallBack=(response,index)=>{
        if(response.status==200)
        {
            let arr =  [...courses]
             arr.splice(index, 1)
            setCourses(arr)
            setSnackBarMessage("Course Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
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
                            <th align="center">Fees</th>
                            <th align="center">Leads</th>
                            <th align="center">Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {showShimmer?(
                                <td colspan="6">
                                  <Shimmer width={'100%'} height={40} /> 
                                </td>
                            ):(
                            <>
                            {courses.map((row, i) => (
                                    <CourseRow row={row} index={i} delCourse={delCourse}/>
                                ))}
                            </>
                            )}

                    </tbody>
                </table>
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

export default InstitueCourse

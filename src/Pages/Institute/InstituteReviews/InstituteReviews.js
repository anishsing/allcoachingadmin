import React, { useState, useEffect } from 'react'
import { dataLimit } from '../../..';
import { fetch_institute_reviews, updateReview } from '../../../api/review';
import ReviewRow from './ReviewRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';

function InstituteReviews(props) {

    const { insId } = props;
    const [offset, setOffset] = useState(0)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [reviewLoading, setReviewLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    useEffect(() => {
        fetch_institute_reviews(insId, offset, dataLimit, reviewsCallBack)
    }, [insId])

    useEffect(() => {
        fetch_institute_reviews(insId, offset, dataLimit, reviewsCallBack)
    }, [offset])



    const reviewsCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setReviews(data)
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
                        setReviews(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setReviews(data)
                console.log(data)
                setReviewLoading(false)
                setShowShimmer(false)
            })
        }
    }



    const delReview = (id, index) => {
        console.log(id)
        updateReview(id, '', 0, (response) => deleteCallBack(response, index))
    }

    const deleteCallBack = (response, index) => {
        if (response.status == 200) {
            let arr = [...reviews]
            arr.splice(index, 1)
            setReviews(arr)
            setSnackBarMessage("Review Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("error", response.status)
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
                            <th align="center">Student</th>
                            <th align="center">Rating</th>
                            <th align="center">Review</th>
                            <th align="center">Reply</th>
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
                                {reviews.map((row, i) => (
                                    <ReviewRow row={row} index={i} delReview={delReview} />
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

export default InstituteReviews

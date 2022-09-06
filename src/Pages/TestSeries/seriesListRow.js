import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudentCount, updateTestSeriesStatus } from "../../api/testseries";

import Snackbar from '@material-ui/core/Snackbar';
const SeriesListRow = props => {

    const {row, index,deleteCat,catId,setPublishModal,setSeriesDetails} = props
    const [hiddenStatus,setHiddenStatus] = useState(row.hidden);
    const [seriesId,setSeriesId] = useState(row.id);
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [ attemptCount,setAttempCount] = useState(0)
    const updateStatusCallBack = (response, status) => {
        if (response.status == 200) {
            setHiddenStatus(status)
        }
        else {
            console.log(response.status)
        }
    }

    useEffect(() =>{

        
        if(row.id)
        {
            getStudentCount(row.id,response=>{
                if(response.status==200)
                {
                    response.json().then(data=>{
                        setAttempCount(data);
                    })
                }
            })
        }
    },[row])
    const closeSnack = () => {
        setIsSnackBarShow(false)
    }
    const publishBtnHandler = ()=>
    {
        if(row.questionCount<=0)
        {
            setIsSnackBarShow(true)
            setSnackBarMessage("Please Add Questions To publish Test")
        }else
        {
            setPublishModal(true);
            setSeriesDetails(row,publishModelCallBack,index)
        }
            
    }
    const publishModelCallBack=()=>
    {
        setHiddenStatus(false)
    }

    return (
        <>
        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">{row.title}</td>
            <td align="center">{row.timeDuration}</td>
            <td align="center">{row.maxMarks}</td>
            <td align="center">{row.questionCount}</td>
            <td align="center">{attemptCount}</td>
            <td>
                <button type="button" class="btn btn-danger mr-1 px-2" onClick={() => deleteCat(row.id, index)}>
                    Delete
                </button>
                <Link to={"/addTestSeries/" + catId + "/edit/" + row.id + "/" + row.title+"/name"}>
                    <button type="button" class="btn btn-primary mr-1 px-2">
                        Edit Questions
                    </button>
                </Link>
                {hiddenStatus ? (
                    // <button aria-label="delete" onClick={() => updateTestSeriesStatus(false, seriesId, (response) => updateStatusCallBack(response, false))} className="btn btn-warning mr-1">
                    //     PUBLISH
                    // </button>
                    <button aria-label="delete" onClick={() => publishBtnHandler()} className="btn btn-warning mr-1">
                        PUBLISH
                    </button>
                ) : (
                    <button aria-label="delete" onClick={() => updateTestSeriesStatus(true, seriesId, (response) => updateStatusCallBack(response, true))} className="btn btn-warning mr-1">
                        HIDE
                    </button>
                )}
            </td>
        </tr>
            <Snackbar
            open={isSnackBarShow}
            onClose={(e) => closeSnack(e)}
            TransitionComponent="TransitionUp"
            message={SnackBarMessage}
            />
        </>
    )
}

export default SeriesListRow
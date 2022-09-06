import React, { useState, useEffect } from 'react';
import { boostInstitute } from '../../api/institute'
import { dataLimit, theme } from '../../index'
import { fetch_instituteList, deleteInstitute, updateStatus } from '../../api/institute'
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
const RenderSingleInstitute = props => {

    
    const [status, setStatus] = useState(props.row.status);
    const { index, isDeletingLoading,deleteCallback } = props;
    const { state, city, phone, email, directorName, name, id } = props.row
    const [boostValue, setBoostValue] = useState(props.row.boostValue)
    const [isLoading,setIsLoading] = useState(false)
    const [isStatusLoading,setIsStatusLoading] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    useEffect(() => {

        setStatus(props.row.status)
        setBoostValue(props.row.boostValue)
    },[props.row])
    const updateCallback = (response, status) => {
        if (response.status == 200) {
            console.log("done")
            setStatus(status)
            props.update(index, status)
            setIsStatusLoading(false)
            setIsLoading(false)
        }
    }
    const deleteInsCallBack=(response)=>
    {
        if(response.status==200)
        {
            deleteCallback(index)
            setIsLoading(false)
            setSnackBarMessage("Instituted Deleted Successfully")
            setIsSnackBarShow(true)
        }else
        {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
    }
    const deleteIns = (status) => {
        if (window.confirm('Are you sure you want to delete?')) {
            updateStatus(id, status, updateCallback)
            setIsLoading(true)
        }
    }
    
    const deleteInsPermanently = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            deleteInstitute(id,  index,deleteInsCallBack)
            setIsLoading(true)
        }
    }

    const changeStatus = (status) => {
        if (window.confirm('Are you sure you want to change the status?')) {
            updateStatus(id, status, updateCallback)
            setIsStatusLoading(true)
        }
    }

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    return (
        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">
                {status == 5 ? (
                    isLoading ? (
                        <>
                                <button type="button" class="btn btn-primary px-5">
                                    <ClipLoader color={"white"} size={18} />
                                </button>
                        </>
                        ) : (
                            <>
                                <button type="button" class="btn btn-warning m-1 px-2" onClick={() => deleteIns(1)}>
                                    Restore
                                </button>
                                {isLoading ? (
                                    <button type="button" class="btn btn-danger m-1 px-2">
                                        <ClipLoader color={"white"} size={18} />
                                    </button>
                                    ) : (
                                    <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteInsPermanently()}>
                                        Delete
                                    </button>
                                    )}
                            </>
                        )
                ) : (
                    isLoading ? (
                        <button type="button" class="btn btn-primary px-5">
                            <ClipLoader color={"white"} size={18} />
                        </button>
                    ) : (
                        <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteIns(5)}>
                            Delete
                        </button>
                    )

                )}

                <Link to={"/insview/" + props.row.id+"/id"} class="btn btn-primary m-1 px-2">
                    View
                </Link>
                <button type="button" class="btn btn-dark m-1 px-2" onClick={() => { props.setIsBoostModalVisible(true); props.setBoostValue(boostValue); props.setBoostInsId(id) }}>
                    Boost
                </button>
                {status == 0 ? (
                    isStatusLoading ? (
                        <button type="button" class="btn btn-primary px-5">
                            <ClipLoader color={"white"} size={18} />
                        </button>
                    ) : (
                    <button type="button" class="btn btn-success m-1 px-2" onClick={() => changeStatus(1)}>
                        Approve
                    </button>
                    )
                ) : (
                    status == 1 ? (
                        isStatusLoading ? (
                        <button type="button" class="btn btn-primary px-5">
                            <ClipLoader color={"white"} size={18} />
                        </button>
                    ) : (
                        <button type="button" class="btn btn-success m-1 px-2" onClick={() => changeStatus(2)}>
                            Block
                        </button>)
                    ) : (
                        status == 2 ? (
                            isStatusLoading ? (
                        <button type="button" class="btn btn-primary px-5">
                            <ClipLoader color={"white"} size={18} />
                        </button>
                    ) : (
                            <button type="button" class="btn btn-info m-1 px-2" onClick={() => changeStatus(1)}>
                                Unblock
                            </button>)
                        ) : (null)
                    )
                )

                }
            </td>
            <td align="center">{name}</td>
            <td align="center">{directorName}</td>
            <td align="center">{email}</td>
            <td align="center">{phone}</td>
            <td align="center">{city}</td>
            <td align="center">{state}</td>
            <td align="center" id={"boost" + props.row.id}>{boostValue}</td>
          
            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </tr>
    )
}
export default RenderSingleInstitute
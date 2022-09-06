import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
import { deleteCategory } from '../../api/testseries';
const TestSeriesCategoryRow = props => {
    const {row,index,setIndex, setCatSortOrder, deleteTestSeriesCategory, setCatName, setEditId, setEditIndex, setEditMode, setIsAddEditModalVisible} = props
    const [isLoading, setIsLoading] = useState(false)
    const deleteRef = useRef(false)

    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)

    const deleteCallBack = (response) => {
        if (response.status == 200) {
            deleteTestSeriesCategory()
            setIsLoading(false)
            setIsSnackBarShow(true)
            setSnackBarMessage("Test Series Category Has been DELETED!")
        }
        else {
            console.log("unable to delete");
            setIsSnackBarShow(true)
            setSnackBarMessage("Something went wrong")
        }
    }
   

    const deleteCat = (id, i) => {
        if (window.confirm("Are you sure you want to delete?")) { 
            setIndex(i)
            setIsLoading(true)
            deleteCategory(id, deleteCallBack)
            deleteRef.current = id;
        }
    }
    

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    return (

        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">{row.categoryName}</td>
            <td align="center">{row.sortOrder}</td>
            <td>
                {isLoading ?(
                    <button type="button" class="btn btn-primary px-5">
                        <ClipLoader color={"white"} size={18} />
                    </button>):(
                <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteCat(row.categoryId, index)}>
                    Delete
                </button>)}
                <button type="button" class="btn btn-success m-1 px-2"
                    onClick={() => {
                        setIsAddEditModalVisible(true);
                        setEditMode(true);
                        setEditIndex(index);
                        setEditId(row.categoryId)
                        setCatName(row.categoryName);
                        setCatSortOrder(row.sortOrder)
                    }}>
                    Edit
                </button>
                <Link to={"/testSeriesSubCategory/" + row.categoryId + "/" + row.categoryName+"/name"}>
                    <button type="button" class="btn btn-primary m-0 px-2">
                        View Sub Categories
                    </button>
                </Link>
            </td>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </tr>
    )
}

export default TestSeriesCategoryRow
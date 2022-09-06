import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
import { serverBaseUrl } from '../..';
import { deleteSubCategory } from '../../api/testseries';



const TestSeriesSubCategoryRow = props => {

    const { row, index, setIsAddEditModalVisible, setEditMode, setEditIndex, setEditId,
        setCatName,
        setCatSortOrder,
        setPreviewBaseUrl,
        setImagePreview, deleteTestSeriesSubCategory, setIndex } = props
    const deleteRef = useRef(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const deleteSubCatCallBack = (response) => {
        console.log(response)
        if (response.status == 200) {
            deleteTestSeriesSubCategory()
            setIsLoading(false)
            setIsSnackBarShow(true)
            setSnackBarMessage("Test Series Sub Category Has been DELETED!")
        }
        else {
            console.log("unable to delete");
            setIsSnackBarShow(true)
            setSnackBarMessage("Something went wrong")
        }
    }

    useEffect(() => {
        if (deleteRef.current) {
            deleteSubCategory(deleteRef.current, deleteSubCatCallBack)
            deleteRef.current = false;
        }
    }, [deleteRef.current])

    const deleteCat = (id, i) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setIndex(i)
            setIsLoading(true)
            deleteRef.current = id;
        }
    }

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }
    return (


        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">{row.name}</td>
            <td align="center"><img src={serverBaseUrl + row.image} width="200" height="100" alt="" /></td>
            <td align="center">{row.sortOrder}</td>
            <td>
                {isLoading ? (
                    <button type="button" class="btn btn-primary px-5">
                        <ClipLoader color={"white"} size={18} />
                    </button>) : (
                    <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteCat(row.id, index)}>
                        Delete
                    </button>)}
                <button type="button" class="btn btn-success m-1 px-2"
                    onClick={() => {
                        setIsAddEditModalVisible(true);
                        setEditMode(true);
                        setEditIndex(index);
                        setEditId(row.id)
                        setCatName(row.name);
                        setCatSortOrder(row.sortOrder)
                        setPreviewBaseUrl(row.image)
                        setImagePreview(serverBaseUrl + "" + row.image)
                    }}>
                    Edit
                </button>
                <Link to={"/categoryContent/" + row.id + "/" + row.name}>
                    <button type="button" class="btn btn-primary m-0 px-2">
                        Open Exam
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

export default TestSeriesSubCategoryRow
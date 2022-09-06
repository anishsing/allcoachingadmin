import Snackbar from '@material-ui/core/Snackbar';
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { serverBaseUrl } from "../..";
import { deleteHomeBanners } from '../../api/banners';

const BannerRow = props => {

    const {row, index,changeButtonAction,editButtonAction,deleteBannerCallBack} = props

    const [isLoading, setIsLoading] = useState(false)
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [message, changeMessage] = useState("")


    const deleteRow = (id) => {
        if ((window.confirm("Are You Sure You Want To Delete?"))) {
            deleteHomeBanners(id, deleteCallBack)
            setIsLoading(true)
        }
        else {
            console.log("Dont't delete");
        }
    }

    const deleteCallBack = (response) => {
        
        if (response.status == 200) {
            deleteBannerCallBack()
            setIsLoading(false)
            setIsSnackBarShow(true)
            changeMessage('Banner Deleted successfully!!')
            setSnackBarMessage("Banner Has been DELETED!")
            // this.setState({banners: arr,message: 'Banner Deleted successfully!!'},()=>this.show())
        }
        else {
            console.log("unable to delete");
            setSnackBarMessage("Oops! Something went wrong while deleting.")
        }
    }

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    return (

        <tr key={row.link}>
            <td>
                {index + 1}
            </td>
            <td component="th" scope="row" id={"link" + row.id}>
                {row.bannerLink}
            </td>

            <td align="center" id={"image" + row.id}>
                <img src={row.bannerImageLink.includes("http://")?row.bannerImageLink:serverBaseUrl + row.bannerImageLink} alt="no banner found" height="50" width="100" />
            </td>

            <td align="center">
                {isLoading ? (
                    <button type="button" class="btn btn-primary px-5">
                        <ClipLoader color={"white"} size={18} />
                    </button>) : (
                    <button className="btn btn-danger m-1" onClick={(e) => deleteRow(row.id)}>
                        DELETE
                    </button>)}
                <button className="btn btn-success m-1" onClick={() => editButtonAction(row.id, row.bannerLink)} data-toggle="modal" data-target={"#editModal" + row.id}>
                    EDIT
                </button>
                <button className="btn btn-info m-1" onClick={() => changeButtonAction(row.id, row.bannerImageLink)} data-toggle="modal" data-target={"#editImageModal" + row.id}>
                    CHANGE BANNER IMAGE
                </button>
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


export default BannerRow
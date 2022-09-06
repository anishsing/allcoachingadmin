import React, { useState, useEffect } from 'react'
import {deleteCategory, editCategory} from '../../api/institute'
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
import { dataLimit, theme } from "../.."
export default function RenderSingleInstituteCat(props) {

    
    const[icon, setIcon] = useState("")
    const [Categoryname, setCategoryname] = useState(props.row.name)
    const [sortOrder, setSortOrder] = useState(props.row.sortOrder)
    const [name, setName] = useState(props.row.name)
    const [order, setOrder] = useState(props.row.sortOrder)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [loading, setLoading]=useState(false)
    const [delLoading, setDelLoading]=useState(false)



    const deleteCategoryCallback=(response,index) =>{
        setDelLoading(false)
        if(response.status==200){
            console.log('category has been deleted')
            props.deleteAtIndex(index)
            setSnackBarMessage("Category Deleted Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('Ooops! Something went wrong while deleting!')
        }
    }


    const action4DeleteCategory=(id, label, index)=>{
        
        if(window.confirm('Deleting?  '+ label)){
            setDelLoading(true)
            deleteCategory(id, (response)=>deleteCategoryCallback(response,index))
            
        } else{
            console.log('cancel mission del')
        }

    }


    const editCallback=(response, id)=>{
        setLoading(false)
        console.log(response.status)
        if(response.status==201){
            document.getElementById("modal4editCategoryCloseBtn"+id).click()
            setName(Categoryname)
            setOrder(sortOrder)           
            setSnackBarMessage("Category Details Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }


    const actionEdit4Category=(id,)=>{
        if(window.confirm('Are you sure to Save Changes')){
           setLoading(true)
            editCategory(id, icon, Categoryname, sortOrder, (response)=>editCallback(response,id))
            
        } else{
            console.log('cancel mission del')
        }
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }


    return (
        <>
        <tr>
            <td align="center">{props.index+1}</td>
            <td align="center">{name}</td>
            <td align="center">{order}</td>
            <td align="center">
                <button className="btn btn-danger m-1" onClick={()=> action4DeleteCategory(props.row.id, props.row.name, props.index)}>
                    {delLoading?(
                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                    ):('Delete')}
                </button>
                <button className="btn btn-info m-1"  data-toggle="modal" data-target={"#exampleModalCentered"+props.index}> Edit </button>
            </td>
        </tr>



        {/* Modal 4 Edit category */}
        <div class="modal fade" id={"exampleModalCentered"+props.index} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="exampleModalCenteredLabel">Edit Category</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                        
                        <input type="text" class="form-control mt-3" onChange={e => setCategoryname(e.target.value)} defaultValue={props.row.name} />

                        <input type="text" class="form-control mt-3" onChange={e => setSortOrder(e.target.value)} defaultValue={props.row.sortOrder} />

                        
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id={"modal4editCategoryCloseBtn"+props.row.id}>Close</button>
                    <button type="button" class="btn btn-primary" onClick={()=> actionEdit4Category(props.row.id)}>
                        {loading?(
                            <ClipLoader color={theme.primaryColor}   loading={loading}     />
                        ):('Save Changes')}
                    </button>
                </div>
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
            </div>
        </>
    )
}

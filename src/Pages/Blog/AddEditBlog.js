import React, { useState,useEffect, useRef } from 'react'; 
import {addBlog, fetch_blog_by_id,editBlogWithoutImage, editBlog} from '../../api/blog'

import Snackbar from '@material-ui/core/Snackbar';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import { serverApiUrl, serverBaseUrl, theme } from '../..';
import ClipLoader from "react-spinners/ClipLoader";
const AddEditBlog = props => {
    const  {blogId} = props.match.params
    const [blogData,setBlogData] = useState(null);
    const [blogTitle,setBlogTitle] = useState(null)
    const [featureImageFile,setFeatureImageFile] = useState(null)
    const [imagePreview,setImagePreview]= useState(null)
    const [blogContent,setBlogContent] = useState(null)
    const [editMode,setEditMode] = useState(false)
    const [blogImageEndPoint,setBlogImageEndPoint] = useState(null)
    const [loadingBlogDetails,setLoadingBlogDetails] = useState(false)
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const [loading, setLoading]=useState(false)
    let  featureImageChooserRef = useRef(null)


    useEffect(() =>{
        if(blogId==-1)
        {
            setEditMode(false)
             console.log('add mode')
        }else
        {
            setEditMode(true)
            setLoadingBlogDetails(true)
            fetch_blog_by_id(blogId,(response)=>
            {
                if(response.status==200)
                {
                    setLoadingBlogDetails(false)
                    response.json().then(data=>{ 
                        setBlogTitle(data.title)
                        setBlogContent(data.blogBody)
                        setImagePreview(serverBaseUrl+""+data.blogFeatureImage)
                        setBlogImageEndPoint(data.blogFeatureImage)

                    })
                }
            })   
        }
    },[blogId])
    const refchooseImageClickHandler=()=>
    {
        if(featureImageChooserRef)
        {
            // console.log(featureImageChooserRef)
            featureImageChooserRef.click()
        }
        
    }
    const fileChangeHandler=(event)=>
    {   
        var url = URL.createObjectURL(event.target.files[0]);
        setImagePreview(url)
        setFeatureImageFile(event.target.files[0])

    }
    const blogSubmitHandler=(event)=>
    {
        console.log(event)
        setLoading(true)
       
            event.preventDefault(); 
        
        
        switch(editMode)
        {
            case true:
                if(featureImageFile)
                {
                   
                    editBlog(blogTitle, blogContent,featureImageFile,blogId,blogSubmitHandlerCallback)
                }else
                {
                    editBlogWithoutImage(blogImageEndPoint,blogTitle,blogContent,blogId,blogSubmitHandlerCallback)
                }
                break;
            case false:
                if(verifyBlogDetails())
                {
                    addBlog(blogContent,blogTitle,featureImageFile,blogSubmitHandlerCallback)
                }else
                { 
                    setSnackBarMessage("Please Fill All the details")
                    setIsSnackBarShow(true)
                }
        }
    }
    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    const verifyBlogDetails =()=>blogContent&&blogTitle&&featureImageFile
    const blogSubmitHandlerCallback =(response)=>
    {
        setLoading(false) 
        if(response.status==201||response.status==200)
        {
            setSnackBarMessage("Blog Saved successfully")
            if(!editMode)
            {
                setBlogContent("")
                setBlogTitle("")
                setFeatureImageFile("")
                setImagePreview(null)
            }
            
        }else
        {
            setSnackBarMessage("Something went wrong")
        }
        setIsSnackBarShow(true)
    }
    return(
        <div className="container">
            <form onSubmit={blogSubmitHandler}>  
                <div className="row">
                    <div className="col-12 col-lg-12">
                        <label>Blog Title </label>
                        <input className="form-control" value={blogTitle} type="text" onChange={(e)=>setBlogTitle(e.target.value)} placeholder ="Title"/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <label>Blog Featured Image</label>
                        <input className="form-control" type="file" style={{visibility: 'hidden'}} ref={ref=>featureImageChooserRef=ref} placeholder ="Title" onChange={fileChangeHandler}/>
                        <button type="button" className="btn btn-primary" onClick={refchooseImageClickHandler}>Choose Image</button>
                    </div> 
                    <div className="col-12 col-lg-6">
                        {imagePreview?(
                            <img className="img-responsive w-50 h-100 m-2 "  src={imagePreview}/>
                        ):(null)}
                            
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-12">
                        <label>Blog Content </label>
                        <CKEditor
                            editor={ ClassicEditor }
                            config={{
                                ckfinder:
                                {
                                    uploadUrl:serverApiUrl+"files/uploadFileCkEditor"
                                },
                                fontFamily: {
                                    options: [
                                        'kruti_dev_010regular',
                                        "kruti_dev_010bold",
                                        "chanakyaregular",
                                        'Ubuntu, Arial, sans-serif',
                                        "walkman-chanakya-901bold",
                                        "GreekMathSymbols" 
                                    ]
                                },
                                
                            }}
                            data={blogContent}
                            onReady={ editor => {
                                
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setBlogContent(data)
                            } }
                            onBlur={ ( event, editor ) => { 
                            } }
                            onFocus={ ( event, editor ) => { 
                            } }
                        />
                    </div>
                </div>
                <div className="row d-none d-md-flex align-items-center mb-3 mt-3 justify-content-center">
                    <div className="col-12 col-lg-12">
                        <div class="ml-auto">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary"  >
                                    {loading?(
                                        <ClipLoader color={theme.primaryColor}   loading={loading}     />
                                    ):('Save Changes')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
                // key={this.transition ? this.transition.name : ''}
            />
        </div>

    )
};
 
export default AddEditBlog ;
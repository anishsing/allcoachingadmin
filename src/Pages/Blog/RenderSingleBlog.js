import React, { useState, useEffect } from 'react'
import {serverBaseUrl, theme} from '../../index'
import {deleteBlog} from '../../api/blog'
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
export default function RenderSingleBlog(props) {

    const [loading, setLoading]=useState(false)

    const deleteBlogCallback=(response,index)=>{
        setLoading(false)
        if(response.status==200){
            // response.json().then(data=>{
            //     console.log('data after detete blog', data)
            // })
            console.log('data has been delete for blog')
            props.deleteBlogAtIndex(index)
        }
    }


    const action4DeleteBlog=(id, title, index)=>{

        if(window.confirm('Deleting? '+ title)){
           setLoading(true)
            deleteBlog(id, (response)=>deleteBlogCallback(response,index))
            
        } else{
            console.log('cancel mission del')
        }

    }

    return (
        <>
            <tr>
                <td align="center">{props.index+1}</td>
                <td align="center">{props.row.title}</td>
                <td align="center">
                    <img src={serverBaseUrl+props.row.blogFeatureImage} className="img-fluid" width="200" alt="" />
                </td>        
                
                <td align="center">
                    <button className="btn btn-danger m-1" onClick={(e)=>action4DeleteBlog(props.row.id, props.row.title, props.index)}>
                    {loading?(
                        <ClipLoader color={theme.primaryColor}   loading={loading}     />
                    ):('Delete')}
                    </button>
                    <Link to={`/addeditblog/${props.row.id}/blogId`} className="btn btn-info">Edit</Link>
                </td>
            </tr>
        </>
    )
}

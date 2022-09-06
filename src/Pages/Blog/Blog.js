import React, { useState, useEffect } from 'react'
import { dataLimit, theme } from '../../index'
import { fetch_blogs } from '../../api/blog'
import RenderSingleBlog from './RenderSingleBlog'

import { Link } from 'react-router-dom'
import { Image, Shimmer } from 'react-shimmer'



export default function Blog() {

    const [blogData, setBlogData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showShimmer, setShowShimmer] = useState(true)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()

    const fetchBlogsCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setBlogData(data)
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
                        setBlogData(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setBlogData(data)
                console.log('getting all blos data', data)
                setShowShimmer(false)
            })
        }
    }

    const deleteBlogAtIndex = (index) => {
        let blogs = [...blogData]

        blogs.splice(index, 1);


        setBlogData(blogs)
    }
    useEffect(() => {
        fetch_blogs(offset, dataLimit, fetchBlogsCallback);
    }, [offset])

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

    return (
        <>

            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Blog</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group">
                        <Link to={"/addeditblog/-1/blogId"} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">Add </Link>
                    </div>
                </div>
            </div>


            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Title</th>
                                    <th align="center">Featured Image</th>
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

                                        {blogData && blogData.map((row, i) => (
                                            <RenderSingleBlog deleteBlogAtIndex={deleteBlogAtIndex} row={row} index={i} />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    {offset > 0 ? (

                        <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                    ) : (null)}
                    {!allDataLoaded && showNextButton ? (
                        <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                    ) : (null)}

                </div>
            </div>

        </>
    )
}

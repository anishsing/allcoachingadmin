import React, { useState, useEffect } from 'react';
import { homeBanners, deleteHomeBanners, editBanner, editBannerImage, addBanner } from '../../api/banners'
import { dataLimit, theme, serverBaseUrl } from "../../index"
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
import { Image, Shimmer } from 'react-shimmer'
import BannerRow from './BannerRow';


const Banner = props => {
    const { type } = props.match.params

    const [title, changeTitle] = useState("Home Top")
    const [banners, setBannersData] = useState([]);
    const [placeholder, changePlaceholder] = useState(type);
    const [message, changeMessage] = useState("")
    const [deleteIndex, setIndex] = useState();

    const [bannerLink, setBannerLink] = useState("")
    const [bannerImg, setBannerImg] = useState([])
    const [bannerImgPrev, setBannerImgPrev] = useState("")

    const [rowId4Edit, setRowId4Edit] = useState("")

    const [bannerImgLink, setBannerImgLink] = useState("")
    const [bannerImg4edit, setBannerImg4edit] = useState([])

    const [addResponseData, setAddResponseData] = useState([])

    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)

    useEffect(() => {
        type == "home1" ? (changeTitle("Top Home")) : (type == "home2" ? (changeTitle("Bottom Home")) : (changeTitle("Test Series")));
        changePlaceholder(type)
        homeBanners(bannnerCallBack);
    }, [props.match.params])

    const bannnerCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                let filterData = data.filter(item => item.placeHolder == type)
                setBannersData(filterData)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong")
        }
    }
    

    const deleteBannerCallBack = (deleteIndex)=>{
        const arr = [...banners]
            arr.splice(deleteIndex, 1)
            setBannersData(arr);
    }
    

    
    const clickFile = (id) => {

        document.getElementById(id).click();
    }
    function appendimage(divId, event, id) {
        var url = URL.createObjectURL(event.target.files[0]);
        document.getElementById(divId).innerHTML = `<a target="_blank" style='margin:10px' href='${url}'><img class="rounded-circle shadow" style='height:200px;' src='${url}' /></a>`
    }


    const addBannerCallBack = (response) => {
        setIsSnackBarShow(true)

        if (response.status == 201 || response.status == 200) {
            response.json().then(data => {
                
                let bannersArr = [...banners] 
                bannersArr.push(data);
                setBannersData(bannersArr)
                // setAddResponseData(data)
                setIsLoading(false)
            })

            setSnackBarMessage("Banner Has been added Successfully!")
            document.getElementById('closeButton4addbanner').click();

        }
        else {
            console.log("error", response.status)
            setSnackBarMessage("Ooop! Something went wrong while adding banner.")
            setIsLoading(false)
        }

    }


    const action4addBanner = (e) => {
        e.preventDefault()
        if (window.confirm("Are You Sure You Want To Add?")) {
            addBanner(bannerLink, placeholder, bannerImg, addBannerCallBack)
            setIsLoading(true)
        }
    }


    const addBannerHandler = (e) => {
        setBannerImg(e.target.files[0])
        setBannerImgLink(URL.createObjectURL(e.target.files[0]))
        setBannerImgPrev(URL.createObjectURL(e.target.files[0]))
    }




    // Edit banner links

    const editButtonAction = (id, name) => {
        setRowId4Edit(id)
        setBannerLink(name)
    }

    const editChanges = () => {
        if (window.confirm("Are You Sure You Want To Save Changes?")) {
            editBanner(rowId4Edit, bannerLink, placeholder, editCallBack)
            setIsLoading(true)
        }
        else {

        }
    }

    const editCallBack = (response) => {
        setIsSnackBarShow(true)

        if (response.status == 200) {
            setSnackBarMessage("Banner Link Has been Edited!")
            document.getElementById('clonebutton4editBannerLink').click();
            setIsLoading(false)
        } else {
            setSnackBarMessage("Oops! Something went wrong while editing banner")
            setIsLoading(false)
        }

    }


    const changeButtonAction = (id, img) => {
        setRowId4Edit(id)
        setBannerImgLink(img)
    }


    const editImageCallBack = (response) => {
        setIsSnackBarShow(true)
        console.log(response.status)
        if (response.status == 201) {
            console.log(response.headers.get('location'))
            document.getElementById('clonebutton4editBannerImg').click();
            setSnackBarMessage("Banner Has been Edited Successfully!")
            setIsLoading(false)
        }
        else {
            console.log(response.status)
            setSnackBarMessage("Oops! Something went wrong while editing banner.")
            setIsLoading(false)
        }
    }



    const editChanges4img = () => {
        editBannerImage(bannerImg4edit, rowId4Edit, editImageCallBack)
        setIsLoading(true)
    }


    const closeSnack = () => {
        setIsSnackBarShow(false)
    }


    const onFileChangeHandler=(e) => 
    {
        if(e.target.files)
        {
            setBannerImgLink(URL.createObjectURL(e.target.files[0]))
            setBannerImg4edit(e.target.files[0])
        }
        
    }
    return (
        <div>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">{title} Banner</div>
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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal1" onClick={() => setBannerImg("")}>Add </button>
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
                                    <th align="center">Link</th>
                                    <th align="center">Banner</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showShimmer ? (
                                    <td colspan="4">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {banners.map((row, i) => (

                                            <BannerRow deleteBannerCallBack={deleteBannerCallBack} row={row} index={i} changeButtonAction={changeButtonAction} editButtonAction={editButtonAction}  />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <form onSubmit={action4addBanner}>
                <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Banner</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* <div className="form-row align-items-center mb-3">
                                    <label className="mr-3">Add Image</label>
                                    <button className="btn btn-primary" id="addTeamImage" onClick={()=>clickFile('addImage')}><i class='lni lni-plus'></i></button>
                                    <input type="file" id="addImage" onChange={(event)=>appendimage('appendAddImage',event,'addTeamImage')} style={{display:'none'}} />
                                    <div id="appendAddImage"></div>
                                </div> */}

                                <input type="file" required className="form-control" placeholder="Select Banner Img" onChange={(e) => addBannerHandler(e)} />

                                <div className="mt-3">

                                    {bannerImgPrev != "" ? (
                                        <img src={bannerImgPrev} height="100" />
                                    ) : (null)}

                                </div>


                                <div className="form-row mt-3">
                                    <label>Banner Link</label>
                                    <input className="form-control" name="bannerLink" onChange={(e) => setBannerLink(e.target.value)} placeholder="Banner Link" />
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="closeButton4addbanner" >Close</button>
                                {isLoading ? (
                                    <button type="button" className="btn btn-primary px-4">
                                        <ClipLoader color="white" loading="PuffLoader" size={20} />
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary"  >Save changes</button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </form>


            {/* Banner for Edit Banner Link */}
            <div className="modal fade" id={"editModal" + rowId4Edit} tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Banner</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"> 
                            <div className="form-row">
                                <label>Banner Link</label>
                                <input className="form-control" name="bannerLink" value={bannerLink} onChange={(e) => setBannerLink(e.target.value)} placeholder="Banner Link" />
                            </div> 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="clonebutton4editBannerLink">Close</button>

                            {isLoading ? (
                                <button type="button" className="btn btn-primary px-4">
                                    <ClipLoader color="white" loading="PuffLoader" size={20} />
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={() => editChanges()}>Save changes</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner for Edit Banner Image */}
            <div className="modal fade" id={"editImageModal" + rowId4Edit} tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Banner</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <div className="form-row">
                                <label>Banner Image</label>
                                <input type="file" className="form-control" name="bannerLink" onChange={(e) => onFileChangeHandler(e)} />
                            </div>

                            <div className="mt-2">
                                {/* {bannerImgLink !="" ? (
                                    <img src={URL.createObjectURL(bannerImg4edit)} height="100" />
                                ):(
                                    <img src={serverBaseUrl+bannerImgLink} height="100" />
                                )} */}

                                {/* {bannerImg4edit !=""?(
                                    <img src={URL.createObjectURL(bannerImg4edit)} height="100" />
                                ):(null)} */}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="clonebutton4editBannerImg">Close</button>

                            {isLoading ? (
                                <button type="button" className="btn btn-primary px-4">
                                    <ClipLoader color="white" loading="PuffLoader" size={20} />
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={() => editChanges4img()}>Save changes</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />


        </div>

    )
}
export default Banner
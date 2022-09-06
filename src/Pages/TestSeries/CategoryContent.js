import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverBaseUrl } from '../../index'
import { fetchTestSeriesBySubCategory, editTestSeriesContent, addTestSeriesContent, deleteSubCategoryContent } from '../../api/testseries'
import { Link, useHistory } from "react-router-dom"
import { Image, Shimmer } from 'react-shimmer'
import { insertImage } from '../../api/blog';
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';
const CategoryContent = props => {
    const subCategoryId = props.match.params.id
    const [offset, setOffset] = useState(0);
    const [index, setIndex] = useState("");
    const [subCategoryContent, setSubCategoryContent] = useState([]);
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [catName, setCatName] = useState(null);
    const [catSortOrder, setCatSortOrder] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [previewBaseUrl, setPreviewBaseUrl] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editIndex, setEditIndex] = useState(null)
    const deleteRef = useRef(false)
    let fileRef = useRef(null);
    const history = useHistory();
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    const catContentCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setSubCategoryContent(data)
                    setShowNextButton(true)
                }
                else if (data.length < dataLimit) {
                    console.log("else")
                    console.log(data.length)
                    if (data.length == 0) {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if (data.length != 0) {
                        setSubCategoryContent(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                console.log(data)
                setSubCategoryContent(data)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong", response.status)
        }
    }

    useEffect(() => {
        fetchTestSeriesBySubCategory(props.match.params.id, offset, dataLimit, catContentCallback)
    }, [props.match.params.id])
    useEffect(() => {
        fetchTestSeriesBySubCategory(props.match.params.id, offset, dataLimit, catContentCallback)
    }, [offset])

    const deleteCatContentCallBack = (response) => {
        if (response.status == 200) {
            console.log("here", index)
            const arr = subCategoryContent.slice()
            delete arr[index];
            setSubCategoryContent(arr)
            setSnackBarMessage("Content Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
    }

    useEffect(() => {
        if (deleteRef.current) {
            deleteSubCategoryContent(deleteRef.current, deleteCatContentCallBack)
            deleteRef.current = false;
        }
    }, [deleteRef.current])

    const deleteCat = (id, i) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setIndex(i)
            deleteRef.current = id;
        }
    }
    const editCatValues = (image) => {
        editTestSeriesContent(editId, image, catName, catSortOrder, subCategoryId, (response) => {
            console.log(response.status)
            if (response.status == 200) {
                response.json().then(data => {

                    let categories = [...subCategoryContent];
                    categories.splice(editIndex, 1, data)
                    console.log(data)
                    setIsAddEditModalVisible(false)
                    setSubCategoryContent(categories)

                })
            }
        })
    }
    const onSubmitHandler = (e) => {
        if(!isLoading){
            setIsLoading(true)
            e.preventDefault();
            console.log(editMode, editId)
            if (editMode && editId) {
                if (imageFile) {
                    insertImage(imageFile, (response) => {
                        console.log(response);
                        if (response.status == 201) {
                            console.log(response.headers)
                            let image = response.headers.get('location');
                            editCatValues(image)
                        }
                    })
                } else {
                    console.log("normal edit")
                    editCatValues(previewBaseUrl)
                }
            } else {
                addTestSeriesContent( catName, catSortOrder, subCategoryId, (response) => {
                    console.log(response.status)
                    if (response.status == 200) {
                        setIsLoading(false)
                        response.json().then(data => {
                            setIsAddEditModalVisible(false)
                            console.log(data)
                            let categories = [...subCategoryContent]
                            categories.unshift(data);
                            setSubCategoryContent(categories);
    
                        })
                    }
                })
            }
        }


    }
    const tiggerClickOnFile = () => {
        fileRef.click();
    }
    const fileOnChange = (event) => {
        var url = URL.createObjectURL(event.target.files[0]);
        setImagePreview(url)
        setImageFile(event.target.files[0])
    }



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

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }


    return (
        <div>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Exams</div>
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
                        <button type="button" class="btn btn-dark" style={{ marginRight: 5 }} onClick={() => history.goBack()}>Go Back</button>
                        <button type="button" class="btn btn-primary" onClick={() => setIsAddEditModalVisible(true)}>Add Content</button>
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
                                    <th align="center">Name</th>
                                    <th align="center">Image</th>
                                    <th align="center">Sort Order</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showShimmer ? (
                                    <td colspan="9">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {subCategoryContent && subCategoryContent.map((row, index) => (
                                            <tr>
                                                <td align="center">{index + 1}</td>
                                                <td align="center">{row.name}</td>
                                                <td align="center"><img src={serverBaseUrl + row.image} width="200" height="100" alt="" /></td>
                                                <td align="center">{row.sortOrder}</td>
                                                <td>
                                                    <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteCat(row.id, index)}>
                                                        Delete
                                                    </button>
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
                                                    <Link to={"/seriesList/" + row.id + "/" + row.name+"/name"}>
                                                        <button type="button" class="btn btn-primary m-0 px-2">
                                                            View Test Series
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    )
                                }
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
            <Modal
                visible={isAddEditModalVisible}
                setModalVisible={setIsAddEditModalVisible}
                modalId={"testAddEditModal"}
            >
                <form onSubmit={onSubmitHandler}>
                    <ModalHeader>
                        <h5 className="modal-title">Add Test Series Category</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>

                        <div className="form-row">
                            <label>Name </label>
                            <input className="form-control" value={catName} placeholder="Category Name" onChange={(e) => setCatName(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Sort Order </label>
                            <input className="form-control" value={catSortOrder} placeholder="Category Sort Order" onChange={(e) => setCatSortOrder(e.target.value)} />
                        </div>

                        {/* <div className="form-row">
                            <div className="col-6 col-lg-6"    >
                                <label>Category Image </label>
                                <input className="form-control" type="file" ref={ref => fileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden' }} />
                                <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Image</button>
                            </div>
                            <div className="col-6 col-lg-6">
                                <img src={imagePreview ? imagePreview : "http://placehold.it/200/200"} className="img-responsive w-100 h-100" />
                            </div>

                        </div> */}


                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {isLoading ? (
                            <button type="button" class="btn btn-primary px-5">
                                <ClipLoader color={"white"} size={18} />
                            </button>) : (
                        <button className="btn btn-primary">Add Content</button>
                            )}
                    </ModalFooter>
                </form>
            </Modal>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}
export default CategoryContent

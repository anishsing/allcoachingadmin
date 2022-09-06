import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverBaseUrl } from '../../index'
import { fetchTestSeriesByCategoryId, deleteSubCategory, addTestSeriesSubCategory, editTestSeriesSubCategory } from '../../api/testseries'
import { Link, useHistory } from "react-router-dom"
import { insertImage } from '../../api/blog';
import ClipLoader from "react-spinners/ClipLoader";
import { Image, Shimmer } from 'react-shimmer'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';
import TestSeriesSubCategoryRow from './TestSeriesSubCategoryRow';
const TestSeriesSubCategory = props => {

    const categoryId = props.match.params.id
    const [offset, setOffset] = useState(0);
    const [index, setIndex] = useState("");
    const [testSeriesSubCategory, setTestSeriesSubCategory] = useState([]);
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
    const [isLoading, setIsLoading] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    
    const testSeriesCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setTestSeriesSubCategory(data)
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
                        setTestSeriesSubCategory(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                console.log("category", data)
                setTestSeriesSubCategory(data)
                setIsLoading(false)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong", response.status)
        }
    }

    useEffect(() => {
        fetchTestSeriesByCategoryId(props.match.params.id, offset, dataLimit, testSeriesCallBack)
    }, [props.match.params.id])
    useEffect(() => {
        fetchTestSeriesByCategoryId(props.match.params.id, offset, dataLimit, testSeriesCallBack)
    }, [offset])

    const deleteTestSeriesSubCategory = (index) => {


        const arr = [...TestSeriesSubCategory]
        arr.splice(index, 1);
            setIsLoading(false)
            setTestSeriesSubCategory(arr)


        // console.log("here", index)
        // const arr = testSeriesSubCategory.slice()
        // delete arr[index];
        // setTestSeriesSubCategory(arr)
    }


    const editCatValues = (image) => {
        editTestSeriesSubCategory(editId, image, catName, catSortOrder, categoryId, (response) => {
            console.log(response.status)
            if (response.status == 200) {
                response.json().then(data => {

                    let categories = [...testSeriesSubCategory];
                    categories.splice(editIndex, 1, data)
                    console.log(data)
                    setIsAddEditModalVisible(false)
                    setTestSeriesSubCategory(categories)

                })
            }
        })
    }
    const onSubmitHandler = (e) => {
        if(!isLoading){

            e.preventDefault();
            setIsLoading(true)
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
                addTestSeriesSubCategory(imageFile, catName, catSortOrder, categoryId, (response) => {
                    console.log(response.status)
                    if (response.status == 200) {
                        response.json().then(data => {
                            setIsAddEditModalVisible(false)
                            console.log(data)
                            let categories = [...testSeriesSubCategory]
                            categories.unshift(data);
                            setIsLoading(false)
                            setTestSeriesSubCategory(categories);
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

    return (
        <div>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Sub Category</div>
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
                        <button type="button" class="btn btn-primary" onClick={() => {setIsAddEditModalVisible(true);setCatName(""); setCatSortOrder("") }}>Add Sub Category</button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th alignItem="center">#</th>
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
                                {testSeriesSubCategory && testSeriesSubCategory.map((row, index) => (
                                    <TestSeriesSubCategoryRow row={row} index={index} setIndex={setIndex} deleteTestSeriesSubCategory={deleteTestSeriesSubCategory} setIsAddEditModalVisible={setIsAddEditModalVisible} setEditMode={setEditMode} setEditIndex={setEditIndex} setEditId={setEditId} setCatName={setCatName} setCatSortOrder={setCatSortOrder} setPreviewBaseUrl={setPreviewBaseUrl} setImagePreview={setImagePreview} />
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

                        <div className="form-row">
                            <div className="col-6 col-lg-6"    >
                                <label>Category Image </label>
                                <input className="form-control" type="file" ref={ref => fileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden' }} />
                                <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Image</button>
                            </div>
                            <div className="col-6 col-lg-6">
                                <img src={imagePreview ? imagePreview : "http://placehold.it/200/200"} className="img-responsive w-100 h-100" />
                            </div>

                        </div>


                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {isLoading ? (
                            <button type="button" class="btn btn-primary px-5">
                                <ClipLoader color={"white"} size={18} />
                            </button>) : (
                            <button className="btn btn-primary">Add Sub Category</button>
                            )}
                    </ModalFooter>
                </form>
            </Modal>

        </div>
    )
}
export default TestSeriesSubCategory

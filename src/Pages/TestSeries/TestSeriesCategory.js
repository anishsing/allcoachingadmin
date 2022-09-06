import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverBaseUrl } from '../../index'
import { fetch_testSeries_category, deleteCategory, addTestSeriesCategory, editTestSeriesCategory } from '../../api/testseries'
import { Link, useHistory } from "react-router-dom"
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal';
import { insertImage } from '../../api/blog';
import { Image, Shimmer } from 'react-shimmer'
import { ClipLoader } from 'react-spinners';
import TestSeriesCategoryRow from './TestSeriesCategoryRow';

const TestSeriesCategory = props => {

    const [offset, setOffset] = useState(0);
    const [index, setIndex] = useState("");
    const [testSeriesCategory, setTestSeriesCategory] = useState([]);
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
    const [showShimmer, setShowShimmer] = useState(true)
    const history = useHistory();
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const testSeriesCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setTestSeriesCategory(data)
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
                        setTestSeriesCategory(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                console.log("tsdata", data)
                setTestSeriesCategory(data)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong", response.status)
        }
    }
    useEffect(() => {
        fetch_testSeries_category(offset, dataLimit, testSeriesCallBack)
    }, [])
    useEffect(() => {
        fetch_testSeries_category(offset, dataLimit, testSeriesCallBack)
    }, [offset])


    const deleteTestSeriesCategory = (index) =>{
        const arr = [...testSeriesCategory]
            arr.splice(index, 1);
            setIsLoading(false)
            setTestSeriesCategory(arr)
    }

    // const deleteCallBack = (response) => {
    //     if (response.status == 200) {
    //         const arr = [...testSeriesCategory]
    //         arr.splice(index, 1);
    //         setIsLoading(false)
    //         setTestSeriesCategory(arr)
    //     }
    //     else {
    //         console.log("unable to delete");
    //     }
    // }
    // useEffect(() => {
    //     if (deleteRef.current) {
    //         deleteCategory(deleteRef.current, deleteCallBack)
    //         deleteRef.current = false;
    //     }
    // }, [deleteRef.current])

    // const deleteCat = (id, i) => {
    //     if (window.confirm("Are you sure you want to delete?")) {
    //         console.log("gedfghui", i)
    //         setIndex(i)
    //         setIsLoading(true)
    //         deleteRef.current = id;
    //     }
    // }



    const onSubmitHandler = (e) => {

        e.preventDefault();
        console.log("onSubmitHandler",isLoading)
        if(isLoading){
            
    
            addTestSeriesCategory(catName, catSortOrder, (response) => {
    
                if (response.status == 200) {
                    response.json().then(data => {
                        setIsAddEditModalVisible(false)
                        console.log(data)
                        let categories = [...testSeriesCategory]
                        categories.unshift({...data,categoryName:data.name,categoryId:data.id});
                        console.log(data)
                        setTestSeriesCategory(categories);
                        setIsLoading(false)
                    })
                }
    
            })
        }    


    }

    const onEditSubmitHandler = (e) => {
        e.preventDefault();

        editTestSeriesCategory(editId, catName, catSortOrder, (response) => {

            if (response.status == 200) {
                console.log(response)
                response.json().then(data=>{
                    setIsAddEditModalVisible(false)
                    let categories = [...testSeriesCategory]
                    
                    console.log(categories,editIndex)
                   categories[editIndex]={...data,categoryId:data.id,categoryName:data.name}
                   console.log(categories)
                   setTestSeriesCategory(categories);
                   setIsLoading(false)
                })
                   
                    
                }

        })


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
                <div class="breadcrumb-title pr-3">Test Series Category</div>
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
                        <button type="button" class="btn btn-primary" onClick={() => {setIsAddEditModalVisible(true); setCatName(""); setCatSortOrder("")}}>Add Category</button>
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
                                    <th align="center">Sort Order</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showShimmer ? (
                                    <td colspan="5">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {testSeriesCategory && testSeriesCategory.map((row, index) => (
                                            <TestSeriesCategoryRow index={index} row={row} setIndex={setIndex} deleteTestSeriesCategory={deleteTestSeriesCategory} setCatSortOrder = {setCatSortOrder} setCatName ={setCatName} setEditId ={setEditId} setEditIndex ={setEditIndex} setEditMode={setEditMode} setIsAddEditModalVisible={setIsAddEditModalVisible} />
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

            {editMode==false?(
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


                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {isLoading ? (
                                    <button className="btn btn-primary px-4"><ClipLoader color="white" size="20" /></button>
                        ):(<button className="btn btn-primary" onClick={()=>setIsLoading(true)}>Add Category</button>)}
                        
                    </ModalFooter>
                </form>
            </Modal>
            ):(
                <Modal
                visible={isAddEditModalVisible}
                setModalVisible={setIsAddEditModalVisible}
                modalId={"testAddEditModal"}
            >
                <form onSubmit={onEditSubmitHandler}>
                    <ModalHeader>
                        <h5 className="modal-title">Edit Test Series Category</h5>
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


                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        {isLoading ? (
                            <button className="btn btn-primary px-4"><ClipLoader color="white" size="20" /></button>
                        ):(
                        <button className="btn btn-primary" onClick={()=>setIsLoading(true)}>Save Changes</button>)}
                    </ModalFooter>
                </form>
            </Modal>)}
            
        </div>
    )
}
export default TestSeriesCategory

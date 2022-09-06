import React, { useState, useEffect } from 'react';
import {
    boostInstitute, fetchAllInstitute,
    fetchInstituteByStatus, fetchInstituteByCategory,
    fetchInstituteByStatusAndCategory, fetch_categories,
    instituteSearchByName, instituteSearchByEmail, addInstitute
} from '../../api/institute'
import { dataLimit, theme } from '../../index'
import RenderSingleInstitute from './RenderSingleInstitute'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal'
import { Image, Shimmer } from 'react-shimmer'
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';


const Institute = props => {

    const [instituteList, setInstituteList] = useState([]);
    const [category, setCategory] = useState([]);
    const [boostValue, setBoostValue] = useState(0);
    const [offset, setOffset] = useState(0);
    const [isBoostModalVisible, setIsBoostModalVisible] = useState(false)
    const [boostInsId, setBoostInsId] = useState(-1)
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [selectedCategoryName, setSelectedCategoryName] = useState("Select Category");
    const [showShimmer, setShowShimmer] = useState(true)

    const [showDataSearchBy, setShowDataSearchBy] = useState(false)
    const [instituteSearchBy, setInstituteSearchBy] = useState("ByName")
    const [instituteSearchValue, setInstituteSearchValue] = useState("")
    const [instituteDataSearchBy, setInstituteDataSearchBy] = useState([])
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()

    const [isLoading, setLoading] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [addModal,setAddModal] = useState(false)
    const [file, setFile] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [directorName, setDirectorName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("") 
    const [categoryData, setCategoryData] = useState([])
    const [about, setAbout] = useState("")


    const instituteCallBack = (response) => {
        setShowShimmer(false)
        if (response.status == 200) {
            response.json().then(data => {
                console.log(data)
                if (data.length == dataLimit) {
                    setInstituteList(data)
                    setShowNextButton(true)
                }
                else if (data.length < dataLimit) {
                    console.log("else")
                    console.log(data.length)
                    if (data.length == 0) {
                        if (offset > 0) {
                            if (offset == 0) {
                                setOffset(0)
                            } else {
                                setOffset(offset - 1)
                            }
                        } else {
                            setOffset(0)
                        }

                    }
                    else if (data.length != 0) {

                        setInstituteList(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }

                setInstituteList(data)
            })
        }
        else {
            console.log("something went wrong")
        }
    }

    const handleCatgoryCallback = (response) => {
        if (response.status === 200) {
            response.json().then(data => {
                data.unshift({ key: -1, label: "All" })
                setCategoryData(data)
            })

        } else {
            console.log("something went wrong")
        }

    }


    
    const signupCallBack = (response) => {
        setLoading(false)
        if (response.status == 201) {
          
            var obj = {
                id: response.headers.get('location'),
                logo: URL.createObjectURL(file),
                name: name,
                directorName: directorName,
                email: email,
                phone: phone,
                password: password,
                address: address,
                city: city,
                state: state,
                category: category,
                about: about,
                status: 1
            }
            setInstituteList([obj,...instituteList])
            setAddModal(false)
            setSnackBarMessage("Successfully Signed up")
            setIsSnackBarShow(true)
        }
    }



    const signupClickHandler = (e) => {

        e.preventDefault()
        setLoading(true) 
        addInstitute(file, name, directorName, email, phone, password, address, city, state, category, about, 1, signupCallBack)
    }

    const update = (i, status) => {
        var arr = instituteList
        arr[i].status = status;
        setInstituteList(arr)
    }

    useEffect(() => {

        props.match.params.type == -1 ?
            (
                selectedCategory != -1 ?
                    (
                        fetchInstituteByCategory(selectedCategory, offset, dataLimit, instituteCallBack)
                    ) :
                    (
                        fetchAllInstitute(offset, dataLimit, instituteCallBack)
                    )

            ) :
            (
                selectedCategory != -1 ?
                    (
                        fetchInstituteByStatusAndCategory(props.match.params.type, selectedCategory, offset, dataLimit, instituteCallBack)
                    ) :
                    (
                        fetchInstituteByStatus(props.match.params.type, offset, dataLimit, instituteCallBack)
                    )

            );
        fetch_categories(handleCatgoryCallback)
    }, [props.match.params.type, selectedCategory, offset])

    const boostInstituteClickHanlder = () => {
        boostInstitute(boostInsId, boostValue, (response) => {
            console.log(response.status)
            if (response.status == 200) {
                document.getElementById("boost" + boostInsId).innerHTML = boostValue
                setIsBoostModalVisible(false)
            }
        })
    }

    const deleteFromState = (index) => {
         
        const arr = [...instituteList]
         arr.splice(index,1)
        setInstituteList(arr)

    }

    const filterItems = (key) => {
        console.log("helloo")
    }


    const findInstituteByCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("getting search data", data)
                setInstituteDataSearchBy(data)
                setShowDataSearchBy(true)
                setShowShimmer(false)
            })
        }
        setLoading(false)
    }

    const action4SearchInstitute = () => {
        setShowShimmer(true)
        setLoading(true)
        if (instituteSearchBy == "ByName") {
            // alert('Search by name')
            instituteSearchByName(instituteSearchValue, offset, dataLimit, findInstituteByCallback)
        } else if (instituteSearchBy == "ByEmail") {
            // alert('Seach by Email')
            instituteSearchByEmail(instituteSearchValue, offset, dataLimit, findInstituteByCallback)
        }
    }

    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
            console.log('Offset', offset)
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

    console.log(instituteList)

    return (
        <div>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">{props.match.params.type==-1?("All Institutes"):props.match.params.type==0?"Unapproved Institutes":props.match.params.type==2?"Blocked Institutes":"Deleted Institutes"}</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                {/* {instituteList.length > 0 ? ( */}
                    <div class="ml-auto">


                        <div class="btn-group">
                            <div>
                                <button class="btn btn-primary" style={{ marginRight: 5 }} type="button" onClick={() => setAddModal(true)}>
                                    + ADD Institute
                                </button>
                            </div>
                            <button type="button" class="btn btn-primary">{selectedCategoryName}</button>
                            <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                {categoryData.map((row, i) => (
                                    // <option value={row.key}>{row.label}</option>
                                    // <p class="dropdown-item" onClick={()=>filterItems(row.key)}>{row.label}</p>
                                    <a class="dropdown-item" href="javascript:;" onClick={() => { setSelectedCategory(row.key); setSelectedCategoryName(row.label) }}>{row.label}</a>
                                ))}

                                {/* <a class="dropdown-item" href="javascript:;">Another action</a>
                            <a class="dropdown-item" href="javascript:;">Something else here</a>
                            <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Separated link</a> */}
                            </div>
                        </div>
                    </div>
                 {/* ) : (null)} */}

            </div>


            {instituteList.length > 0 ? (
                <div>
                    <div className="row mt-3">
                        <div className="col-lg-4 col-md-6 col-12 d-flex mb-4">
                            <input type="text" className="form-control mr-3" onChange={(e) => setInstituteSearchValue(e.target.value)} placeholder="Search Institute" />

                            <div class="btn-group">
                                {isLoading ? (
                                    <button type="button" class="btn btn-primary px-5">
                                        <ClipLoader color={"white"} size={18} />
                                    </button>
                                ) : (
                                    <button type="button" class="btn btn-primary" onClick={(e) => action4SearchInstitute()} >Search&nbsp;{instituteSearchBy} </button>
                                )}
                                <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                    <a class="dropdown-item" href="javascript:;" onClick={() => setInstituteSearchBy("ByName")}>Name</a>
                                    <a class="dropdown-item" href="javascript:;" onClick={() => setInstituteSearchBy("ByEmail")}>Email</a>
                                </div>
                            </div>
                        </div>


                    </div>
                    {showDataSearchBy ? (
                        <div className="mb-2">
                            <button className="btn btn-light" style={{ cursor: 'pointer' }} onClick={() => setShowDataSearchBy(false)}>Clear Search x</button>
                        </div>
                    ) : (null)}
                </div>
            ) : (null)}





            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th> 
                                    <th align="center">Actions</th>
                                    <th align="center">Name</th>
                                    <th align="center">Director Name</th>
                                    <th align="center">Email</th>
                                    <th align="center">Phone</th>
                                    <th align="center">City</th>
                                    <th align="center">State</th>
                                    <th align="center">Boost Value</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="9">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {showDataSearchBy ? (
                                            <>
                                                {instituteDataSearchBy && instituteDataSearchBy.map((row, i) => (
                                                    <RenderSingleInstitute setBoostInsId={setBoostInsId} setBoostValue={setBoostValue} setIsBoostModalVisible={setIsBoostModalVisible} row={row} index={i} update={update} deleteCallback={deleteFromState} />
                                                ))}
                                                {instituteDataSearchBy <= 0 ? (
                                                    <td align="center" colspan="9">
                                                        No data found, Try with another keyword.
                                                    </td>
                                                ) : (null)}
                                            </>
                                        ) : (
                                            <>
                                                {instituteList && instituteList.map((row, i) => (
                                                    <RenderSingleInstitute setBoostInsId={setBoostInsId} setBoostValue={setBoostValue} setIsBoostModalVisible={setIsBoostModalVisible} row={row} index={i} update={update} deleteCallback={deleteFromState} />
                                                ))}
                                            </>
                                        )}
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
                visible={isBoostModalVisible}
                setModalVisible={setIsBoostModalVisible}
                modalId={"boostInsModal"}
            >
                <ModalHeader>
                    <h5 className="modal-title">Add Banner</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>

                    <div className="form-row">
                        <label>Boost Value </label>
                        <input className="form-control" value={boostValue} placeholder="Banner Link" onChange={(e) => setBoostValue(e.target.value)} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => boostInstituteClickHanlder()}>Boost Institute</button>
                </ModalFooter>
            </Modal>
            
            <Modal
                visible={addModal}
                setModalVisible={setAddModal}
                modalId={"addInsModal"}
            >
                <form onSubmit={signupClickHandler}>
                    <ModalHeader>
                        <h5 className="modal-title">Add Institue</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody> 
                        <div class="card-body p-md-1">
                        
                            
                            <div class="form-group">
                                <label>File</label>
                                <input type="file" required class="form-control" placeholder="Enter your institute name" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <div class="form-group mt-4">
                                <label>Institute Name</label>
                                <input type="text" required class="form-control" placeholder="Enter your institute name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div class="form-group mt-4">
                                <label>Director Name</label>
                                <input type="text" required class="form-control" placeholder="Enter your director name" onChange={(e) => setDirectorName(e.target.value)} />
                            </div>
                            <div class="form-group mt-4">
                                <label>Email Address</label>
                                <input type="text" required class="form-control" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="form-group mt-4">
                                <label>Phone</label>
                                <input type="number" required class="form-control" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" required class="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input type="text" required class="form-control" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>City</label>
                                <input type="text" required class="form-control" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>State</label>
                                <input type="text" required class="form-control" placeholder="Enter your state" onChange={(e) => setState(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select class=" form-control" required onChange={(e) => setCategory(e.target.value)} value={category}>
                                    <option value={-1}>Select Category</option>
                                    {categoryData.map((item) => (
                                        <option value={item.key}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div class="form-group">
                                <label>About</label>
                                <textarea   class="form-control" required placeholder="Enter your about institute" onChange={(e) => setAbout(e.target.value)} ></textarea>
                            </div>
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button   className="btn btn-primary" >
                            

                            {isLoading?(
                                    <ClipLoader color={"white"}   loading={isLoading}     />
                                ):("Add Institute")
                            }
                        </button>
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
};



export default Institute;
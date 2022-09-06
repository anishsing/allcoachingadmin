import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverBaseUrl,theme } from '../../index'
import { seriesList, deleteTestSeries, editTestSeriesData } from '../../api/testseries'
import { Link, useHistory } from "react-router-dom"
import Snackbar from '@material-ui/core/Snackbar';
import { Image, Shimmer } from 'react-shimmer'

import ClipLoader from "react-spinners/ClipLoader";
import SeriesListRow from './seriesListRow';
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import moment from 'moment';
const SeriesList = props => {
console.log(props)
    const [offset, setOffset] = useState(0);
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [index, setIndex] = useState("");
    const [seriesListData, setSeriesListData] = useState([]);
    const deleteRef = useRef(false)
    const history = useHistory();
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)


    const [category, setCategory] = useState(0);
    const [playlistId, setPlaylistId] = useState(); 
    const [time, setTime] = useState('');
    const [marks, setMarks] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isPractice, setIsPractice] = useState(true);
    const [timeDuration, setTimeDuration] = useState('');
    const [seriesId, setSeriesId] = useState();
    const [seriesQuestionCount, setSeriesQuestionCount] = useState(0)
    let publishingSeriesCallBack = useRef(null)
    const [loadingPublicationsCall,setLoadingPublicationsCallBack] = useState(false)
    const [seriesIndex,setSeriesIndex] = useState(-1)
    const [publishTestSeriesModal, setPublishTestSeriesModal] = useState(false);
    let catId = props.match.params.id
    const [correctMarks,setCorrectMarks] = useState(0)
    const [wrongMarks,setWrongMarks] = useState(0)
    // const [hiddenStatus,setHiddenStatus] = useState(row.hidden);

    const setPublishingSeriesDetails=(series,callback,index)=>{
        setPlaylistId(series.playlistId);
        setTime(series.time);
        setTimeDuration(series.timeDuration);
        setMarks(series.maxMarks);
        setTitle(series.title);
        setDate(moment(series.date,"DD/MM/YYYY").format("YYYY-MM-DD"))
        setIsPractice(series.isPractice);
        setSeriesId(series.id);
        setCorrectMarks(series.correctMarks);
        setWrongMarks(series.wrongMarks)
        setSeriesQuestionCount(series.questionCount);
        console.log(callback,index)
        publishingSeriesCallBack.current = callback;
        setSeriesIndex(index)

    }
    const editSeriesData = () => {
    
        if (title && timeDuration && time && date && marks) {
                if(!loadingPublicationsCall)
                {
                    setLoadingPublicationsCallBack(true);
                    editTestSeriesData(seriesId, title, timeDuration, time, date, isPractice, catId, marks, true,false,seriesQuestionCount,correctMarks,wrongMarks,editSeriesCallback)
                }
                
                
        }
        else {
            console.log('Please Fill All The Fields.')
        }
    }
    const editSeriesCallback = (response) => {
        if (response.status == 201) {
            setSnackBarMessage("Changes Saved Successfully!!")
            setIsSnackBarShow(true)
            console.log(publishingSeriesCallBack.current,seriesIndex)
            if(publishingSeriesCallBack.current)
            {
                publishingSeriesCallBack.current()
            }
            let arr = [...seriesListData]
            arr[seriesIndex]['title'] = title;
            arr[seriesIndex]['maxMarks'] = marks;
            arr[seriesIndex]['timeDuration'] = timeDuration;
            setSeriesListData(arr);
            setPublishTestSeriesModal(false)
            
        }
        else {
            console.log("error", response.status)
        }
        setLoadingPublicationsCallBack(false)
    }


    const seriesListCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setSeriesListData(data)
                    setShowNextButton(true)
                }
                else if (data.length < dataLimit) {
                    console.log("else")
                    console.log(data.length)
                    if (data.length == 0) {
                        if (offset == 0) {
                            setOffset(0)
                        } else {
                            setOffset(offset - 1)
                        }
                    }
                    else if (data.length != 0) {
                        setSeriesListData(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                console.log(data)
                setSeriesListData(data)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong", response.status)
        }
    }

    useEffect(() => {
        seriesList(props.match.params.id, offset, dataLimit, seriesListCallBack)
    }, [props.match.params.id])


    useEffect(() => {
        seriesList(props.match.params.id, offset, dataLimit, seriesListCallBack)
    }, [offset])

    const deleteCallBack = (response) => {
        if (response.status == 200) {
            const arr = seriesListData.slice()
            delete arr[index];
            setSeriesListData(arr)
            setSnackBarMessage("Test Series Deleted Successfully")
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
            deleteTestSeries(deleteRef.current, deleteCallBack)
            deleteRef.current = false;
        }
    }, [deleteRef.current])

    const deleteCat = (id, i) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setIndex(i)
            deleteRef.current = id;
        }
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
                <div class="breadcrumb-title pr-3">Test Series</div>
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
                        <Link to={"/addTestSeries/" + props.match.params.id + "/add/0/title/name"}>
                            <button type="button" class="btn btn-primary">Add Series</button>
                        </Link>
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
                                    <th align="center">Time Duration</th>
                                    <th align="center">Max. Marks</th>
                                    <th align="center">Question Count</th>
                                    <th align="center">Attempt Count</th>
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
                                        {seriesListData && seriesListData.map((row, index) => (
                                            <SeriesListRow 
                                             row={row}
                                             index={index}
                                             deleteCat={deleteCat}
                                             catId={catId}
                                             setSeriesDetails={setPublishingSeriesDetails}
                                             setPublishModal={setPublishTestSeriesModal}  

                                             />
                                        ))}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
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

            {publishTestSeriesModal ? (
                <Modal
                    size="lg"
                    show={publishTestSeriesModal}
                    onHide={()=>setPublishTestSeriesModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ zIndex: 10000 }}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Publish Test Series
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Time Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Time Duration"
                                        onChange={(e) => setTimeDuration(e.target.value)}
                                        value={timeDuration}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        onChange={(e) => setDate(e.target.value)} value={date}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        step="1"
                                        name="Time"
                                        onChange={(e) => setTime(e.target.value)}
                                        value={time}
                                        required
                                    />
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Max Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Max Marks"
                                        onChange={(e) => setMarks(e.target.value)}
                                        value={marks}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Type</Form.Label>
                                    <select class="custom-select" id="validationCustom04" required onChange={(e) => setIsPractice(e.target.value)}>
                                        <option>Select Exam Type</option>
                                        <option value={true} selected={isPractice ? (true) : (false)}>Practice</option>
                                        <option value={false} selected={isPractice ? (false) : (true)}>Exam</option>
                                    </select>
                                </Form.Group>
                            </Row>
                             <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Question Correct Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Correct Marks"
                                        onChange={(e) => setCorrectMarks(e.target.value)}
                                        value={correctMarks}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Question Wrong Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Question Marks"
                                        onChange={(e) => setWrongMarks(e.target.value)}
                                        value={wrongMarks}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                           
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={()=>setPublishTestSeriesModal(false)}
                            style={{ backgroundColor: theme.greyColor, color: theme.primaryColor }}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ backgroundColor: theme.darkPurpleColor, marginLeft: 10, color: theme.primaryColor }}
                            onClick={() => window.confirm("Are You Sure You Want To Publish?") ? (editSeriesData()) : (console.log("no"))}
                        >
                            {loadingPublicationsCall ? (
                                <ClipLoader color={theme.primaryColor} loading={loadingPublicationsCall} />
                            ) : ("Save changes")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) :(null)}
            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}
export default SeriesList

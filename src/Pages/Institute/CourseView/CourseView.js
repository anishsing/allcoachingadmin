import React,{useState, useEffect} from 'react'
import CourseBanners from './CourseBanners/CourseBanners'
import CourseDocument from './CourseDocument/CourseDocument'
import CourseTestSeries from './CourseTestSeries/CourseTestSeries'
import CourseTimeTable from './CourseTimeTable/CourseTimeTable'
import CourseTransaction from './CourseTransactions/CourseTransaction'
import CourseVideo from './CourseVideo/CourseVideo'
import { getDocumentCount, getVideoCount, getTestSeriesCount, getBannerCount } from '../../../api/courses'
import { Link, useHistory } from "react-router-dom"


const renderTabContent=(activeTab ,activeCourse) => {
    switch(activeTab)
    {
        case 'banners':
                return(<CourseBanners activeCourse={activeCourse}/>)
 
        case 'videos':
            return(<CourseVideo activeCourse={activeCourse}/>)
          
        case 'documents':
            return(
                <CourseDocument activeCourse={activeCourse}  />
            )
            break;
        case 'testseries':
            return <CourseTestSeries activeCourse={activeCourse}/>
            break;
        case 'timetable':
            return(<CourseTimeTable activeCourse={activeCourse}/>)
        case 'transaction':
            return(<CourseTransaction activeCourse={activeCourse}/>)
          


    }
}

function CourseView(props) {
    let activeCourse = props.match.params.id

    const [activeTab,setActiveTab] = useState('banners')
    const [docCount,setDocCount] = useState('')
    const [videoCount,setVideoCount] = useState('')
    const [tsCount,setTsCount] = useState('')
    const [bannerCount,setBannerCount] = useState('')
    const history = useHistory();

    useEffect(() => {
        getDocumentCount(activeCourse, docCountCallBack)
        getVideoCount(activeCourse, videoCountCallBack)
        getTestSeriesCount(activeCourse, tsCountCallBack)
        getBannerCount(activeCourse, bannerCountCallBack)
    },[activeCourse])

    const docCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setDocCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    const videoCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setVideoCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    const tsCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setTsCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }
    const bannerCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setBannerCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    return (
        <div>
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                {/* <div class="breadcrumb-title pr-3">Course View</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div> */}
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-dark" style={{marginRight: 5}} onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{bannerCount}</h4>
                                    <p className="mb-0">Banners</p>
                                </div>
                                <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-carousel'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{videoCount}</h4>
                                    <p className="mb-0">Video</p>
                                </div>
                                <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-video-plus'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{docCount}</h4>
                                    <p className="mb-0">Document</p>
                                </div>
                                <div className="widgets-icons bg-light-danger text-danger rounded-circle"><i className='bx bx-file-blank'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{tsCount}</h4>
                                    <p className="mb-0">Test Series</p>
                                </div>
                                <div className="widgets-icons bg-light-info text-info rounded-circle"><i className='bx bx-pencil'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="button" className={activeTab=="banners"?"btn btn-success mr-1":"btn btn-primary mr-1"} onClick={()=>{setActiveTab('banners')}}>
                    Banners
                </button>
                <button type="button" className={activeTab=="videos"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('videos')}}>
                    Videos
                </button>
             
                <button  type="button" className={activeTab=="documents"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('documents')}}>
                    Documents
                </button>
                <button  type="button" className={activeTab=="testseries"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('testseries')}}>
                    Test Series
                </button>
                <button type="button" className={activeTab=="timetable"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('timetable')}}>
                    Time Table
                </button>

            </div>
            {renderTabContent(activeTab,activeCourse)}
    
        </div>
    )
}

export default CourseView

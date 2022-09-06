import React, { useState, useEffect } from 'react'
import { dataLimit, serverBaseUrl } from '../../index'
import { findStudentHistory } from '../../api/student'
import { Shimmer } from 'react-shimmer'

import RecentVideos from './RecentActivities/RecentVideos'
import TestSeries from './RecentActivities/TestSeries'
import RecentDocuments from './RecentActivities/RecentDocuments'

export default function StudentHistory(props) {


    const [offset, setOffset] = useState(0)
    const [showDoc, setShowDoc] = useState(false)
    const [showVideos, setShowVideos] = useState(true)
    const [showNextButton, setShowNextButton]=useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showTestSeries, setShowTestSeries] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    const [historyType, setHistoryType] = useState('video')
    const [historyData, setHistoryData] = useState([])



    const StudentHistoryCallback = (response) => {
        if (response.status == 200) {
            setShowShimmer(false)
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setHistoryData(data)
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
                        setHistoryData(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }

                console.log('student history for ' + historyType, data)
                setHistoryData(data)
            })
        }
    }

    useEffect(() => {
        findStudentHistory(props.userId, offset, dataLimit, historyType, StudentHistoryCallback)
    }, [historyType])
    useEffect(() => {
        findStudentHistory(props.userId, offset, dataLimit, historyType, StudentHistoryCallback)
    }, [offset])


    const nextPageHandler=()=>
    {
        if(!allDataLoaded)
        {
            setOffset(offset+1)
        }else {
            window.alert("No more data available")
        }
        
    }
    const prePageHandler=()=>
    {
        if(offset>0)
        {
            setOffset(offset-1)
        }
        else if(offset==0)
        {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)
        
    }

    return (
        <>
            <h2 className="mt-4">Recents Activities</h2>

            <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link px-4 active" id="pills-videos-tab" data-toggle="pill" href="#pills-videos" role="tab" aria-controls="pills-videos" aria-selected="true" onClick={() => setHistoryType('video')}>Videos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-4" id="pills-testSeries-tab" data-toggle="pill" href="#pills-testSeries" role="tab" aria-controls="pills-testSeries" aria-selected="false" onClick={() => setHistoryType('testSeries')}>Test Series</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link px-4" id="pills-document-tab" data-toggle="pill" href="#pills-document" role="tab" aria-controls="pills-document" aria-selected="false" onClick={() => setHistoryType('document')}>Document</a>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-videos" role="tabpanel" aria-labelledby="pills-videos-tab">


                    {showShimmer ? (

                        <Shimmer width={'100%'} height={200} />

                    ) : (
                        <>
                            {historyData && historyData.map((item, i) => (
                                <RecentVideos item={item} key={i} />
                            ))}
                        </>
                    )}

                </div>
                <div class="tab-pane fade" id="pills-testSeries" role="tabpanel" aria-labelledby="pills-testSeries-tab">


                    {showShimmer ? (

                        <Shimmer width={'100%'} height={200} />

                    ) : (
                        <>
                            {historyData && historyData.map((item, i) => (
                                <TestSeries item={item} key={i} />
                            ))}
                        </>
                    )}


                </div>
                <div class="tab-pane fade" id="pills-document" role="tabpanel" aria-labelledby="pills-document-tab">


                    {showShimmer ? (

                        <Shimmer width={'100%'} height={200} />

                    ) : (
                        <>
                            {historyData && historyData.map((item, i) => (
                                <RecentDocuments item={item} key={i} />
                            ))}
                        </>
                    )}


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

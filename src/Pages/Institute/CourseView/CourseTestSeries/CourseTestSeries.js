import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { dataLimit } from '../../../..';
import { fetch_testSeries } from '../../../../api/courses';
import CourseTestSeriesRow from './CourseTestSeriesRow';
import { Image, Shimmer } from 'react-shimmer'

function CourseTestSeries(props) {
    const { activeCourse } = props
    const [seriesList, setSeriesList] = useState([])

    const [courseSeriesListLoaded, setCourseSeriesListLoaded] = useState(false);
    const [isCourseSeriesListLoading, setIsCourseSeriesListLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [showShimmer, setShowShimmer] = useState(true)
    useEffect(() => {
        fetch_testSeries(activeCourse, offset, dataLimit, courseTestseriesCallback);
    }, [activeCourse])
    useEffect(() => {
        fetch_testSeries(activeCourse, offset, dataLimit, courseTestseriesCallback);
    }, [offset])

    const courseTestseriesCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setSeriesList(data)
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
                        setSeriesList(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setSeriesList(data)
                setCourseSeriesListLoaded(true)
                setIsCourseSeriesListLoading(false)
                setShowShimmer(false)
            })
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

    return (

        <div className="mt-3">
            <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Title</th>
                            <th align="center">Duration(mins)</th>
                            <th align="center">Max Marks</th>
                            <th align="center">Total Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showShimmer ? (
                            <td colspan="5">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>
                                {seriesList.map((row, i) => (
                                    <CourseTestSeriesRow row={row} index={i} />
                                ))}
                            </>
                        )}

                    </tbody>
                </table>
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

    )
}

export default CourseTestSeries

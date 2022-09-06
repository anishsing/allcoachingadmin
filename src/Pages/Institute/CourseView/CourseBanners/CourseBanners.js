import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetch_courses_banners } from '../../../../api/banners';
import CourseBannerRow from './CourseBannerRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';

function CourseBanners(props) {
    const { activeCourse } = props
    const [courseBaneers, setCourseBanners] = useState([]);
    const [loadingBanners, setLoadingBanners] = useState(true)
    const [showShimmer, setShowShimmer] = useState(true)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)

    useEffect(() => {
        fetch_courses_banners(activeCourse, courseBannerCallback)
    }, [activeCourse])



    const courseBannerCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                
                setCourseBanners(data)
                setLoadingBanners(false)
                setShowShimmer(false)
            })
        }
    }

    const deleteBanner = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteBanner(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        if (response.status == 200) {
            const arr = [...courseBaneers]
            arr.splice(index, 1)
            setCourseBanners(arr)
            setSnackBarMessage("Banner Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
    }


    const closeSnack = () => {
        setIsSnackBarShow(false)
    }


    return (
        <div className="mt-3">
            <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Banner</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showShimmer ? (
                            <td colspan="3">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>
                                {courseBaneers.map((row, i) => (
                                    <CourseBannerRow row={row} index={i} delBanner={deleteBanner} />
                                ))}
                            </>
                        )}

                    </tbody>
                </table>
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

export default CourseBanners

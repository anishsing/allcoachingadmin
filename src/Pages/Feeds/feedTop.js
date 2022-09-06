import React,{useState} from "react";
import { deleteByFeedId, fetch_feeds } from '../../api/feed'
import { serverBaseUrl } from "../..";
import moment from 'moment'

import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';
import { deleteReportByFeedId, deleteReportById } from "../../api/feedReport";
const FeedTop = props => {
     
    const { feed } = props 
    const [creationTime, setCreationTime] = useState(feed.feed.feed.creationTime)
    const [logo, setLogo] = useState(feed.posterObject.logo||feed.posterObject.studentImage)
    const [name, setName] = useState(feed.posterObject.name)
    const [loading,setLoading] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }
    const deleteFeedHandler=()=>
    {
        
        if(!loading)
        {

            setLoading(true)

            deleteReportByFeedId(feed?.feed?.feed?.id,(response)=>{

                if(response.status === 200)
                {
                    deleteByFeedId(feed?.feed?.feed?.id,(response1)=>{
    
    
                        setLoading(false)
                        if(response1.status === 200)
                        {
                            setSnackBarMessage("Deleted Feed Successfully")
                        }else
                        {
                            setSnackBarMessage("Unable to Delete Feed")
                        }
                        setIsSnackBarShow(true)
                       
                    })
                }else
                {
                    setSnackBarMessage("Unable to Delete Feed")
                    setIsSnackBarShow(true)
                }


            })
            
        }
        
    }
    return (
        <div className="mt-4">
            <div className="d-md-flex align-items-center">
                <div className="mb-md-0 mb-3" style={{ marginLeft: 20 }}>
                    <img src={serverBaseUrl+logo} className="rounded-circle shadow" width="50" height="50" alt="" id="userImage" />
                </div>
                <div className="ml-md-4 flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                        <h5 className="mb-0" id="username">{name}</h5>
                    </div>
                    <p className="mb-0 text-muted" id="userStatus">{moment(creationTime).fromNow()}</p>
                </div>
                <div className="m-1">
                    <button className="btn btn-danger" onClick={deleteFeedHandler}> 
                        {loading?(

                            <ClipLoader color="white"  size={20} />
                        ):(

                                "Delete Feed"
                        )}
                        

                    </button>
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    );
}

export default FeedTop;
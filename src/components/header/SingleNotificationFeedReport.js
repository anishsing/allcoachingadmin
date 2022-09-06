import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serverImageUrl } from '../..';
import { updateReportSeenStatus } from '../../api/feedReport';
import { updateTransactionSeenStatus } from '../../api/transaction';




function Bull({isVisible}) {
    return (
        <span style={{fontSize:25,color:"#673ab7",marginRight:10}}>
            {isVisible?"•":" "}
        </span>
    );
}
function SingleNotificationFeedReport({item}) {


    useEffect(()=>{
        if(!item.seenByAdmin)
        {
            updateReportSeenStatus(item.id,true,(response)=>console.log(response.status));
        }
      },[])

  return ( <Link to={"/feed/"+item.feed.id+"/feedId"} className="dropdown-item" href="javascript:;" style={{paddingLeft:5}}>
            <div className="media align-items-center">
                <Bull isVisible={!item.seenByAdmin}/>
                <div className="notify bg-light-mehandi text-mehandi">
                    <i className="bx bx-door-open" />
                    
                    {/* <img src={`${serverImageUrl}${item.institute.logo}`} style={{width:50, height:50 }}/> */}
                </div>
                <div className="media-body">
                <h6 className="msg-name">
                    Feed has been Reported{" "}
                    <span className="msg-time float-right">
                        {moment(item.reportDate).fromNow()}
                    </span>
                </h6>
                <p style={{flexWrap: 'wrap',flex:1,width:"100%",whiteSpace:"break-spaces"}} className="msg-info">{item.text}</p>
                </div>
            </div>
        </Link>);
}

export default SingleNotificationFeedReport;

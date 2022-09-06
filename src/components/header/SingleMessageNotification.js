import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serverImageUrl } from '../..';
import { updateMessagesSeenStatus } from '../../api/message';

function Bull({isVisible}) {
  return (
      <span style={{fontSize:25,color:"#673ab7",marginRight:10}}>
          {isVisible?"•":" "}
      </span>
  );
}
function SingleMessageNotification({item}) {



  useEffect(()=>{
    if(!item.seenByAdmin)
    {
      updateMessagesSeenStatus(item.id,true,(response)=>console.log(response.status));
    }
  },[])
  return (
    <Link className="dropdown-item" to={`/studentMessages/${item.messageType}/false/status`}>
    <div className="media align-items-center">

      <Bull isVisible={!item.seenByAdmin}/>
      <div className="user">
        <img
          src={`${serverImageUrl}${item.student.studentImage}`}
          className="msg-avatar"
          alt="user avatar"
        />
      </div>
      <div className="media-body">
        <h6 className="msg-name">

          {item.messageType=="feedback" ?"FeedBack from ":"Message from "}
         {item.student.name}{" "}
          <span className="msg-time float-right">{moment(item.messageInitialTime).fromNow()}</span>
        </h6>
        <p className="msg-info">
          
          {item.message.length>20?(
            `${item.message.slice(0,20)} ...` 
          ):(
            item.message
          )}
        </p>
      </div>
    </div>
  </Link>
  );
}

export default SingleMessageNotification;

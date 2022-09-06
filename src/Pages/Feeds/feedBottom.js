import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { like_feed, unlike_feed } from '../../api/feed'

const FeedBottom = props => {
    
    const { feed, feedId,setShowComment} = props;
    const [likes, setLikes] = useState(feed.feed.feed.likes)
    const [commentCount, setCommentCount] = useState(feed.feed.feed.commentCount)
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    
    // const insDetails = useSelector((state) => state.ins.insDetails)

    const likesCallback = (response) => {
        
        if (response.status === 200) {

            setLikes(likes + 1)
            setAlreadyLiked(true)
        }
    }


    const unlikesCallback = (response) => {
        console.log(response.status)
        if (response.status === 200) {

            setLikes(likes - 1)
            setAlreadyLiked(false)
        }
    }



     


     

 


    return (
        <div className="justify-content-center mx-4 mb-3">
          
                <button type="button" className="btn "><i className="bx bx-heart"></i>{likes}</button>
      

            <button type="button" className="btn" onClick={()=>setShowComment(true)}><i className="bx bx-comment"></i>{commentCount}</button>
            {/* <button type="button" className="btn float-right"><i className="bx bx-share-alt"></i></button> */}
        </div>
    );
}

export default FeedBottom;
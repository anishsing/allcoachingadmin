import React, { useState } from "react";
import FeedTop from "./feedTop";
import FeedBottom from "./feedBottom";
import Comment from './comments'

const TextFeed = props => {

    
    const { feed } = props
    const [description, setDescription] = useState(feed.feed.feed.description)
    const [about, setAbout] = useState(feed.posterObject.about)
    const [showComments ,setShowComment] = useState(false)

    return (
        <div>

            <div className="card justify-content-center " >
                <FeedTop feed={feed} />
                <div className="card-body align-items-center">
                    <div className="ml-md-4 flex-grow-1" style={{ marginLeft: 20, marginTop: 20 }}>
                        <div className="mb-md-0 mb-3">
                            <h6>{description}</h6> 
                        </div>
                    </div>
                    <FeedBottom feed={feed} feedId={feed.feed.feed.id} setShowComment={setShowComment}/>

                    
                    {showComments?(

                        <Comment feed={feed} feedId={feed.feed.feed.id} />
                    ):(
                        null
                    )}
                </div>
            </div>

        </div>

    )
}

export default TextFeed;
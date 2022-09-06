import React, { useState } from "react";
import FeedTop from "./feedTop";
import Comment from './comments'
import FeedBottom from "./feedBottom";
import { fetch_feeds } from '../../api/feed'
import PollFeedRow from "./pollFeedRow";
// import { useSelector } from 'react-redux'

const PollFeed = props => {
  
    const { feed } = props
    // const insDetails = useSelector((state) => state.ins.insDetails)
    // let insId = insDetails.id
  
    const [showComments ,setShowComment] = useState(false)
    const [totalPollVotes, setTotalPollVotes] = useState(props.feed.feed.feed.totalPollVotes)
    const [optionData, setOptionData] = useState(props.feed.feed.feedPollOptions)
    // const [canUserVote, setCanUserVote] = useState(props.type==1?(props.feed.feed.feed.pollVotedInstitutes.includes(`,${insId},`)?(false):(true)):(props.type==2?(props.feed.feed.feed.pollVotedStudents.includes(`,${props.userInfo.id},`)?(false):(true)):(true)))
    const [focusedOptionIndex, setFocusedOption] = useState(-1)

    const setFocusedOptionIndex=(focusedOptionIndex)=>
    {
        this.setFocusedOption(focusedOptionIndex)
    }

  
    
    return (
            <div className="card justify-content-center" >
                <div className="card-body align-items-center">
                <FeedTop feed={feed} />
                    <div className="ml-md-4 flex-grow-1 pt-3">
                        <div className="mb-md-0 mb-3">
                            <h5>{feed.feed.feed.pollQuestion}</h5>
                            {optionData.map((row, index) => (
                                <PollFeedRow row={row} totalPollVotes={totalPollVotes}  setFocusedOptionIndex={setFocusedOptionIndex}  canUserVote={false} index={index} userType={1}/>
                            ))}
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
    )
}

export default PollFeed;
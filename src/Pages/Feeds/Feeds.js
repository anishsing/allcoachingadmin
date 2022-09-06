import React from 'react'
import { useState, useEffect } from 'react'
import ImageFeed from './imageFeed';
import PollFeed from './pollFeed';
import TextFeed from './textFeed';
import { fetch_feeds, fetch_comments, fetch_feedById } from '../../api/feed'
import { dataLimit } from '../..';
import { Image, Shimmer } from 'react-shimmer' 
import { useParams } from 'react-router';

const Feeds = props => {
    const [feeds, setFeeds] = useState([])
    const [offset, setOffset] = useState(0);
    const [showLoader, setShowLoader] = useState(true)
    const {feedId} = useParams()
    useEffect(() => {
       
       if(feedId)
       {
          
        fetch_feedById(feedId, feedCallback)
       }
        

    }, [feedId])

    const feedCallback = (response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data)
                setFeeds([data])
                setShowLoader(false)

            })
        }
    }

    

    return (
        <div style={{alignItems: 'center',justifyContent: 'center', }}>
          
        {showLoader ? (
            <Shimmer width={'100%'} height={40} />) :
            (

                <div style={{width: '60%'}}>
                    {feeds.map((feed, index) => { 
                         
                        switch (feed?.feed?.feed?.feedType) {
                            case 1:
                            case "1":
                                return (<ImageFeed feed={feed} />)
                            case 2:
                            case "2":
                                return (<PollFeed feed={feed} type={1} />);
                            case 3:
                            case "3":
                                return (<TextFeed feed={feed} />);
                            default:
                                return (<Shimmer width={'100%'} height={40} />) 
                        } 
                    })}
                </div>
            )}
            </div>
    )
    
    
};



export default Feeds;
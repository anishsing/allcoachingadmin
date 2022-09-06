import React, { useState, useEffect }from 'react'
import { dataLimit } from '../../..'; 
import { fetchLeads, getLeadCount, getCourseCount } from '../../../api/leads';
import LeadsRow from './LeadsRow';
import {Image,  Shimmer } from 'react-shimmer'

function LeadsCount(props) {
    
    const {insId} = props;
    const [leadCount,setLeadCount] = useState('')
    const [courseCount, setCourseCount] = useState('')
    const [showShimmer, setShowShimmer] = useState(true)

    useEffect(() => {
        getLeadCount(insId, leadCountCallBack)
        getCourseCount(insId, courseCountCallBack)
    },[insId])
    
    const leadCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setLeadCount(data)
                setShowShimmer(false)
            })
        }
        else
        {
            console.log("Erroe", response.status)
        }
    }
    const courseCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setCourseCount(data)
            })
        }
        else
        {
            console.log("Error", response.status)
        }
    }

    return(
		<div className="row">
			<div className="col-12 col-lg-6">
				<div className="card radius-15">
					<div className="card-body">
						<div className="media align-items-center">
							<div className="media-body">
								<h4 className="mb-0 font-weight-bold">
                                    {showShimmer?(
                                        <Shimmer width={'15%'} height={40} />
                                    ):(leadCount)}
                                   
                                </h4>
								<p className="mb-0">Total Leads</p>
							</div>
							<div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-poll'></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-12 col-lg-6">
				<div className="card radius-15">
					<div className="card-body">
						<div className="media align-items-center">
							<div className="media-body">
								<h4 className="mb-0 font-weight-bold">
                                    {showShimmer?(
                                        <Shimmer width={'15%'} height={40} />
                                    ):(courseCount)}
                                </h4>
								<p className="mb-0">Total Courses</p>
							</div>
							<div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-detail'></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}
export default LeadsCount;
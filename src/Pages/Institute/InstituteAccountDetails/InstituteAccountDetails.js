import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { accountDetails } from '../../../api/institute';
import {Image,  Shimmer } from 'react-shimmer'

function InstituteAccountDetails(props) {

    const [data,setData] = useState({});
    const [showShimmer, setShowShimmer] = useState(true)


    const {insId} = props
    useEffect(() => { 
        console.log(insId)
        accountDetails(insId, detailsCallBack)
    },[insId])

    const detailsCallBack=(response)=>{
        console.log(response.status)
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log(data)
                setData(data)
                setShowShimmer(false)
            })
        }
    }
console.log(data)
    return (
        <div className="card radius-15 mt-3">
            <div className="card-body">
                <div className="col-12 col-lg-5">
                    <table className="table table-sm table-borderless mt-md-0 mt-3">
                        <tbody>
                            <tr>
                                <th>Account Holder Name:</th>
                                <td >
                                    {showShimmer?(
                                        <Shimmer width={200} height={20} />
                                    ):(
                                        data?.accountHolderName
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Account Number:</th>
                                <td >
                                    {showShimmer ?(
                                        <Shimmer width={'100%'} height={20} />
                                    ):(
                                       data?.accountNumber
                                    )}
                                    </td>
                            </tr>
                            <tr>
                                <th>IFSC Code:</th>
                                <td>
                                    {showShimmer?(
                                        <Shimmer width={'100%'} height={20} />
                                    ):(
                                      data?.ifsc  
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <th>Bank Name:</th>
                                <td>
                                    {showShimmer?(
                                        <Shimmer width={'100%'} height={20} />
                                    ):(
                                       data?.bankName 
                                    )}
                                    
                                </td>
                            </tr>
                            <tr>
                                <th>UPI Id:</th>
                                <td>
                                    {showShimmer?(
                                        <Shimmer width={'100%'} height={20} />
                                    ):(
                                       data?.upi 
                                    )}
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </div>
    )
}

export default InstituteAccountDetails

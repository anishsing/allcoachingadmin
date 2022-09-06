import React from 'react'

export default function TestSeries(props) {
    return (
        props.item?.data?(
            <>
            <div className="mt-4 shadow-lg rounded p-3 px-4">
                 
                 <div className="d-flex justify-content-between">
                     <p style={{marginBottom:10}}>
                         {props.item?.data?.questionCount} Questions
                     </p>
                     <p>
                         {props.item?.data?.timeDuration} Minutes
                     </p>
                 </div>
 
                 <div className="d-flex justify-content-between">
                     <h4 style={{marginBottom:10}}>
                         {props.item?.data?.title}
                     </h4 >
                     {/* <div className="">
                         <button className="btn btn-success">&nbsp;View</button>
                     </div> */}
                 </div>
 
             </div>
         </>

        ):(null)
       
    )
}

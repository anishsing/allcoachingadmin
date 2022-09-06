import React, { useState, useEffect } from 'react'
import {fetch_student_purchase} from '../../api/student'
import {dataLimit, serverBaseUrl} from '../../index'

    

export default function EnrolledCourses(props) {


    const [offset, setOffset] = useState(0)
    const [purchase, setPurchase] = useState([])
    const [showNextButton, setShowNextButton]=useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)

    const purchaseCallback =(response)=>{
        if(response.status==200){
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setPurchase(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    console.log("else")
                    console.log(data.length)
                    if(data.length==0) 
                    {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if(data.length!=0)
                    {     
                        setPurchase(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                console.log('getting purchage history...')
                setPurchase(data)
            })
        }
    }

    useEffect(()=>{
        fetch_student_purchase(props.userId, offset, dataLimit, purchaseCallback)
    },[offset])

    const nextPageHandler=()=>
    {
        if(!allDataLoaded)
        {
            setOffset(offset+1)
        }else {
            window.alert("No more data available")
        }
        
    }
    const prePageHandler=()=>
    {
        if(offset>0)
        {
            setOffset(offset-1)
        }
        else if(offset==0)
        {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)
        
    }



    return (
        <>
           <div className="mt-4">
                <h2>Enrollments Courses</h2>

                {purchase.map((row, i) => (
                    
                    <div className="row align-items-center justify-content-center mt-4 p-3 bg-light">
                        <div className="col-lg-5">
                            <div className="text-center">
                                <img src={serverBaseUrl+row.insImage} className="img-fluid" alt="" style={{maxHeight:200}}/>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <h4>{row.insName}</h4>
                            <div>
                                <button className="btn btn-outline-success">{row.courseName}</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div class="modal-footer">
            {offset>0?(

                <button type="button" class="btn btn-primary" onClick={()=>prePageHandler()}>Previous</button>
            ):(null)}
               {!allDataLoaded&&showNextButton?( 
                    <button type="button" class="btn btn-primary "  onClick={()=>nextPageHandler()}>Next</button>
               ):(null)}
                
            </div>
            </div> 
        </>
    )
}

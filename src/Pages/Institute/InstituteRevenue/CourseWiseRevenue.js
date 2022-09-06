import React, { useState, useEffect }from 'react'
import {getInsRevenueCourseData} from '../../../api/revenue'
import {fetch_courseTransactions} from '../../../api/transaction'
import {dataLimit} from '../../../index'

function CourseWiseRevenue(props) {
    const {insId} = props   
    const [courseData, setCourseData] = useState([]) 
    const [studentData, setStudentData] = useState([]) 
    const [offset, setOffset] = useState(0) 
    
    useEffect(() => {getInsRevenueCourseData(insId, getInsRevenueCourseDataCallBack)},[insId])

    const getInsRevenueCourseDataCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log("course rev data", data)
                setCourseData(data)
            })
        }
    }

    const fetch_courseTransactionsCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log("studentdata", data)
                setStudentData(data)
            })
        }
    }

    return(
        <div className="card">
          <div className="card-body">
            {courseData&&courseData.map((row, index) => (
              <div id="accordion1" class="accordion">
                  <div className="card-header collapsed" data-toggle="collapse" href={"#collapse"+index} onClick={()=>{fetch_courseTransactions(row.course.id, offset, dataLimit, fetch_courseTransactionsCallBack)}}>	
                      <a className="card-title">
                          {row.course.title}
                      </a>
                  </div>
                  <div id={"collapse"+index} className="card-body collapse" data-parent="#accordion1">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="card radius-15">
                          <div className="card-body">
                            <div className="media align-items-center">
                              <div className="media-body">
                                <h4 className="mb-0 font-weight-bold">{row.todayRevenue?(row.todayRevenue):(0)}</h4>
                                <p className="mb-0">Today's Revenue</p>
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
                                <h4 className="mb-0 font-weight-bold">{row.totalRevenue?(row.totalRevenue):(0)}</h4>
                                <p className="mb-0">Total Revenue</p>
                              </div>
                              <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-detail'></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered mb-0" id="table1">
                            <thead className="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Name</th>
                                    <th align="center">Mobile</th>
                                    <th align="center">Email</th>
                                    <th align="center">Status</th>
                                    <th align="center">Transaction Id</th>
                                </tr>
                            </thead>
                                {studentData&&studentData.map((item, i)=>(
                                  <tbody>
                                    <td>{i+1}</td>
                                    <td>{item.student.name}</td>
                                    <td>{item.student.mobileNumber}</td>
                                    <td>{item.student.email}</td>
                                    <td>{item.transaction.status}</td>
                                    <td>{item.transaction.gatewayTransactionId}</td>
                                  </tbody>
                                ))}
                        </table>
                    </div>

                  </div>
                </div>
            ))}
          </div>
        </div>
    )
}
export default CourseWiseRevenue

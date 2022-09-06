import React,{ useState, useEffect} from 'react'
import { getInsDataCategoryWise } from '../../api/dashboard'
import {Image,  Shimmer } from 'react-shimmer'
function CategoryData({row}) {
    const [showInsShimmer,setShowInsShimmer] = useState(false)
    const [insData,setInsData] = useState([])
    useEffect(() =>{

        setShowInsShimmer(true)
        getInsDataCategoryWise(row.category.id, getInsDataCategoryWiseCallBack)
    },[row])

    const getInsDataCategoryWiseCallBack=(response) => {
        if(response.status==200)
        {
          response.json().then(data =>{
            setShowInsShimmer(false)
            setInsData(data)
          })
        }
        else
        {
          console.log("insdataCategory", response.status)
        }
      }
  return (
    <>
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
                        <th align="center">Institute</th>
                        <th align="center">Today Revenue</th>
                        <th align="center">Total Revenue</th>
                    </tr>
                </thead>

                {showInsShimmer?(
                    <tbody>
                    <Shimmer width={'100%'} height={40} /> 
                    </tbody>
                ):(
                    insData&&insData.map((item, i)=>(
                        <tbody>
                        <td>{i+1}</td>
                        <td>{item.institute.name}</td>
                        <td>{item.todayRevenue?(item.todayRevenue):(0)}</td>
                        <td>{item.totalRevenue?(item.totalRevenue):(0)}</td>
                        </tbody>
                    ))
                )} 
            </table>
        </div>
    </>
  )
}

export default CategoryData
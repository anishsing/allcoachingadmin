import React, { useState, useEffect }from 'react'
import {fetch_categories} from '../../api/institute'
import {Image,  Shimmer } from 'react-shimmer'
import { Link } from "react-router-dom"
import { findEnrolledStudentsByCategoryId, insCountCategoryWise, studentCountCategoryWise } from '../../api/analytics'
import { dataLimit } from '../../index'
import Chart from '../../components/charts/chart';
export default function CategoryList() {

    const [InstituteCategoryData, setInstituteCategory] = useState([]);
    const [offset, setOffset] = useState(0);
    const [studentData, setStudentData]= useState(0)
    const[icon, setIcon] = useState("")
    const [category, setCategory] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [showShimmer, setShowShimmer] = useState(true)
    const [insCountData, setInsCountData] = useState([])
    const [studentCountData, setStudentCountData] = useState([])
    const [loadingStudentCountData, setLoadingStudentCountData] = useState(true)
    const [loadingInsCountData, setLoadingInstituteCountData] = useState(true)
    

    const handleCatgoryCallback=(response)=>
    {
        if(response.status === 200)
        {
            response.json().then(data=>
            { 
                setCategory(data)
                setSelectedCategory(data[0].label)
                findEnrolledStudentsByCategoryId(data[0].key, offset, dataLimit, enrolledStudentCallBack)
            })
                
        }else
        {
            console.log("something went wrong")
        }
        
    }

    const insCountCallBack=(response,setBacks)=>{
        if(response.status === 200)
        {
            response.json().then(data=>{
                let label = []
                let dataValues=[];
                data.map(item=>{
                    label.push((item.x));
                    dataValues.push(item.y)
    
                })

                setBacks.setInsCountData({
                    labels: label,
                    datasets: [{ 
                        label: 'Institute',
                        data: dataValues,
                        backgroundColor: "#673ab7",
                        borderColor: "#673ab7",
                        pointRadius: "0",
                        borderWidth: 4,
                        barPercentage:0.5
                    }]
                })
            })
        }
    }

    const studentCountCallBack=(response,setBacks)=>{
        if(response.status === 200)
        {
            response.json().then(data=>{
                let label = []
                let dataValues=[];
                data.map(item=>{
                    label.push((item.x));
                    dataValues.push(item.y)
    
                })

                setBacks.setStudentCountData({
                    labels: label,
                    datasets: [{ 
                        label: 'Student',
                        data: dataValues,
                        backgroundColor: "#673ab7",
                        borderColor: "#673ab7",
                        pointRadius: "0",
                        borderWidth: 4,
                        barPercentage:0.5
                    }]
                })
            })
        }
    }


    useEffect(() =>{
        fetch_categories(handleCatgoryCallback)
        studentCountCategoryWise((response)=>studentCountCallBack(response,{setStudentCountData,setLoadingStudentCountData}))
        insCountCategoryWise((response)=>insCountCallBack(response,{setInsCountData,setLoadingInstituteCountData}))
    },[offset])

    
    const enrolledStudentCallBack=(response) =>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setStudentData(data)
                setShowShimmer(false)
            })
        }
    }

    const setSelectedCategoryData=(label, key)=>{
        setSelectedCategory(label)
        findEnrolledStudentsByCategoryId(key, offset, dataLimit, enrolledStudentCallBack)
    }
  
    return (
        <div>   
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Category Analytics</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                </div>
            </div>
            <div className="row">
            {/* left chart */}
            <div className="col-12 col-lg-6">
                <div className="card radius-15 overflow-hidden">
                    <div className="card-body"> 
                        <div>
                            <p className="mb-0 font-20 font-weight-bold">Institute v/s Category</p>  
                        </div>
                        <Chart height={300} chartType="bar" chart_counter={1} data={insCountData}  />
                    </div>
                </div>
            </div>
                {/* right chart */}
            <div className="col-12 col-lg-6">
                <div className="card radius-15 overflow-hidden">
                    <div className="card-body">
                    <div>
                            <p className="mb-0 font-20 font-weight-bold">Student vs Category</p>  
                        </div>
                        <Chart height={300} chartType="bar" chart_counter={2} data={studentCountData}  />
                    </div>
                </div>
            </div>
        </div>

            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Enrolled Students</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary">{selectedCategory}</button>
                        <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">	
                            {category&&category.map((row, i) => (
                                <a class="dropdown-item" href="javascript:;" onClick={()=>{setSelectedCategoryData(row.label, row.key)}}>{row.label}</a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered mb-0" id="table1">
                                <thead class="thead-dark">
                                    <tr>
                                        <th align="center">#</th>
                                        <th align="center">Student</th>
                                        <th align="center">Course</th>
                                        <th align="center">Institute</th>
                                        <th align="center">Email</th>
                                        <th align="center">Mobile</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {showShimmer?(
                                    <td colspan="4">
                                    <Shimmer width={'100%'} height={40} /> 
                                    </td>
                                ):(
                                <> 
                                        {studentData&&studentData.map((row, index) => (
                                            <tr>
                                                <td align="center">
                                                    {index+1}
                                                </td>
                                                <td align="center">
                                                    {row.student.name}
                                                </td>
                                                <td align="center">
                                                    {row.course.title}
                                                </td>
                                                <td align="center">
                                                    {row.institute.name}
                                                </td>
                                                <td align="center">
                                                    {row.student.email}
                                                </td>
                                                <td align="center">
                                                    {row.student.mobileNumber}
                                                </td>
                                            </tr>
                                        ))}
                                </>

                                )}
                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </div>
    )
}

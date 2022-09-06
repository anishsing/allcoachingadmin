import React, { useEffect, useState } from 'react';
  
import { Route, Link, HashRouter as Router } from 'react-router-dom'  
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Institute from '../../Pages/Institute/Institute';
import CourseRevenueAnalytics from '../../Pages/Institute/InstituteRevenue/CourseRevenueAnalytics';

import Leads from '../../Pages/Analytics/Leads';
import Revenue from '../../Pages/Analytics/Revenue';

import Banner from '../../Pages/Banner/Banner'; 
 
import ClipLoader from "react-spinners/ClipLoader";
import Student from '../../Pages/Student/Student';
import StudentView from '../../Pages/Student/StudentView'
import Blog from '../../Pages/Blog/Blog';
// import AddEditBlog from '../../Pages/Blog/AddEditBlog';
import TestSeriesCategory from '../../Pages/TestSeries/TestSeriesCategory';
import TestSeriesSubCategory from '../../Pages/TestSeries/TestSeriesSubCategory';
import CategoryContent from '../../Pages/TestSeries/CategoryContent';
import SeriesList from '../../Pages/TestSeries/SeriesList';
import TestSeriesAddEdit from '../../Pages/TestSeries/TestSeriesAddEdit';

import md5 from 'md5';
import AddEditBlog from '../../Pages/Blog/AddEditBlog';
import Notification from '../../Pages/Notification/Notification'

import CsvParser from '../csvparser/csvparser';
import InstituteCategory from '../../Pages/Institute/InstituteCategory';
import InstituteView from '../../Pages/Institute/InstituteView';
import CourseView from '../../Pages/Institute/CourseView/CourseView';
import Transactions from '../../Pages/Transactions/Transactions';
import CategoryList from '../../Pages/CategoryAnalytics/CategoryList';
import Pdfparser from '../../Pages/TestSeries/PdfParser/Pdfparser';
import PdfViewer from '../../Pages/PdfViewer/PdfViewer';
import StudentMessages from '../../Pages/StudentMessages/StudentMessages';
import Feeds from '../../Pages/Feeds/Feeds';
import FeedReports from '../../Pages/Feeds/FeedReports';
import AdminConfig from '../../Pages/AdminConfig/AdminConfig';
import Header from '../header/header';

import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Login from '../Login/Login';
import { SET_AUTH_STATUS } from '../../Reducers/types';
import ContactUs from '../../Pages/ContactUs/ContactUs';
const routerSwitch = (authStatus)=>
{
  return(
      <>
          
        <Route exact path="/" component={Login} /> 
        <PrivateRoute authStatus={authStatus} path="/institute/:type/type"
          render={(props)=>(
            <>
              <Header/>
              <Institute {...props}/>
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} path="/csv" 
          render={(props)=>(
            <>
              <Header/>
              <CsvParser {...props}/>
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} path="/instituteCategory" 
          render={(props)=>(
            <>
              <Header/>
              <InstituteCategory {...props}/>
              {/* <Student /> */}
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} exact path="/analytics/revenue/ins/:insId/insId" 
            render={(props)=>(
              <>
                <Header/>
                <CourseRevenueAnalytics {...props}/>
              </>
              )} 
        />    
        <PrivateRoute authStatus={authStatus} exact path="/analytics/lead"   
          render={(props)=>(
            <>
              <Header/>
              <Leads {...props}/>
            </>
            )} 
        /> 
        <PrivateRoute authStatus={authStatus} exact path="/analytics/revenue"  
          render={(props)=>(
            <>
              <Header/>
              <Revenue {...props}/>
            </>
            )} 
        /> 
        <PrivateRoute authStatus={authStatus} exact path="/student" render={(props)=>(
          <>
            <Header/>
            <Student {...props}/>
          </>
          )} />
        
        <PrivateRoute authStatus={authStatus} path="/studentView/:id/studentId" render={(props) => (
                <>
                    <Header/>
                  <StudentView  {...props}/>
                </>
              )}>
        </PrivateRoute>  
        <PrivateRoute authStatus={authStatus} exact path="/blog" 
          render={(props)=>(
            <>
              <Header/>
              <Blog {...props}/>
            </>
            )} 
        /> 
        <PrivateRoute authStatus={authStatus} exact path="/addeditblog/:blogId/blogId"  
          render={(props)=>(
            <>
              <Header/>
              <AddEditBlog {...props}/>
            </>
            )} 
        />   
        <PrivateRoute authStatus={authStatus} exact path="/banner/:type/type"
          render={(props)=>(
            <>
              <Header/>
              <Banner {...props}/>
            </>
            )} 
        />   
        <PrivateRoute authStatus={authStatus} exact path="/studentMessages/:messageType/:replied/status" 
          render={(props)=>(
            <>
              <Header/>
              <StudentMessages {...props}/>
            </>
            )} 
        
        />   
        <PrivateRoute authStatus={authStatus} exact path="/category/notification" 
            render={(props)=>(
              <>
                <Header/>
                <Notification {...props}/>
              </>
              )} 
        
        />   
        <PrivateRoute authStatus={authStatus} exact path="/insview/:id/id" 
            render={(props)=>(
              <>
                <Header/>
                <InstituteView {...props}/>
              </>
              )} 
        
        /> 
        <PrivateRoute authStatus={authStatus} exact path="/testSeriesCategory"
          render={(props)=>(
            <>
              <Header/>
              <TestSeriesCategory {...props}/>
            </>
            )} 
        
        />    
        <PrivateRoute authStatus={authStatus} exact path="/testSeriesSubCategory/:id/:name/name" 
          render={(props)=>(
            <>
              <Header/>
              <TestSeriesSubCategory {...props}/>
            </>
            )} 
        />    
        <PrivateRoute authStatus={authStatus} exact path="/categoryContent/:id/:name"
          render={(props)=>(
            <>
              <Header/>
              <CategoryContent {...props}/>
            </>
            )} 
        />    
        <PrivateRoute authStatus={authStatus} exact path="/seriesList/:id/:name/name"  
          render={(props)=>(
            <>
              <Header/>
              <SeriesList {...props}/>
            </>
            )} 
        
        />    
        <PrivateRoute authStatus={authStatus} exact path="/contactus"  
          render={(props)=>(
            <>
              <Header/>
              <ContactUs {...props}/>
            </>
            )} 
        
        />    
        <PrivateRoute authStatus={authStatus} exact path="/addTestSeries/:id/:type/:seriesId/:name/name" 
          render={(props)=>(
            <>
              <Header/>
              <TestSeriesAddEdit {...props}/>
            </>
            )} 
        />     
        <PrivateRoute authStatus={authStatus} exact path="/ins/course/:id/courseId"
          render={(props)=>(
            <>
              <Header/>
              <CourseView {...props}/>
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} exact path="/transactions/:status/status" 
          render={(props)=>(
            <>
              <Header/>
              <Transactions {...props}/>
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} exact path="/category/analytics/list"
          render={(props)=>(
            <>
              <Header/>
              <CategoryList {...props}/>
            </>
            )} 
        />
        <PrivateRoute authStatus={authStatus} exact path="/pdfrender"
            render={(props)=>(
              <>
                <Header/>
                <Pdfparser {...props}/>
              </>
              )} 
        /> 
        <PrivateRoute authStatus={authStatus} exact path="/feed/:feedId/feedId" 
        
        render={(props)=>(
          <>
            <Header/>
            <Feeds {...props}/>
          </>
          )} 
        />
        <PrivateRoute authStatus={authStatus} exact path="/feedReports" 
          render={(props)=>(
            <>
              <Header/>
              <FeedReports {...props}/>
            </>
            )} 
        />  
        <PrivateRoute authStatus={authStatus} exact path="/config"  
          render={(props)=>(
            <>
              <Header/>
              <AdminConfig {...props}/>
            </>
            )} 
        />  
        <PrivateRoute authStatus={authStatus} exact path="/dashboard"  
          render={(props)=>(
            <>
              <Header/>
              <Dashboard {...props}/>
            </>
            )} 
        />   
 
      </>
         
  )
}

const PrivateRoute  = ({render: Component, authStatus,...rest}) => {
  
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        authStatus ?
            <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};
const Routes = props => {
  const authStatus  = useSelector(state=>state.user.authStatus)

    const [loader,setLoader] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        const accessToken = window.sessionStorage.getItem("accessToken");
        if(accessToken)
        {
          if(accessToken==md5("admin@gmail.com12345"))
          {
            dispatch({ type: SET_AUTH_STATUS,payload:{authStatus: true}})  
          }
          setLoader(false)
        }else
        {
          setLoader(false)
        }
    },[])


    return  (


      loader?(
        <div style={{display: 'flex',height:'100vh',flex:1,alignItems:"center",justifyContent:"center"}}> 
        <ClipLoader color={"#673ab7"} loading={loader}   size={50} />
       
    </div>
      ):(

        authStatus?(
          <div className="page-wrapper">
              <div className="page-content-wrapper">
                  <div className="page-content">
                      {routerSwitch(authStatus)}
                  </div>
              </div>
          </div> 
      ):(
        routerSwitch(authStatus)
      )
      )
     
                
    );
};

 

export default  Routes ;
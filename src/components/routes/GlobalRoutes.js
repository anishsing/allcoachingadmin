import React from 'react';
  
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Institute from '../../Pages/Institute/Institute';
import CourseRevenueAnalytics from '../../Pages/Institute/InstituteRevenue/CourseRevenueAnalytics';

import Leads from '../../Pages/Analytics/Leads';
import Revenue from '../../Pages/Analytics/Revenue';

import Banner from '../../Pages/Banner/Banner'; 
 
import Student from '../../Pages/Student/Student';
import StudentView from '../../Pages/Student/StudentView'
import Blog from '../../Pages/Blog/Blog';
// import AddEditBlog from '../../Pages/Blog/AddEditBlog';
import TestSeriesCategory from '../../Pages/TestSeries/TestSeriesCategory';
import TestSeriesSubCategory from '../../Pages/TestSeries/TestSeriesSubCategory';
import CategoryContent from '../../Pages/TestSeries/CategoryContent';
import SeriesList from '../../Pages/TestSeries/SeriesList';
import TestSeriesAddEdit from '../../Pages/TestSeries/TestSeriesAddEdit';

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
import Routes from './routes'
import Footer from '../footer/footer';
import Header from '../header/header';
import LeftNav from '../leftnav/lefnav'; 
import { useSelector } from 'react-redux';
 



const DashboardLayout = ()=>{
    const authStatus = useSelector(state=>state.user.authStatus)

    return ( 
    <div className="wrapper">
      {authStatus?(
        <LeftNav/>
      ):(null)}
    
    {/* <Header/> */}
    <Routes/>
    {authStatus?(
        <Footer/>
      ):(null)}
    
  </div>
  )
}
 
 

export default  DashboardLayout ;
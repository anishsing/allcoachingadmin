
import React, { useEffect } from 'react';

import { Link } from "react-router-dom"

const LeftNav = () => {
  
  return(
  <>
    {/* Hello world */}
    <div className="sidebar-wrapper" data-simplebar="true">
      <div className="sidebar-header">
        <div className>
            <img src="/assets/images/icon.png" className="logo-icon-2"  alt />
          </div>
          <div>
            <h6 className="logo-text"  style={{fontSize:25,color:"#9A9A9A",fontFamily: 'Raleway',fontWeight:"bold",marginRight:5,marginLeft: 5}}>
              {/* <img src="/assets/images/logo-icon.png" className="logo-icon-2" style={{width:"90%"}} alt /> */}
              Allcoaching
            </h6>
          </div>
          <a href="javascript:;" className="toggle-btn ml-auto">
            {" "}
            <i className="bx bx-menu" />
          </a>
      </div>
      {/*navigation*/}
      <ul className="metismenu" id="menu">

        <li>
          <Link to={"/"}>
            <div className="parent-icon icon-color-5">
              <i className="lni lni-layers" />
            </div>
            <div className="menu-title">Dashboard</div>
          </Link>

        </li>
        <li>
          <Link to={"/config"}>
            <div className="parent-icon icon-color-3">
              <i className="bx bx-box" />
            </div>
            <div className="menu-title">Config</div>
          </Link>

        </li>

        <li>
          <a href="javascript:;" className="has-arrow">
            <div className="parent-icon icon-color-1">
              <i className="bx bx-buildings" />
            </div>
            <div className="menu-title">Institute</div>
          </a>
          <ul>
            <li>
              {" "}
              <Link to={"/institute/-1/type"}>
                <i className="bx bx-right-arrow-alt" />
                All
              </Link>
            </li>
            {/* <li>
              {" "}
              <Link to={"/institute/1"}>
                <i className="bx bx-right-arrow-alt" />
                All
              </Link>
            </li> */}
            <li>
              {" "}
              <Link to={"/institute/0/type"}>
                <i className="bx bx-right-arrow-alt" />
                Unapproved
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/institute/2/type"}>
                <i className="bx bx-right-arrow-alt" />
                Blocked
              </Link>
            </li>

            <li>
              {" "}
              <Link to={"/institute/5/type"}>
                <i className="bx bx-right-arrow-alt" />
                Deleted
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to={"/InstituteCategory"}>
            <div className="parent-icon icon-color-5">
              <i className="bx bx-sitemap" />
            </div>
            <div className="menu-title">Institute Category</div>
          </Link>

        </li>

        <li>
          <Link to={"/student"}>
            <div className="parent-icon icon-color-3">
              <i className="bx bx-user" />
            </div>
            <div className="menu-title">Student</div>
          </Link>

        </li>

        {/* <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-3">
                <i className="bx bx-user" />
              </div>
              <div className="menu-title">Student</div>
            </a>
            <ul>
              <li>
                {" "}
                <Link to={"/student/"}>
                  <i className="bx bx-right-arrow-alt" />
                  All Students
                </Link>
              </li>
            </ul>
          </li> */}

        <li>
          <Link to={"/blog"}>
            <div className="parent-icon icon-color-4">
              <i className="lni lni-write" />
            </div>
            <div className="menu-title">Blog</div>
          </Link>

        </li>
        {/* <li>
            <a href="javascript:;" className="has-arrow">
              <div className="parent-icon icon-color-1">
                <i className="bx bx-home-alt" />
              </div>
              <div className="menu-title">Analytics</div>
            </a>
            <ul>
              <li>
                {" "}
                <Link to={"/analytics/revenue"}>
                  <i className="bx bx-right-arrow-alt" />
                  Revenue
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/analytics/lead"}>
                  <i className="bx bx-right-arrow-alt" />
                   Leads
                </Link>
              </li>
               
            </ul>
          </li> */}



        <li>
          <a href="javascript:;" className="has-arrow">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-image-alt" />
            </div>
            <div className="menu-title">Banner</div>
          </a>
          <ul>
            <li>
              {" "}
              <Link to={"/banner/home1/type"}>
                <i className="bx bx-right-arrow-alt" />
                Home Top
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/banner/home2/type"}>
                <i className="bx bx-right-arrow-alt" />
                Home Bottom
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/banner/test/type"}>
                <i className="bx bx-right-arrow-alt" />
                Test Series
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript:;" className="has-arrow">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-conversation" />
            </div>
            <div className="menu-title">Student Messages</div>
          </a>
          <ul>
            <li>
              {" "}
              <Link to={"/studentMessages/helpAndSupport/true/status"}>
                <i className="bx bx-right-arrow-alt" />
                All Help and Support Messages
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/studentMessages/helpAndSupport/false/status"}>
                <i className="bx bx-right-arrow-alt" />
                UnReplied Help and Support Messages
              </Link>
            </li>
            <li>
              {" "}
              <Link to={"/studentMessages/feedback/true/status"}>
                <i className="bx bx-right-arrow-alt" />
                All FeedBacks
              </Link>
            </li>
             <li>
              {" "}
              <Link to={"/studentMessages/feedback/false/status"}>
                <i className="bx bx-right-arrow-alt" />
                UnReplied FeedBacks
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/testSeriesCategory">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-spreadsheet" />
            </div>
            <div className="menu-title">Test Series</div>
          </Link>
        </li>
        <li>
          <Link to="/category/notification">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-mail-send" />
            </div>
            <div className="menu-title">Send Notifications</div>
          </Link>
        </li>
        <li>
          <Link to="/transactions/-1/status">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-dollar-circle" />
            </div>
            <div className="menu-title">Transactions</div>
          </Link>
        </li>
        <li>
          <Link to="/category/analytics/list">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-stats" />
            </div>
            <div className="menu-title">Category Analytics</div>
          </Link>
        </li>
        
        <li>
          <Link to="/feedReports">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-info-square" />
            </div>
            <div className="menu-title">Feed Report</div>
          </Link>
        </li>
        <li>
          <Link to="/contactUs">
            <div className="parent-icon icon-color-2">
              <i className="bx bx-phone" />
            </div>
            <div className="menu-title">Contact Us</div>
          </Link>
        </li>

        

      </ul>
   
    </div>
  </>
)}

export default LeftNav

import React, { useEffect, useState } from 'react';
import { fetch_report, getUnSeenReportCount } from '../../api/feedReport';
import { fetch_messages, getUnSeenMessagesCount } from '../../api/message';
import { fetch_allSuccessTransactions, fetch_allTransactions, getUnSeenTransactionsCount } from '../../api/transaction';
import HeaderMessages from './HeaderMessages';
import SingleMessageNotification from './SingleMessageNotification';
import SingleNotification from './SingleNotification';
import SingleNotificationFeedReport from './SingleNotificationFeedReport';
import useStateRef from 'react-usestateref'

const Header = () => 
 { 


  const [transactions,setTransactions,transactionsRef] = useStateRef([])
  const [transactionCount,setTransactionsCount,transactionCountRef] = useStateRef(0)

  const [messages,setMessages] = useState([])
  const [messageCount,setMessageCount] = useState(0)

  const [feedReportCount,setFeedReportCount] = useState(0)
  const [feedReports ,setFeedReports] = useState([])

  const [fetchedTransactions,setFetchedTransactions] = useState(false);
  const [fetchedReports,setFetchedReports] = useState(false);

  const [transactionsVisible,setTransactionsVisible] = useState(false);
  
  useEffect(() =>{



    //getting messages data from database


    getUnSeenMessagesCount(true,(response) => {

      if(response.status==200)
      {
        response.json().then(data => {
          console.log(data);
          setMessageCount(data)
        })
      }
    })
    fetch_messages(true,"all",0,20,(response) =>{

      if(response.status == 200)
      {
        response.json().then(data=>{
          setMessages(data)
          console.log(data)
        })
      }
    })

    //Getting transaction data from database
    //transactions count which are not seen by admin
    getUnSeenTransactionsCount((response)=>{

      if(response.status == 200)
      {
        response.json().then(data=>{
          setTransactionsCount(transactionCountRef.current + data)
        })
      }
    })

    //geting first 20 transaction to diplay as notification
    fetch_allSuccessTransactions(0,20,(response)=>{
      if(response.status == 200)
      {
          response.json().then(data=>{  
            setTransactions([...data,...transactionsRef.current])
            setFetchedTransactions(true)
          })
      }
    })


    //getting feedReport

    getUnSeenReportCount((response)=>{
      response.json().then(data=>{
        setTransactionsCount(transactionCountRef.current + data)
      })
    })

    fetch_report(0,20,(response)=>{
      if(response.status == 200)
      {
          response.json().then(data=>{  
            setTransactions([...data,...transactionsRef.current])
            console.log(data)
            setFetchedReports(true)
          })
      }
    })

  },[])




  useEffect(()=>{ 
    if(transactions.length&&fetchedTransactions&&fetchedReports)
    {
      let trans = [...transactions]
      trans.sort((a, b) => {
        return (b?.transaction?.purchaseDate || b?.reportDate).localeCompare((a?.transaction?.purchaseDate  || a?.reportDate))
      })
      setTransactions(trans)
    }
  },[fetchedTransactions,fetchedReports])


  const $ = window.$
  useEffect(()=>{ 

    $(".toggle-btn").unbind("click")
    $(".toggle-btn-mobile").unbind("click")
    $(function () {
      $('.metismenu-card').metisMenu({
        toggle: false,
        triggerElement: '.card-header',
        parentTrigger: '.card',
        subMenu: '.card-body'
      });
    });
    // Metishmenu card collapse
    $(function () {
      $('.card-collapse').metisMenu({
        toggle: false,
        triggerElement: '.card-header',
        parentTrigger: '.card',
        subMenu: '.card-body'
      });
    
    // toggle menu button
      $(".toggle-btn").click(function () {
          console.log("sdb ",$(".wrapper").hasClass("toggled"))
        if ($(".wrapper").hasClass("toggled")) {
          // unpin sidebar when hovered
          $(".wrapper").removeClass("toggled");
          $(".sidebar-wrapper").unbind("hover");
          console.log("removed toggled")
        } else {
          $(".wrapper").addClass("toggled");
          console.log("added toggled")
          $(".sidebar-wrapper").hover(function () {
            $(".wrapper").addClass("sidebar-hovered");
          }, function () {
            $(".wrapper").removeClass("sidebar-hovered");
          })
        }
      });
  });
    $(".toggle-btn-mobile").on("click", function () {
      $(".wrapper").removeClass("toggled");
    });

    // metismenu
    $(function () {
      $('#menu').metisMenu(); 
      console.log("dfkbh" , $('#menu'))
    });


    $(function () {
      for (var i = window.location, o = $(".metismenu li a").filter(function () {
        return this.href == i;
      }).addClass("").parent().addClass("mm-active");;) {
        if (!o.is("li")) break;
        o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
      }
    })
    
  },[])



  return (
    <header className="top-header">
      <nav className="navbar navbar-expand">
        <div className="left-topbar d-flex align-items-center">
          <a href="javascript:;" className="toggle-btn">
            {" "}
            <i className="bx bx-menu" />
          </a>
        </div>
        {/* <div className="flex-grow-1 search-bar">
          <div className="input-group">
            <div className="input-group-prepend search-arrow-back">
              <button className="btn btn-search-back" type="button">
                <i className="bx bx-arrow-back" />
              </button>
            </div>
            <input type="text" className="form-control" placeholder="search" />
            <div className="input-group-append">
              <button className="btn btn-search" type="button">
                <i className="lni lni-search-alt" />
              </button>
            </div>
          </div>
        </div> */}
        <div className="right-topbar ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item search-btn-mobile">
              <a className="nav-link position-relative" href="javascript:;">
                {" "}
                <i className="bx bx-search vertical-align-middle" />
              </a>
            </li>
            <li className="nav-item dropdown dropdown-lg">
              <HeaderMessages
                messages={messages}
                messageCount={messageCount}
              />
            </li>
            <li className="nav-item dropdown dropdown-lg">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                href="javascript:;"
                data-toggle="dropdown"
                // onClick={()=>setTransactionsVisible(true)}
              >
                {" "}
                <i className="bx bx-bell vertical-align-middle" />
                {transactionCount>0?(
                  <span className="msg-count">{transactionCount}</span>
                ):(null)}
                
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="javascript:;">
                  <div className="msg-header">
                    <h6 className="msg-header-title">{transactionCount} New</h6>
                    <p className="msg-header-subtitle">
                      Transaction & Feed Notifications
                    </p>
                  </div>
                </a>
                <div className="header-notifications-list" style={{overflowY: 'scroll'}}>

                  {transactions.map(item=>(

                      item.transaction?(
                        <SingleNotification
                            item={item} 
                        />

                      ):(

                        <SingleNotificationFeedReport
                          item={item} 
                        />
                      )
                      

                  ))}

                   
                   
                </div>
                {/* <a href="javascript:;">
                  <div className="text-center msg-footer">
                    View All Notifications
                  </div>
                </a> */}
              </div>
            </li>
            
            <li className="nav-item dropdown dropdown-language">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                href="javascript:;"
                data-toggle="dropdown"
              >
                <div className="lang d-flex">
                  <div>
                    <i className="flag-icon flag-icon-in" />
                  </div>
                  <div>
                    <span>IN</span>
                  </div>
                </div>
              </a> 
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header  
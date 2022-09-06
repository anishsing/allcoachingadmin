import React, { useState, useEffect } from 'react'
import { dataLimit } from '../..';
import { fetch_allTransactions ,fetch_allTransactionsByStudentName} from '../../api/transaction';
import TransactionRow from './TransactionRow';
import { Image, Shimmer } from 'react-shimmer'
import ClipLoader from "react-spinners/ClipLoader";
function Transactions(props) {
    const [offset, setOffset] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [status, setStatus] = useState(-1)
    const [showShimmer, setShowShimmer] = useState(true)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [searchValue, setSearchValue] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [search,setSearch] = useState(false)
    useEffect(() => {
        if(searchValue=='')
        {
            fetch_allTransactions(offset, dataLimit, (response) => {

                if (response.status == 200) {
                    response.json().then(data => {
                        if (data.length == dataLimit) {
                            setTransactions(data)
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
                                setTransactions(data)
                            }
                            setShowNextButton(false)
                            setAllDataLoaded(true)
                        }
                        setTransactions(data)
                        setLoadingTransactions(false)
                        console.log(data)
                        setShowShimmer(false)
    
                    })
    
                }
            }, status)
        }
       
    }, [offset])

    useEffect(() => {

        if(searchValue!='' && search)
        {
            setSearch(false);
            action4Search()
        }
    },[offset,search])
    const action4Search = ()=>
    {
        setIsLoading(true);
        fetch_allTransactionsByStudentName(searchValue,offset, dataLimit, (response) => {

            if (response.status == 200) {
                response.json().then(data => {
                    if (data.length == dataLimit) {
                        setTransactions(data)
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
                            setTransactions(data)
                        }
                        setShowNextButton(false)
                        setAllDataLoaded(true)
                    }
                    setTransactions(data)
                    setLoadingTransactions(false)
                    console.log(data)
                    setShowShimmer(false)
                    setIsLoading(false)

                })

            }
        }, status)
    }
    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")
        }
        setSearch(true);
    }
    const prePageHandler = () => {
        if (offset > 0) {
            setOffset(offset - 1)
        }
        else if (offset == 0) {
            setOffset(0)
            setShowNextButton(true)
        }
        setSearch(true);
        setAllDataLoaded(false)
    }



    return (
        <div className="mt-3">
            <div class="table-responsive"> 
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-6 col-12 d-flex mb-4">
                        <input type="text" className="form-control mr-3" onChange={(e) => setSearchValue(e.target.value)} placeholder="Search " />
                        <div class="btn-group">
                            {isLoading ? (
                                <button type="button" class="btn btn-primary px-5">
                                    <ClipLoader color={"white"} size={18} />
                                </button>
                            ) : (
                                <button type="button" class="btn btn-primary" onClick={(e) => {setOffset(0);setSearch(true)}} >Search</button>
                            )}
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">OrderId</th>
                            <th align="center">Date</th>
                            <th align="center">Amount</th>
                            <th align="center">Student Name</th>
                            <th align="center">Student Mobile</th>

                            <th align="center">Course</th>
                            <th align="center">Institue</th>
                            <th align="center">Institue Email</th>
                            <th align="center">Status</th>
                            <th align="center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showShimmer ? (
                            <td colspan="11">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>
                                {transactions.map((row, i) => (
                                    <TransactionRow row={row} index={i} delTransaction={() => { }} />
                                ))}
                            </>
                        )}

                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                {offset > 0 ? (

                    <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                ) : (null)}
                {!allDataLoaded && showNextButton ? (
                    <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                ) : (null)}

            </div>
        </div>
    )
}

export default Transactions

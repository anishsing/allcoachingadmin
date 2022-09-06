import React, { useEffect, useState } from 'react';
import { getConfig, updateConfig } from '../../api/adminConfig';
import Snackbar from '@material-ui/core/Snackbar';

function AdminConfig() {
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const[config,setConfig] =  useState({})


    useEffect(() =>{ 
        getConfig((response) =>{
            if(response.status == 200)
            {
                response.json().then(data=>{ 
                    setConfig(data)
                })
            }
        })
    },[])

    const onChangeHandler = (e)=>
    {
        setConfig({...config,[e.target.name]:e.target.value})
    }

    const updateConfigBtnHandler=()=>
    {
        setLoading(true);
        updateConfig(config,response=>{
            if(response.status == 201)
            {
                    setSnackBarMessage("Updated Successfully")
            }else
            {
                setSnackBarMessage("Something went wrong")
            }

            setIsSnackBarShow(true);

            setLoading(false);
        })

    }
    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
  return (
    <div>   
            <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Admin Config</div>
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
            <div className="card">
                <div className="card-body"> 
                    <div class="form-group">
                        <label>Payment Commission:</label>
                        <input type="text" value={config.paymentCommission} name="paymentCommission" class="form-control" onChange={onChangeHandler}/>
                    </div>
                     
                    {loading?(
                        <button className="btn btn-dark" disabled>Processing...</button>
                    ):(
                        <button className="btn btn-dark" onClick={()=>updateConfigBtnHandler()}>Update</button>
                    )}
                    
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            /> 
    </div>
  );
}

export default AdminConfig;

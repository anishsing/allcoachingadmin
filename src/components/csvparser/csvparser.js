import React, { useState } from 'react';

import { CSVReader } from 'react-papaparse'

const CsvParser = props => { 
    const {callbackLoader,callbackQuestion,testSeriesId,errorsCallback} = props;
    const allowedHeaders=["Correct Marks","Question","Option A","Option B","Option C","Option D","Correct Option","Wrong Marks"];
    const handleOnDrop = (data) => {
        callbackLoader(true)
        console.log('---------------------------')
        console.log("parsed data",data)
        console.log('---------------------------')
        let questionArr = [];
        let errors =[]
        let headers = data.splice(0,1)[0].data
        console.log('headers',headers)
        // headers.map((item,index) => {
             
        //     if(!allowedHeaders.includes(item))
        //     {
        //          errors.push({message:"File formatting error: Column name '"+item+"' should be '"+allowedHeaders[index]+"', PLease Check Your File"})
        //     }
        // })
        // if(errors.length)
        // {
        //     // errorsCallback(errors)
        //     console.log(errors)
        //     return ;
        // }
        data.map(item =>{
            item = item['data']
            if(item[0]){
                let question = {
                    correctMarks:item[6],
                    question:item[0],
                    optionA:item[1],
                    optionB:item[2],
                    optionC:item[3],
                    optionD:item[4],
                    correctOpt:item[5],
                    wrongMarks:item[7],
                    questionType:1,
                    optionType:1,
                    testSeriesId: testSeriesId
                }
                questionArr.push(question);
            }
            
        })
        callbackQuestion(questionArr);
        callbackLoader(false)
        
        console.log("data questions wala ",questionArr)
      }
    
     const handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
        errorsCallback(err)
      }
    
    const  handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
      }
   return(
    <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton 
        removeButtonColor='#659cef'
        onRemoveFile={handleOnRemoveFile}
    >
        <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
   )
};
 
export default CsvParser 
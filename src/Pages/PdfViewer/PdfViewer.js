import React, { useState } from 'react';
import { useParams } from 'react-router';

// import { Document, Page } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "./pdf.css"
import LazyLoad from 'react-lazyload';

function PdfViewer() {
    const [loader,setLoader] = useState(true) 
    const {path,width,height} = useParams()
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setLoader(false)
  }

const nextPageHandler = () => {
    if(pageNumber<numPages-1) 
    {
        setPageNumber(pageNumber+1)
    }
}
const previousPageHandler = () => {
    if(pageNumber>1) 
    {
        setPageNumber(pageNumber-1)
    }
}
console.log(path)
  return (
    <div>
      <Document file={window.decodeURIComponent(path)} onLoadSuccess={onDocumentLoadSuccess}>
        {/* <Page width={width} height={height} pageNumber={pageNumber} /> */}
        {Array.apply(null, Array(numPages))
    .map((x, i)=>i+1)
    .map(page => (
        
            <Page pageNumber={page} width={width} height={height-10}/>
        
    ))}
      </Document>
      <div class="page-controls">
          <button disabled="" type="button" onClick={previousPageHandler} >‹</button>
          <span>{pageNumber} of {numPages}</span>
          <button type="button" onClick={nextPageHandler}>›</button>
      </div>
  </div>
  );
}

export default PdfViewer;

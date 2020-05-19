import React from 'react';



// Page Not Found component to display page not found message
const PageNotFound = (props) => {

  return (
    <div style={{minHeight: '400px', flexDirection: 'column'}} className="d-flex align-items-center justify-content-center">
      <i className="fa fa-exclamation-circle fa-4x"></i>
      <br />
      <h3>404, Page not found !</h3>
    </div>
  );
}


export default PageNotFound

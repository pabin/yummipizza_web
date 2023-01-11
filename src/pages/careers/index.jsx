import React from 'react';

const CareersPage = () => {

  const listingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 650,
    padding: 20,
  }

  const source = 'https://example.web.app/someid/slug';
  const iframeElem = '<iframe src="https://examplep/someid/slug" position="relative" width="100%" height="700" frameBorder="0"></iframe>';
  const renderIframe = () => {
    return {
      __html: iframeElem
    }
  }


  const iFrameStyle = {
    float: 'left',
    width: '100%',
    height :'700px',
    position: 'relative'
  }
  return (
    <div style={ listingStyle }>
      <iframe style={ iFrameStyle } title="Job Listing" src={source} height={"700"} width={"100%"} frameBorder="0" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" />
      {/* <div style={{ width: '100%' }} dangerouslySetInnerHTML={ renderIframe() } /> */}
    </div>
  )
}

export default CareersPage;

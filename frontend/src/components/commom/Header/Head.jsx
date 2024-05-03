import React from "react";
import "./../../../App.css";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,  
  WhatsappShareButton,

  FacebookIcon,
  LinkedinIcon, 
  TwitterIcon,
  WhatsappIcon,
} from "react-share";;

// Import the Indian flag image
import indianFlag from "./indian-flag.png";


const facebook = "https://www.npmjs.com/package/react-share";
const Head = () => {
  // Get today's date
  const today = new Date();

  // Format the date as desired
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <section className='head'>
        <div className='Date'>
          {/* Display "India" text */}
          <div className="country-flag">
            <h3 className="country">India</h3>
            {/* Display Indian flag */}
            <div className="flag-circle">
              <img className="flag" src={indianFlag} alt="Indian Flag" />
            </div>
          </div>
          {/* Display the date on the next line */}
          <h5>{formattedDate}</h5>
        </div>
        <div className='title'>
          <h1>NEWS EXPRESS</h1>
        </div>
        <div className='Social'>
          {/* Add social media icons or links here */}
          <FacebookShareButton url={facebook} >
          <FacebookIcon size={32} round={true} style={{ marginRight: '8px' }}/>
          </FacebookShareButton >

          <TwitterShareButton url={facebook} >
          <TwitterIcon size={32} round={true} style={{ marginRight: '8px' }}/>
          </TwitterShareButton >

          <LinkedinShareButton url={facebook} >
          <WhatsappIcon size={32} round={true} style={{ marginRight: '8px' }}/>
          </LinkedinShareButton>

          <LinkedinShareButton url={facebook} >
          <LinkedinIcon size={32} round={true} style={{ marginRight: '8px' }}/>
          </LinkedinShareButton>

        
        </div>
      </section>
    </>
  )
}

export default Head;

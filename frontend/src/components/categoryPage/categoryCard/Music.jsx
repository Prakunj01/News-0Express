import React from "react"
import "./music.css"
import { Link } from "react-router-dom"


const Music = ({ item }) => {
  return (
    <>
      <section className='music'>
       

        <div className='box content'>
          <Link to={`/SinglePage/${item._id}`}>

            <div className='items'>
              <div className='box shadow flexSB'>
                <div className='images'>
                  <div className='img'>
                    <img src={item.image && item.image.url} alt='' />
                  </div>
                  <div class='category category1'>
                    <span>{item.category}</span>
                  </div>
                </div>
                <div className='text'>
                  <h1 className='title'>{item.title.slice(0, 40)}...</h1>
                  <div className='date'>
                    <i class='fas fa-calendar-days'></i>
                    {/* <label>{time}</label> */}
                  </div>
                  <p className='desc'>{item.description.slice(0, 150)}...</p>
                  <div className='comment'>
                  </div>
                </div>
              </div>
            </div>

          </Link>
        </div>
      </section>
    </>
  )
}


export default Music



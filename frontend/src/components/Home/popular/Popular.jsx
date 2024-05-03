import "./Popular.css"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Heading from "../../commom/heading/Heading"
import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"



const Popular = () => {

  const [news, setNews] = useState([])

  const get_news = async () => {

    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/news",

      )
      setNews(data.news)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_news()
  }, [])

  // const topNews = news.slice(0, 4);
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  }
  return (
    <>
      <section className='popular'>
        <Heading title='Popular' />
        <div className='content'>
          <Slider {...settings}>
            {news.map((item) => {

              return (
                
                <div className='items'>
                   <Link to={`/SinglePage/${item._id}`}>
                  <div className='box shadow'>
                 
                    <div className='images row'>
                      <div className='img'>
                        <img src={item.image && item.image.url} alt='' />
                      </div>

                      <div class='category category1'>
                        <span>{item.category}</span>
                      </div>

                    </div>

                    <div className='text row'>
                      <h1 className='title'>{item.title.slice(0, 40)}...</h1>
                      <h1 className='title'>{item.description.slice(0, 20)}...</h1>

                      <div className='date'>
                        <i class='fas fa-calendar-days'></i>
                        <label>{item.updatedAt}</label>
                      </div>
                      
                    </div>
                   
                  </div>
                  </Link>
                </div>
               
              )
            })}
          </Slider>
        </div>
      </section>
    </>
  )
}

export default Popular

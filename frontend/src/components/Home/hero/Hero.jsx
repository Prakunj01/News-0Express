import React, { useState, useEffect } from "react"
import "./hero.css"
import Card from "./Card"
import axios from "axios";

const Hero = () => {

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

const topNews = news.slice(0, 4);


  return (
    <>
      <section className='hero'>
        <div className='container'>
          {topNews.map((item) => {
            return (
              <>
                <Card key={item.id} item={item} />
              </>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Hero

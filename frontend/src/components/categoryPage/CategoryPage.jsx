
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hero } from "../../dummyData";
import Side from "../Home/sideContent/side/Side";
import "../Home/style.css";
import "./categoryPageStyle.css";
import "../Home/sideContent/side/side.css";
import "./categoryCard/music.css"
import Music from "./categoryCard/Music"
import Heading from "../commom/heading/Heading"
import axios from "axios";

const CategoryPage = () => {

  const { category } = useParams();
  // const [item, setItem] = useState(null);
  const [news, setNews] = useState([])
  // console.log("category get :", category);

  const get_news = async () => {

    try {
        const { data } = await axios.get("http://localhost:5000/api/v1/news",
        )
        setNews(data.news)

    } catch (error) {
        console.log(error)
    }
}

// useEffect(() => {
   
// }, [])

  useEffect(() => {
    get_news()
    

  }, [category]);

  const item = news.filter(item => item.category === category)



  return (
    <>
      <main>

        <div className='container'>

          <section className='leftSideContent'>

          </section>

          <section className='mainContent'>

            <Heading title={category} />
            {item && item.length > 0 ? (
              item.map((element) => {
                return (
                  <>
                    <Music key={element.id} item={element} />
                  </>
                )
              })
            ) : (
              <h1>No Article Found!</h1>
            )}
          </section>

          <section className='sideContent'>
            <Side />
          </section>
        </div>
      </main>

    </>
  );
};

export default CategoryPage



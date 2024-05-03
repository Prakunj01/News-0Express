import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hero } from "../../dummyData";
import Side from "../Home/sideContent/side/Side";
import "../Home/style.css";
import "./singlepage.css";
import "../Home/sideContent/side/side.css";
import SinglePageSlider from "./slider/SinglePageSlider";
import axios from "axios"

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  console.log(id);

  // useEffect(() => {
  //   console.log("Hero array:", hero);
  //   console.log("ID parameter:", id);
  //   const item = hero.find((item) => item.id === parseInt(id));
  //   console.log("Found item:", item);
  //   window.scrollTo(0, 0);
  //   if (item) {
  //     setItem(item);
  //   }
  // }, [id]);
  const get_news_id = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/news/${id}`,
        { withCredentials: true }
      )
      console.log(data)
      setItem(data.news);
      // console.log(newsData.news)
      // console.log(newsData)
      // setNews(data.news)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_news_id()
  }, [])

  return (
    <>
      {item ? (
        <main>
          <SinglePageSlider />

          <div className='container'>

            <section className='sideContent'>
              {/* <Side /> */}
            </section>

            <section className='mainContent details'>
              <h1 className='title'>{item.title}</h1>

              {/* <div className='desctop'>
                {item.desc.map((val, index) => (
                  <React.Fragment key={index}>
                    <p>{val.para1}</p>
                    <p>{val.para2}</p>
                  </React.Fragment>
                ))}
              </div> */}



              <div className="Pageimage">
                <img src={item.image && item.image.url} alt='' />
                <div className='author'>
                  {/* <img src={item.authorImg} alt='' /> */}
                  <p> {item.autherName} on</p>
                  {/* <label>{item.time}</label> */}
                </div>
              </div>

                       <div className='desctop'>
              
                  <React.Fragment>
                    <p>{item.slug}</p>
                    <p>{item.description}</p>
                  </React.Fragment>
                
              </div>

              {/* {item.desc.map((val, index) => (
                <p key={index}>{val.para3}</p>
              ))}

              <div className='descbot'>
                {item.details.map((data, index) => (
                  <React.Fragment key={index}>
                    <h1>{data.title}</h1>
                    <p>{data.para1}</p>
                  </React.Fragment>
                ))}
              </div> */}

              {/* <div className='quote'>
                <i className='fa fa-quote-left'></i>
                {item.description.map((data, index) => (
                  <p key={index}>{data.quote}</p>
                ))}
              </div> */}

              {/* <div className='desctop'>
                {item.details.map((data, index) => (
                  <React.Fragment key={index}>
                    <p>{data.para2}</p>
                    <p>{data.para3}</p>
                  </React.Fragment>
                ))}
              </div> */}
            </section>
            <section className='sideContent'>
              <Side />
            </section>
          </div>
        </main>
      ) : (
        <h1>not found</h1>
      )}
    </>
  );
};

export default SinglePage;

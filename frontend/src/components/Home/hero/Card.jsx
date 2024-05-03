import React from "react"
import { Link } from "react-router-dom"

const Card = ({ item }) => {
  
  const formattedDate = item.updatedAt.toLocaleString();
  return (
    <>
      <div className='box'>
      <Link to={`/SinglePage/${item._id}`}>
        <div className='img'>
          <img src={item.image && item.image.url} alt='' />
        </div>

        <div className='text'>
          <span className='category'>{item.category}</span>
                   
          <h1 className='titleBg'>{item.title.slice(0, 20)}</h1>
         
          <div className='author flex'>
            <span>by {item.autherName}</span>
            <span>{formattedDate}</span>
          </div>

        </div>
        </Link>
      </div>
    </>
  )
}

export default Card

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import '../index.css';

import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { convert } from 'html-to-text'


const ListNews = () => {
 
  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const [news, setNews] = useState([])
  const [all_news, set_all_news] = useState([])

  const [parPage, setParPage] = useState(5)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);


  const get_news = async () => {

      try {
          const { data } = await axios.get("http://localhost:5000/api/v1/news", 
            { withCredentials: true }
          )
          set_all_news(data.news)
          setNews(data.news)
          console.log(data)

      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
      get_news()
  }, [])

  useEffect(() => {
      if (news.length > 0) {
          const calculate_page = Math.ceil(news.length / parPage)
          setPages(calculate_page)
      }
  }, [news, parPage])

  const type_filter = (e) => {
      if (e.target.value === 'All') {
          setNews(all_news)
          setPage(1)
          setParPage(5)
      } else {
          const tempNews = all_news.filter(n => n.category === e.target.value)
          setNews(tempNews)
          setPage(1)
          setParPage(5)
      }

  }

  const serach_news = (e) => {

      const tempNews = all_news.filter(n => n.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
      setNews(tempNews)
      setPage(1)
      setParPage(5)
  }

  const deleteNews = async () => {
      try {
          await axios.delete("http://localhost:5000/api/v1/news/delete/", 
            { withCredentials: true }
          );
          setNews(news.filter(n => n._id !== deleteConfirmation));
          setDeleteConfirmation(null); // Clear delete confirmation
          // Optionally, show a toast or some confirmation message here
      } catch (error) {
          console.log(error);
          // Handle error
      }
  };
  const handleDeleteConfirmation = (newsId) => {
      setDeleteConfirmation(newsId);
  };

  const handleCancelDelete = () => {
      setDeleteConfirmation(null);
  };

  // -------------------------------
  return (
    <div className="ml-28 "> 
            <div className='px-4 py-3 flex gap-x-3 mt-16'>
                <select onChange={type_filter} name="" className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' id="">
                    <option value="">---select type---</option>
                    <option value="Education">Education</option>
                    <option value="Press">Press</option>
                    <option value="Sport">Sport</option>
                    <option value="All">All</option>
                </select>
                <input onChange={serach_news} type="text" placeholder='search news' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' />
            </div>
            <div className='relative overflow-x-auto p-4'>
                <table className='w-full text-sm text-left text-slate-700'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th className='px-7 py-3'>No</th>
                            <th className='px-7 py-3'>Title</th>
                            <th className='px-7 py-3'>Image</th>
                            <th className='px-7 py-3'>Category</th>
                            <th className='px-7 py-3'>Description</th>
                            <th className='px-7 py-3'>Date</th>
                            <th className='px-7 py-3'>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            news.length > 0 && news.slice((page - 1) * parPage, page * parPage).map((n, i) => <tr key={i} className='bg-white border-b' >
                                <td className='px-6 py-4'>{i + 1}</td>
                                <td className='px-6 py-4'>{n.title.slice(0, 15)}...</td>
                                <td className='px-6 py-4'>
                                    <img className='w-[40px] h-[40px]' src={n.image && n.image.url} alt="News Image" />
                                </td>
                                
                                <td className='px-6 py-4'>{n.category}</td>
                                <td className='px-6 py-4'>{convert(n.description).slice(0, 15)}...</td>
                                <td className='px-6 py-4'>{n.date}</td>
                                {
                                deleteConfirmation && (
                                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white p-8 rounded shadow-md">
                                            <p className="mb-4">Are you sure you want to delete this news item?</p>
                                            <div className="flex justify-center items-center gap-4">
                                                <button onClick={deleteNews} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                                <button onClick={handleCancelDelete} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                                <td className='px-6 py-4'>
                                    <div className='flex justify-start items-center gap-x-4 text-white'>
                                        <Link className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'><FaEye /></Link>
                                        <Link to={`/dashboard/news/edit/${n._id}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                        {/* <div to={`/dashboard/news/delete/${n._id}`} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></div> */}
                                        <div onClick={() => handleDeleteConfirmation(n._id)} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer'><FaTrash /></div>
                                   
                                    </div>
                                    
                                </td>
                            </tr>)
                        }
                        

                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-end px-10 gap-x-3 text-slate-600'>
                <div className='flex gap-x-3 justify-center items-center'>
                    <p className='px-4 py-3 font-semibold text-sm'>News par Page</p>
                    <select value={parPage} onChange={(e) => {
                        setParPage(parseInt(e.target.value))
                        setPage(1)
                    }} name='category' id='category' className='px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10' >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <p className='px-6 py-3 font-semibold text-sm'>
                    {(page - 1) * parPage + 1}/{news.length} - of {pages}
                </p>
                <div className='flex items-center gap-x-3'>
                    <IoIosArrowBack onClick={() => {
                        if (page > 1) setPage(page - 1)
                    }} className='w-5 h-5 cursor-pointer' />
                    <IoIosArrowForward onClick={() => {
                        if (page < pages) setPage(page + 1)
                    }} className='w-5 h-5 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default ListNews;

import React, { useContext, useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import "../index.css";


const EditNews = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const categoryArray = ["Press", "Law", "Policies", "Education", "Agriculture", "Opinions", "Scheme", "Tech", "Event", "Sport", "Business"];



  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const { id } = useParams();

  const [newsData, setNewsData] = useState([]);



  const get_news_id = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/news/${id}`,
        { withCredentials: true }
      )
      console.log(data)
      setNewsData(data.news);
      console.log(newsData.news)
      // console.log(newsData)
      // setNews(data.news)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_news_id()
  }, [])



  const navigateTo = useNavigate();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [autherName, setAutherName] = useState('');
  const [category, setCategory] = useState('');


  const handleEditNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newsData.title);
      formData.append("slug", newsData.slug);
      formData.append("description", newsData.description);
      formData.append("autherName", newsData.autherName);
      formData.append("category", newsData.category);
      formData.append("image", image);

      await axios.put(
        `http://localhost:5000/api/v1/news/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setTitle("");
          setSlug("");
          setDescription("");
          setAutherName("");

        });
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error(error.response.data.message);
    }
  };


  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (newsData.image && newsData.image.url) {
      setPreviewUrl(newsData.image.url);
    }
  }, [newsData]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setPreviewUrl(imageUrl);
    }

  };

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">Edit News Article</h1>

        <form onSubmit={handleEditNews}>
          <div className="first-wrapper">

            <div>
              <img
                src={previewUrl}
                alt="Article Image"
              />
              <input type="file" onChange={handleImageChange} />
              <input type="hidden" name="old_image" value={image ? image.name : ''} />

            </div>

            <div>
              <input
                type="text"
                placeholder="Title"
                value={newsData.title || ''}
                onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Slug"
                value={newsData.slug || ''}
                onChange={(e) => setNewsData({ ...newsData, slug: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newsData.description || ''}
                onChange={(e) => setNewsData({ ...newsData, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Author Name"
                value={newsData.autherName || ''}
                onChange={(e) => setNewsData({ ...newsData, autherName: e.target.value })}
              />
              <select
                value={newsData.category || ''}
                onChange={(e) => setNewsData({ ...newsData, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categoryArray.map((depart, index) => (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                ))}
              </select>

              <button type="submit">Update Article</button>
            </div>
          </div>
        </form>

      </section>
    </section>
  );
};

export default EditNews;

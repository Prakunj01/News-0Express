import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import '../index.css';


const AddNews = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [description, setdescription] = useState("");
  const [autherName, setautherName] = useState("");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState("");
  const [imagePreview, setimagePreview] = useState("");



  const navigateTo = useNavigate();

  const categoryArray = ["Press", "Law", "Policies", "Education","Agriculture","Opinions","Scheme","Tech","Event","Sport","Business"];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setimagePreview(reader.result);
      setimage(file);
    };
  };

// ------------

// -----------

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("autherName", autherName);
      formData.append("category", category);
      formData.append("image", image);
      await axios
        .post("http://localhost:5000/api/v1/news/add", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          settitle("");
          setslug("");
          setdescription("");
          setautherName("");
         
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page">
      <section className="container add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo"/>
        <h1 className="form-title">Add a News Article</h1>
        <form onSubmit={handleAddNews}>

          <div className="first-wrapper">
            
          <div>
              <img
                src={
                  imagePreview ? `${imagePreview}` : "/Screenshot.png"
                }
                alt="Article Image"
              />
              <input type="file" onChange={handleAvatar} />
            </div>
            
            <div>

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="slug"
                value={slug}
                onChange={(e) => setslug(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />

             
          
              <input
                type="text"
                placeholder="autherName"
                value={autherName}
                onChange={(e) => setautherName(e.target.value)}
              />
   
              <select
                value={category}
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              >
                <option value="">Select Category</option>
                {categoryArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>

              
              <button type="submit">Add Article</button>

              
            </div>


           
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNews;

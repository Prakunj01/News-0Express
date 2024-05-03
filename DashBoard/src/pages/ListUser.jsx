import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";


const ListUser = () => {
  const [User, setUser] = useState([]);
  const { isAuthenticated } = useContext(Context);


  useEffect(() => {

    const fetchUser = async () => {

      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/admin/alluser",
          { withCredentials: true }
        )
        setUser(data.users);

      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])


  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const deleteNews = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/admin/user/${deleteConfirmation}`, { withCredentials: true });
      setUser(User.filter(element => element._id !== deleteConfirmation));
      setDeleteConfirmation(null); // Clear delete confirmation
      toast.success('User item deleted successfully'); // Show success toast
    } catch (error) {
      console.log(error);
      // Handle error
      toast.error('Failed to delete User'); // Show error toast
    }
  };

  const handleDeleteConfirmation = (userId) => {
    setDeleteConfirmation(userId);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="page doctors">
        <h1>User</h1>
        <div className="banner">

          {
            User && User.length > 0 ? (
              User.map((element) => {
                return (
                  <div className="card">

                    <h4><b>Name</b> : {element.name.toUpperCase()}</h4>
                    <div className="details">
                      <p>
                        Role: <span>{element.role}</span>
                      </p>
                      <p>
                        Email: <span>{element.email}</span>
                      </p>
                      <p>
                        Phone: <span>{element.phone}</span>
                      </p>

                      <button onClick={() => handleDeleteConfirmation(element._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Delete
                      </button>

                      {
                        deleteConfirmation && (
                          <div className="fixed inset-0 flex justify-center items-center z-50">
                            <div className="absolute inset-0 bg-gray-300 bg-opacity-100 backdrop-blur">
                            </div>
                            <div className="relative bg-white p-4 rounded shadow-md max-w-md">
                              <p className="mb-2">Are you sure you want to delete this USER?</p>
                              <div className="flex justify-center items-center gap-4">
                                <button onClick={deleteNews} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                <button onClick={handleCancelDelete} className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
                              </div>
                            </div>
                          </div>
                        )
                      }



                    </div>

                  </div>
                );
              })
            ) : (
              <h1>No Registered User Found!</h1>
            )}

        </div>
      </section>
    </>

  )
};

export default ListUser;

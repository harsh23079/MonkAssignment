"use client";

import React from "react";

import { useEffect, useState } from "react";
import { database } from "../firebase";

import { useNavigate } from "react-router-dom";

function FirebaseStorage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from Firebase on component mount
    const fetchData = async () => {
      try {
        const response = await database.ref("users").once("value");
        const data = response.val();
        if (data) {
          // Convert the data object into an array of users
          const usersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setUserData(usersArray);
          console.log(userData);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Show confirmation toast
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete this record?"
      );
      if (confirmDeletion) {
        // Remove the user data from Firebase by ID
        await database.ref("users").child(id).remove();
        // Update the state to remove the deleted user
        setUserData((prevUserData) =>
          prevUserData.filter((user) => user.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting user from Firebase:", error);

      // Show error notification
      alert("Failed to delete user!");
    }
  };

  return (
    <div className="m-10">
      <div className="flex flex-col items-center md:items-start md:p-2 gap-3">
        <div className="flex flex-col text-2xl  md:text-4xl font-bold mb-10 border-b-4  border-black dark:border-white">
          <h1>SEE ALL ENTRIES</h1>
        </div>

        <div className=" grid w-full   gap-10   lg:grid-cols-3 sm:grid-cols-2  ">
          {userData.map((user) => {
            return (
              <div className="border-2 shadow-inner border-black dark:border-white   grid">
                <div className="p-2">
                  <div className="  mb-2">
                    {user.profilePicture && (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="rounded-xl h-[100px] w-[100px] m-auto "
                      />
                    )}
                  </div>
                  <div className="card-body   bottom-20 sm:top- dark:text-white font-bold  text-center md:text-sm ">
                    <div className="text-justify mb-1">
                      <h1 className="text-sm">Name:- &nbsp;{user.name}</h1>
                      <h1 className="text-sm">Email:-&nbsp;{user.email}</h1>
                      <h1 className=" text-sm">
                        Phone No.:- &nbsp;{user.phoneNumber}
                      </h1>
                      <h1 className="text-sm">D.o.b:-&nbsp;{user.dob}</h1>
                    </div>

                    <div className=" justify-center gap-5 flex mt-5">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/edit/${user.id}`);
                        }}
                        className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FirebaseStorage;

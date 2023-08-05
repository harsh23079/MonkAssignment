"use client";

import React from "react";
// import Card from "../component/page";
import { useEffect, useState } from "react";
import { database } from "../firebase";
// import { useRouter } from "next/router";
import { useNavigate } from "react-router-dom";

function FirebaseStorage() {
  const history = useNavigate();
  // const router = useRouter();
  const handleDelete = (id) => {
    // Access the specific entry in the Firebase database using its id
    const entryRef = database.ref(`details/${id}`);

    // Remove the entry from the database
    entryRef
      .remove()
      .then(() => {
        console.log("Entry deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const handleEdit = (id) => {
    history(`/update/${id}`);
  };

  const [data, setData] = useState({});
  useEffect(() => {
    database.ref("details").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });
  }, []);
  return (
    <div className="m-10">
      <div className="flex flex-col items-center md:items-start md:p-2 gap-3">
        <div className="flex flex-col text-2xl  md:text-4xl font-bold">
          <h1>SEE ALL ENTRIES</h1>
        </div>

        <div className=" grid w-full   gap-10    lg:grid-cols-4 sm:grid-cols-2  ">
          {Object.keys(data).map((id, index) => {
            return (
              <div className="card  grid">
                {data[id].profilePic && (
                  <img
                    src={data[id].profilePic}
                    alt="Profile Pic"
                    className="rounded-xl h-[100px] w-[100px] m-10"
                  />
                )}
                <div className="card-body   bottom-20 sm:top- text-white font-bold  text-center md:text-sm ">
                  <div className="text-justify mb-1">
                    <h1 className="text-sm">Name:- &nbsp;{data[id].name}</h1>
                    <h1 className="text-sm">Email:-&nbsp;{data[id].email}</h1>
                    <h1 className=" text-sm">
                      Phone No.:- &nbsp;{data[id].phoneNumber}
                    </h1>
                    <h1 className="text-sm">
                      D.o.b:-&nbsp;{data[id].dateOfBirth}
                    </h1>
                  </div>

                  <div className=" justify-center gap-5 flex mt-5">
                    <button
                      onClick={() => handleDelete(id)}
                      className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(id)}
                      className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
                    >
                      Edit
                    </button>
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

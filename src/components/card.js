"use client";
import React from "react";

const Card = ({ props }) => {
  const { photo, title, name, proffesion } = props;
  const handleDelete = () => {
    // Handle delete functionality here
    console.log("Delete button clicked for:", name);
  };

  const handleEdit = () => {
    // Handle edit functionality here
    console.log("Edit button clicked for:", email);
  };
  // - [x] profile pic (save only firebase)
  // - [x] date of birth (using date picker)
  // - [x] email
  // - [x] phone number
  // - [x] name
  return (
    <div className="card  grid">
      <img src={photo} alt="someImage" height={700} width={300} />
      <div className="card-body   bottom-20 sm:top- text-white font-bold  text-center md:text-sm ">
        <div className="text-justify mb-1">
          <h1 className="text-sm">Name:- &nbsp;{name}</h1>
          <h1 className="text-sm">Email:-&nbsp;{proffesion}</h1>
          <h1 className=" text-sm">Phone No.:- &nbsp;{name}</h1>
          <h1 className="text-sm">D.o.b:-&nbsp;{proffesion}</h1>
        </div>

        <div className=" justify-center gap-5 flex ">
          <button
            onClick={handleDelete}
            className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="w-3/4  text-xl  sm:text-xs   md:text-sm bg-red-600  hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4  md:px-2 rounded-md  border-2 border-gray-300 "
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Card;

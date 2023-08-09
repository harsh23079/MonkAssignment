import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LocalStorage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(localData);
    console.log(userData);
  }, []);

  const handleDelete = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDeletion) {
      // Delete data from local storage and update the state
      console.log(id);
      const updatedLocalData = userData.filter((user) => user.id !== id);
      localStorage.setItem("userData", JSON.stringify(updatedLocalData));
      setUserData(updatedLocalData);

      // Show success notification
      alert("User deleted successfully!");
    }
  };

  return (
    <div className="m-10">
      <div className="flex flex-col items-center md:items-start md:p-2 gap-3">
        <div className="flex flex-col text-2xl  md:text-4xl font-bold">
          <h1>SEE ALL ENTRIES</h1>
        </div>

        <div className="grid w-full gap-10 lg:grid-cols-4 sm:grid-cols-2">
          {userData.map((user) => {
            return (
              <div className="card grid" key={user.id}>
                {user.profilePicure|| (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="rounded-xl h-[100px] w-[100px] m-10"
                  />
                )}
                <div className="card-body bottom-20 sm:top- dark:text-white font-bold text-center md:text-sm">
                  <div className="text-justify mb-1">
                    <h1 className="text-sm">Name:- &nbsp;{user.name}</h1>
                    <h1 className="text-sm">Email:-&nbsp;{user.email}</h1>
                    <h1 className="text-sm">
                      Phone No.:- &nbsp;{user.phoneNumber}
                    </h1>
                    <h1 className="text-sm">D.o.b:-&nbsp;{user.dob}</h1>
                  </div>

                  <div className="justify-center gap-5 flex mt-5">
                    <button
                      onClick={() => {
                        console.log("Delete button clicked for id:", user.id);
                        handleDelete(user.id);
                      }}
                      className="w-3/4 text-xl sm:text-xs md:text-sm bg-red-600 hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4 md:px-2 rounded-md border-2 border-gray-300"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/edit/${user.id}`);
                      }}
                      className="w-3/4 text-xl sm:text-xs md:text-sm bg-red-600 hover:bg-red-400 lg:py-2 py-2 sm:py-2 md:py-2 lg:px-4 md:px-2 rounded-md border-2 border-gray-300"
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

export default LocalStorage;

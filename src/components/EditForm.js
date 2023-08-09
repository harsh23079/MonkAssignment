import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { database, storage } from "../firebase";

const EditForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data for the specific user from local storage or database
    // Here, we'll first check local storage and then Firebase
    const localData = JSON.parse(localStorage.getItem("userData")) || [];
    const userToEditLocal = localData.find((user) => user.id === id);
    if (userToEditLocal) {
      setUser(userToEditLocal);
    } else {
      // Fetch user data from Firebase if not found in local storage
      const fetchUser = async () => {
        try {
          const snapshot = await database.ref(`users/${id}`).once("value");
          const userData = snapshot.val();
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error("Error fetching user data from Firebase:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (fieldName, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    // Read the selected profile picture file
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSave = async () => {
    try {
      // Update the profile picture in Firebase Storage (if a new profile picture is selected)
      if (profilePicture) {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`${id}/profilePicture`);
        await fileRef.put(profilePicture);
        const profilePictureURL = await fileRef.getDownloadURL();
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: profilePictureURL,
        }));
      }

      // Update data for the specific user in local storage or Firebase
      // Here, we'll check if the user exists in local storage and then update accordingly
      const localData = JSON.parse(localStorage.getItem("userData")) || [];
      const updatedLocalData = localData.map((userData) =>
        userData.id === user.id ? user : userData
      );
      localStorage.setItem("userData", JSON.stringify(updatedLocalData));

      // Update data in Firebase
      database.ref(`users/${id}`).update(user);
      console.log("Updated user:", user);

      // Show success notification
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className=" flex flex-col items-center gap-6 mt-10 mb-10">
      <div>
        {" "}
        <h2 className="text-3xl font-bold">You Can Edit Here</h2>
      </div>
      <div className=" flex flex-col gap-5">
        <div className=" flex flex-col">
          <label>Name:</label>
          <input
            className=" text-black p-2 border-4 rounded-xl  border-neutral-500"
            type="text"
            name="name"
            value={user?.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col ">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user?.phoneNumber || ""}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            className=" text-black p-2 border-4 rounded-xl border-neutral-500"
          />
        </div>
        <div className="flex flex-col">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={user?.dob || ""}
            onChange={(e) => handleChange("dob", e.target.value)}
            className=" text-black p-2 border-4 rounded-xl border-neutral-500"
          />
        </div>
        <div className=" flex flex-col">
          <label>Email:</label>
          <input
            className=" text-black p-2 border-4 rounded-xl border-neutral-500"
            type="email"
            name="email"
            value={user?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <img
            src={user.profilePicture}
            alt="profile"
            style={{
              height: "50px",
              width: "60px",
            }}
          />
        </div>
        <div className=" flex flex-col">
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="dark:text-white border-4 rounded-xl border-neutral-500 p-2"
          />
        </div>
        <div className="m-auto">
          <button
            onClick={handleSave}
            className="border uppercase px-[50px] py-[15px] rounded-lg mt-5 bg-[#FF0000]  text-white hover:bg-neutral-800"
          >
            Update
          </button>
        </div>
        <div className=" grid text-center m-10 lg:grid-cols-2 lg:gap-5  lg:text-left">
          <a
            href="/local"
            className="group  rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Local{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`mx-auto lg:m-0 max-w-[30ch] text-sm opacity-50`}>
              You Can See The Entries On Local Storage.
            </p>
          </a>

          <a
            href="/firebase"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Firebase{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`mx-auto lg:m-0 max-w-[30ch] text-sm opacity-50 `}>
              You Can See The Entries On Firebase Storage.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

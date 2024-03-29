import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { isEmpty } from "lodash";
function Home() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique ID for the form submission
    const id = Date.now().toString();

    // Convert profile picture to data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const profilePictureDataURL = reader.result;

      const formData = {
        id, // Add the generated ID to the form data
        name,
        phoneNumber,
        dob,
        profilePicture: profilePictureDataURL,
        email,
      };

      // Save data to local storage
      const localData = JSON.parse(localStorage.getItem("userData")) || [];
      localData.push(formData);
      localStorage.setItem("userData", JSON.stringify(localData));

      // Save data to Firebase
      database.ref("users").child(id).set(formData);

      // Clear the form after submission
      setName("");
      setPhoneNumber("");
      setDob("");
      setProfilePicture(null);
      setEmail("");

      alert("Form submitted successfully");
    };

    // Read the selected profile picture as data URL
    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    }
  };

  return (
    <main className="flex  flex-col   gap-5 lg:gap-0 ">
      <div className="z-10  w-full max-w-5xl items-center justify-between font-mono text-sm m-auto ">
        <p className="text-lg   left-0 top-0 flex w-full justify-center border-b-8  bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit   lg:bg-gray-200  lg:dark:bg-zinc-800/30">
          Enter Your Details Here....😊
        </p>

        <div className=" bottom-0 left-0 flex  w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:h-auto lg:w-auto lg:bg-none ">
          <div className="flex flex-col justify-center  ">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 items-center m-10  text-white"
            >
              <div className="flex flex-col md:flex-row gap-10 ">
                <div className="flex flex-col gap-5 ">
                  <div>
                    <label
                      className=" font-extrabold text-black dark:text-white"
                      htmlFor="name "
                    >
                      Name
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4   border-neutral-500 rounded-md p-1  text-black text-[14px]"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    
                    />
                  </div>
                  <div>
                    <label
                      className=" font-extrabold  text-black dark:text-white"
                      htmlFor="contact"
                    >
                      Contact No.
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4  border-neutral-500 rounded-md p-1   text-black   text-[14px] bg-white "
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    
                    />
                  </div>
                  <div className=" ">
                    <label
                      className=" font-extrabold  text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4  border-neutral-500 rounded-md p-1   text-black   text-[14px] bg-white "
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    
                    />
                  </div>

                  <div className="">
                    <label
                      className=" font-extrabold  text-black dark:text-white"
                      htmlFor="dob"
                    >
                      Date of birth
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4  border-neutral-500 rounded-md p-1  text-black text-[14px]"
                      type="date"
                      name="dateOfBirth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                   
                    />
                  </div>

                  <div>
                    <label
                      className=" font-extrabold  text-black dark:text-white"
                      htmlFor="photo"
                    >
                      Upload Photo
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4  border-neutral-500 bg-white rounded-md p-1   text-black text-[14px]"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePicture(e.target.files[0])}
                    
                    />
                  </div>
                </div>
              </div>
              <button className="border uppercase px-[50px] py-[15px] rounded-lg mt-5 bg-[#FF0000]  text-white hover:bg-neutral-800">
                Submit
              </button>
            </form>
          </div>
        </div>
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
    </main>
  );
}

export default Home;

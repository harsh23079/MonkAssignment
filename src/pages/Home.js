import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { isEmpty } from "lodash";
function Home() {
  const initialFormState = {
    name: "",
    phoneNumber: "",
    email: "",
    profilePic: null,
    dateOfBirth: "",
  };
  // const navigate = useNavigate();
  const [data, setData] = useState({});
  const [formdata, setFormdata] = useState(initialFormState);
  const { name, phoneNumber, email, profilePic, dateOfBirth } = formdata;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEmpty(id)) {
      const newData = { ...formdata, id: Date.now() };

      database.ref("details").push(formdata, (err) => {
        if (err) {
          console.log(err);
        } else {
          alert("Form submitted successfully");
        }
      });
    } else {
      // Update data in Firebase
      database.ref(`details/${id}`).set(formdata, (err) => {
        if (err) {
          console.log(err);
        }

        alert("Successfully updated");
      });
    }

    setFormdata({});
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormdata({ ...formdata, [name]: reader.result });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormdata({ ...formdata, [name]: value });
    }
  };
  let currentId = useParams();
  const { id } = currentId;

  useEffect(() => {
    // Load data from local storage
    // const localData = JSON.parse(localStorage.getItem('userData')) || [];
    // setData(localData.reduce((obj, item) => ({ ...obj, [item.id]: item }), {}));

    // Load data from Firebase
    database.ref("details").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        snapshot({});
      }
    });
  }, [id]);

  useEffect(() => {
    if (isEmpty(id)) {
      setFormdata({
        ...initialFormState,
      });
    } else {
      setFormdata({ ...data[id] });
    }
  }, [id, data]);

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
                    <label className=" font-extrabold" htmlFor="name ">
                      Name
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4 rounded-md p-1  text-black text-[14px]"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                      // {...register("name")}
                    />
                  </div>
                  <div>
                    <label className=" font-extrabold" htmlFor="contact">
                      Contact No.
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4 rounded-md p-1   text-black   text-[14px] bg-white "
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={handleInputChange}
                      // {...register("contact")}
                    />
                  </div>
                  <div className=" ">
                    <label className=" font-extrabold" htmlFor="email">
                      Email
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4 rounded-md p-1   text-black   text-[14px] bg-white "
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      // {...register("email")}
                    />
                  </div>

                  <div className="">
                    <label className=" font-extrabold" htmlFor="dob">
                      Date of birth
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4 rounded-md p-1  text-black text-[14px]"
                      type="date"
                      name="dateOfBirth"
                      value={dateOfBirth}
                      onChange={handleInputChange}
                      // {...register("dob")}
                    />
                  </div>
                  <div>
                    <img
                      src={profilePic}
                      style={{
                        height: "50px",
                        width: "50px",
                      }}
                    />
                  </div>
                  <div>
                    <label className=" font-extrabold" htmlFor="photo">
                      Upload Photo
                      <span className="text-red-500 text-[18px]"> *</span>
                    </label>
                    <input
                      className="form-control w-full border-4 bg-white rounded-md p-1   text-black text-[14px]"
                      type="file"
                      name="profilePic"
                      onChange={handleInputChange}
                      // onChange={handleDocChange}
                    />
                  </div>
                </div>
              </div>
              <button className="border uppercase px-[50px] py-[15px] rounded-lg mt-5 bg-[#FF0000]  text-white hover:bg-neutral-800">
                Submit
              </button>
            </form>
            {/* <DevTool control={control} /> */}
          </div>
        </div>
      </div>

      <div className=" grid text-center m-10 lg:grid-cols-2 lg:gap-5  lg:text-left">
        {/* <Link to="/view2"> */}
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
        {/* </Link> */}

        <a
          href="/firebase"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
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

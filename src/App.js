// import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import FirebaseStorage from "./pages/FirebaseStorage";
import LocalStorage from "./pages/LocalStorage";
import EditForm from "./components/EditForm";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firebase" element={<FirebaseStorage />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/local" element={<LocalStorage />} />

        {/* <Route path="/updatefromLocal/:id" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;

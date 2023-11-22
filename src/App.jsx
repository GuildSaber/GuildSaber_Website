import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Guilds from "./pages/Guilds/Guilds";
import Guild from "./pages/Guild/Guild";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="text-white px-2 md:px-4 lg:px-8">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />

          <Route path="/guilds" element={<Guilds />} />
          <Route path="/guild/:guildID" element={<Guild />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

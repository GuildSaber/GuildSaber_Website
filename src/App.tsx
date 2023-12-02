import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Guilds from "./pages/Guilds/Guilds";
import Guild from "./pages/Guild/Guild";
import Signin from "./pages/Signin/Signin";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import PlayerProfile from "./pages/Player/PlayerProfile";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between text-white">
      <Header />
      <div className="container mb-auto flex-grow px-2 text-white md:px-4 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/me" element={<PlayerProfile />} />
          <Route path="/signin" element={<Signin />} />

          <Route path="/guilds" element={<Guilds />} />
          <Route path="/guild/:guildID" element={<Guild />} />

          <Route path="/map/:mapID/" element={<Map />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

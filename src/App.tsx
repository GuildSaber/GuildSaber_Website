import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Toaster from "@/components/Toaster";
import Guild from "@/pages/Guild";
import Guilds from "@/pages/Guilds";
import Home from "@/pages/Home";
import Map from "@/pages/Map";
import Member from "@/pages/Member";
import Player from "@/pages/Player";
import Signin from "@/pages/Signin";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between text-white">
      <Header />
      <div className="container mb-auto flex-grow px-2 text-white md:px-4 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:playerID" element={<Player />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/guilds" element={<Guilds />} />
          <Route path="/guild/:guildID" element={<Guild tab="rankedMaps" />} />
          <Route
            path="/guild/:guildID/leaderboard"
            element={<Guild tab="leaderboard" />}
          />
          <Route path="/guild/:guildID/member" element={<Member />} />

          <Route path="/map/:mapID/" element={<Map />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;

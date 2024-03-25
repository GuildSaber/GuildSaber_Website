import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Guild from "@/pages/Guild";
import Guilds from "@/pages/Guilds";
import Home from "@/pages/Home";
import Map from "@/pages/Map";
import PlayerProfile from "@/pages/Player";
import Signin from "@/pages/Signin";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <div className="flex min-h-screen flex-col justify-between text-white">
      <Header />
      <div className="container mb-auto flex-grow px-2 text-white md:px-4 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:playerID" element={<PlayerProfile />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/guilds" element={<Guilds />} />
          <Route path="/guild/:guildID" element={<Guild />} />
          <Route path="/guild/:guildID/leaderboard" element={<Leaderboard />} />

          <Route path="/map/:mapID/" element={<Map />} />
        </Routes>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1A1C1E",
            border: "1px solid #2E3136",
            color: "white",
          },
        }}
      />
      <Footer />
    </div>
  );
}

export default App;

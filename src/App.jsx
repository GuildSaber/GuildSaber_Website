import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Guilds from "./pages/Guilds/Guilds";
import Guild from "./pages/Guild/Guild";
import Signin from "./pages/Signin/Signin";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/signin" element={<Signin />} />

                <Route path="/guilds" element={<Guilds />} />
                <Route path="/guild/:guildID" element={<Guild />} />
            </Routes>
        </div>
    );
}

export default App;

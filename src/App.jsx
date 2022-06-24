import Input from "./components/Input";
import Homepage from "./components/pages/Homepage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/create" element={<Input />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

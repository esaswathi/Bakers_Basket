import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./mainDir/index.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="index" element={<Index />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

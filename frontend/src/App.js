import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ listStyleType: "none" }}>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ display: "inline", marginRight: "10px" }}>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

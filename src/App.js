import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ChallengeListPage from "./components/challengeListPage";
import ChallengeQuestionsPage from "./components/challengeQuestionsPage";
import TrackingPage from "./components/trackingPage"; // Import the new tracking page

const App = () => {
    return (
        <Router>
            {/* Global Navbar if needed */}
            {/* <Navbar /> */}

            {/* Define your routes */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/challenges" element={<ChallengeListPage />} />
                <Route path="/challenges/:id/questions" element={<ChallengeQuestionsPage />} />
                <Route path="/tracking" element={<TrackingPage />} /> {/* New tracking page route */}
            </Routes>
        </Router>
    );
};

export default App;

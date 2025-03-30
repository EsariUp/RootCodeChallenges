import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import ChallengeListPage from "./components/challengeListPage";
import ChallengeQuestionsPage from "./components/challengeQuestionsPage";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route for Login Page */}
                <Route path="/" element={<Login />} />

                {/* Route for Challenge List Page */}
                <Route path="/challenges" element={<ChallengeListPage />} />

                {/* Route for Challenge Questions Page */}
                <Route path="/challenges/:id/questions" element={<ChallengeQuestionsPage />} />
            </Routes>
        </Router>
    );
};

export default App;

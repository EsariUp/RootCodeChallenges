import { create } from "zustand";

const useAppStore = create((set, get) => ({
    // Login State
    user: null,
    setUser: (user) => set({ user }),

    // Challenge Filters
    filters: {
        language: "",
        difficulty: "",
    },
    setLanguageFilter: (language) =>
        set((state) => ({ filters: { ...state.filters, language } })),
    setDifficultyFilter: (difficulty) =>
        set((state) => ({ filters: { ...state.filters, difficulty } })),

    // Pagination
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),

    // Completed Challenges
    completedChallenges: [], // Store completed challenges
    markChallengeCompleted: (challengeId, timeTaken) =>
        set((state) => ({
            completedChallenges: [
                ...state.completedChallenges,
                { id: challengeId, timeTaken },
            ],
        })),

    // Check if a Challenge is Completed (Helper Function)
    isChallengeCompleted: (challengeId) => {
        const completedChallenges = get().completedChallenges; // Access completed challenges from state
        return completedChallenges.some((challenge) => challenge.id === challengeId);
    },

    // Sort Completed Challenges
    getSortedCompletedChallenges: () => {
        const completedChallenges = get().completedChallenges;
        return [...completedChallenges].sort((a, b) => a.timeTaken - b.timeTaken);
    },
}));

export default useAppStore;

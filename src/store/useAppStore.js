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
        set((state) => {
            // Check if the challenge is already marked as completed
            const isAlreadyCompleted = state.completedChallenges.some(
                (challenge) => challenge.id === challengeId
            );

            if (!isAlreadyCompleted) {
                return {
                    completedChallenges: [
                        ...state.completedChallenges,
                        { id: challengeId, timeTaken },
                    ],
                };
            }

            // If it's already completed, no changes are made
            return state;
        }),

    // Check if a Challenge is Completed (Helper Function)
    isChallengeCompleted: (challengeId) => {
        const completedChallenges = get().completedChallenges;
        return completedChallenges.some((challenge) => challenge.id === challengeId);
    },

    // Sort Completed Challenges
    getSortedCompletedChallenges: () => {
        const completedChallenges = get().completedChallenges;
        return [...completedChallenges].sort((a, b) => a.timeTaken - b.timeTaken);
    },

    // Combined Filters Helper (Derived State)
    getCombinedFilters: () => {
        const { filters } = get();
        const queryParams = [];
        if (filters.language) queryParams.push(`language=${filters.language}`);
        if (filters.difficulty) queryParams.push(`difficulty=${filters.difficulty}`);
        return queryParams.join("&");
    },
}));

export default useAppStore;

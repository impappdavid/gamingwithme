// Export all types
export * from './types';

// Export auth functions
export {
    login,
    register,
    logout,
    googleLogin,
    googleRegister,
} from './auth';

// Export user functions
export {
    getUserCommonInfos,
    getUserProfile,
    getAllUsers,
    getUsersByTag,
    getTopCreators,
    getSuggestedUsersWithPayment
} from './user';

// Export games functions
export {
    getAllGames,
    fetchGameFromRAWG,
    fetchPopularGamesFromRAWG
} from './games';

// Export settings functions
export {
    getUserAllInformation,
    updateUsername,
    updateUserBio,
    updateUserPassword,
    updateUserAvatar,
    getUpcomingBookings,
    getBills,
    deleteAccount,
    addGameTag,
    deleteGameTag,
    addNewTag,
    deleteTag
} from './settings';

// Export creator functions
export { becomeACreator } from './creator';

// Export client utilities
export { apiClient, createRequestConfig, handleApiError } from './client'; 
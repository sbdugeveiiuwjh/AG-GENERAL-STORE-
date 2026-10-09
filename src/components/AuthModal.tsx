import React from 'react';
import { UserProfileModal } from './UserProfileModal';

/**
 * AuthModal displays the logged in user's profile, saved details, and logout option.
 * For unauthenticated users, the website is protected by GoogleLoginScreen.
 */
export const AuthModal: React.FC = () => {
  return <UserProfileModal />;
};

export default AuthModal;

import { useState } from 'react';
import styles from './Auth.module.scss';
import LoginForm from './LoginForm/LoginForm';
import SignupForm from './SignupForm/SignupForm';

const Auth: React.FC = () => {

  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleShowLogin = () => {
    setShowLogin(!showLogin)
  }
  // console.log(showLogin);

  return (
    <div>
      {showLogin ?
        <LoginForm handleShowLogin={handleShowLogin} /> :
        <SignupForm handleShowLogin={handleShowLogin} />}
    </div>
  )
}

export default Auth;
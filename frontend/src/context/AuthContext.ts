import { createContext } from 'react';
import noop from 'noop-ts';

const AuthContext = createContext({
    token: '',
    userId: '',
    login: noop,
    logout: noop,
    isAuthenticated: false,
    isShowForm: false,
    toggleShowForm: () => { }
});

export default AuthContext;

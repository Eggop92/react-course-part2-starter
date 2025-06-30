
interface LoginAction {
    type: 'LOGIN';
    user?: string; // Optional, only needed for LOGIN action
}

interface LogoutAction {
    type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogoutAction;

const authReducer = (user: string, action: AuthAction): string => {
    switch (action.type) {
        case 'LOGIN':
            return action.user || user; // If user is provided, use it; otherwise, keep current user
        case 'LOGOUT':
            return ''; // Clear user on logout
        default:
            throw Error;
    }
}

export default authReducer;
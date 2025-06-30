import { useContext } from "react";
import AuthContext from "./contexts/authContext";

const LoginStatus = () => {
  // const [user, setUser] = useState('');
  // const [user, dispatch] = useReducer(authReducer, '');
  const { user, authDispatch } = useContext(AuthContext);

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => authDispatch({ type: 'LOGOUT' })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => authDispatch({ type: 'LOGIN', user: 'e.puerta' })} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;

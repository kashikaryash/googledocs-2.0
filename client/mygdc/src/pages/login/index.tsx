window.global ||= window;
import { KeyboardEvent, useContext, useState } from "react";
import TextField from "../../components/atoms/text-field/text-field";
import useWindowSize from "../../hook/use-window-size";
import validator from "validator";
import AuthService from "../../services/auth-service";
import useAuth from "../../hook/use-auth";
import { ToastContext } from "../../contexts/toast-context";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/atoms/logo/logo";

const Login = () => {
  const { widthStr, heightStr } = useWindowSize();
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErros] = useState<Array<string>>([]);
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    setEmailErros([]);
    setPasswordErrors([]);
    let isValid = true;

    if (!validator.isEmail(email)) {
      setEmailErros(["Must enter a valid email"]);
      isValid = false;
    }
    if (!password.length) {
      setPasswordErrors(["Must enter a password"]);
      isValid = false;
    }

    return isValid;
  };

  const loginUser = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await AuthService.login({ email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      login(newAccessToken, newRefreshToken);
      success("Successfully logged in! ");
      navigate("/document/create");
    } catch (err) {
      error("Incorrect username or password");
    } finally {
      setLoading(false);
    }
  };

  const handleOnKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") loginUser();
  };

  const handleOnInputEmail = (value: string) => {
    setEmailErros([]);
    setEmail(value);
  };

  const handleOnInputPassword = (value: string) => {
    setPasswordErrors([]);
    setPassword(value);
  };
  return (
    <div
      onKeyPress={handleOnKeyPress}
      className="flex flex-col justify-center items-center p-6 sm:pb-96 overflow-y-hidden dark:bg-slate-900 text-black h-[100vh] w-[100vw]"
    style={{ width: widthStr, height: heightStr, backgroundImage: "url('https://wallpapercave.com/wp/wp5730951.png')", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", }}
    >
      <div className="w-full max-w-sm white-blur-glass shadow-2xl rounded-2xl dark:bg-slate-800 border-primary border dark:border-0 dark:shadow-xl p-6 mt-[250px]">
        <div className="flex flex-col space-y-4">
          <div className="w-full text-center flex flex-col justify-center items-center">
            <Logo />
            <h1 className="font-medium text-2xl">Sign in</h1>
            <p className="font-medium">to continue to Docs</p>
          </div>
          <TextField
            value={email}
            onInput={handleOnInputEmail}
            label="Email"
            color="secondary"
            errors={emailErrors}
          />
          <p className="text-sm hover:underline font-semibold text-blue-500 text-left">
            <Link to="/register"
            className="text-sm hover:underline font-semibold text-blue-500 text-left">Need an account?</Link>
          </p>
          <TextField
            value={password}
            onInput={handleOnInputPassword}
            label="Password"
            type="password"
            color="secondary"
            errors={passwordErrors}
          />
          <button
            tabIndex={-1}
            className="text-sm hover:underline font-semibold text-blue-500 text-left"
          >
            Forgot Password?
          </button>
          <button
            onClick={loginUser}
            disabled={loading}
            className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1 active:ring-1"
          >
            <span className="">Login</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 text-sm p-4">
        <button className="hover:underline font-semibold text-blue-500">
          Terms
        </button>
        <button className="hover:underline font-semibold text-blue-500">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default Login;
import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { signIn } from "../../services/AuthServices";

interface SignInFormProps {
  setIsLoading: (loading: boolean) => void;
}
   

export default function SignInForm({ setIsLoading }: SignInFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission and page reload
    setIsLoading(true); // Show loading spinner

    try {
      const result = await signIn({ email, password });
      console.log("Login berhasil:", result);
      const token = result.data.token;
      const userData = result.data.user;  // Save user data
  
      // Save the token and user data to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userData", JSON.stringify(userData)); // Store user data as JSON string
  
      navigate("/"); // Redirect to home/dashboard after login
    }  catch (err: any) {
      console.error("Gagal login:", err);
    
      const message = err?.response?.data?.message || "Email atau password salah";
      setErrorMessage(message);
    } finally {
      setIsLoading(false); // Hide loading spinner after the process is done
    }
  };


  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/landing"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Landchine Home
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Welcome To LandChine
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please enter your credentials to access your Landchine account.
            </p>
          </div>

          <form onSubmit={handleSignIn}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input placeholder="you@landchine.com" onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your secure password"
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              {errorMessage && (
  <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
    {errorMessage}
  </div>
)}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Remember me
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-landchine-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <div>
                <Button className="w-full" size="sm" type="submit">
                  Sign In
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              New to Landchine?{" "}
              <Link
                to="/signup"
                className="text-landchine-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

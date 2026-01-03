import { Link, useLocation, useNavigate } from "react-router";
import BrandLogoComponent from "../common/BrandLogo";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleAuth } from "../../utils/handleGoogleAuth";
import { useAuthStore } from "../../stores/useAuthStore";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { regex, validationMessage } from "../../utils/regex";
import SpinnerLoader from "../loaders/SpinnerLoader";
import LoggedInCard from "./LoggedInCard";
export default function LoginPage() {
  const { signInWithGoogle, signIn, isSigningIn, isGoogleSigningIn, user } =
    useAuthStore();
  const axios = useAxios();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (data) => {
    const { user, error } = await signIn(data.email, data.password);
    if (user) {
      user && navigate(state || "/", { replace: true });
      toast.success("Logged in successfully!");
      reset();
    } else {
      toast.error(error);
    }
  };
  const handleGoogleSignIn = async () => {
    const { user, error } = await handleGoogleAuth(signInWithGoogle, axios);
    if (user) {
      toast.success("Logged in successfully!");
      if (user) return navigate(state || "/", { replace: true });
    } else {
      toast.error(error);
    }
  };
  return (
    <>
      <title>Login | PlateShare</title>
      {!user ? (
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="fieldset glass-card py-6 px-8 rounded-xl max-w-md w-full"
        >
          <div className="flex justify-center mt-8">
            <BrandLogoComponent />
          </div>
          <h2 className="text-3xl text-center mt-5">Login Now</h2>
          <p className="text-sm text-center mb-10">
            <span className="me-1">Don't have an account?</span>
            <Link
              to={"/auth/register"}
              className="link link-hover link-base-content font-semibold"
            >
              Register
            </Link>
          </p>
          <label className="font-medium text-sm text-accent">Email</label>
          <input
            type="email"
            className="input w-full bg-transparent border border-white/15 rounded-full"
            placeholder="john.doe@email.com"
            {...register("email", {
              required: "Required an Email Address",
              pattern: {
                value: regex.email,
                message: validationMessage.email,
              },
            })}
          />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
          <label className="font-medium text-sm text-accent mt-3">
            Password
          </label>
          <input
            type="password"
            className="input w-full bg-transparent border border-secondary/15 rounded-full"
            placeholder="●●●●●●"
            {...register("password", {
              required: "Required a password",
              pattern: {
                value: regex.password,
                message: validationMessage.password,
              },
            })}
          />
          {errors.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
          <button
            disabled={isSigningIn || !isValid}
            className="btn btn-primary rounded-full mt-3"
          >
            {isSigningIn && <SpinnerLoader color={"text-base-content/20"} />}
            Login
          </button>
          <div className="divider">Or</div>
          <button
            type="button"
            disabled={isGoogleSigningIn}
            className="btn btn-accent mb-3 rounded-full border-accent/20"
            onClick={handleGoogleSignIn}
          >
            {isGoogleSigningIn ? (
              <SpinnerLoader
                size={"loading-sm"}
                color={"text-base-content/20"}
              />
            ) : (
              <FcGoogle className="text-xl me-1" />
            )}
            <span>Continue with Google</span>
          </button>
        </form>
      ) : (
        <LoggedInCard />
      )}
    </>
  );
}

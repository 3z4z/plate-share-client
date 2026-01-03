import { Link, useLocation, useNavigate } from "react-router";
import BrandLogoComponent from "../common/BrandLogo";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { regex, requiredMessage, validationMessage } from "../../utils/regex";
import toast from "react-hot-toast";
import SpinnerLoader from "../loaders/SpinnerLoader";
import { handleGoogleAuth } from "../../utils/handleGoogleAuth";
import useAxios from "../../hooks/useAxios";
import LoggedInCard from "./LoggedInCard";

export default function RegisterPage() {
  const { signUp, isSigningIn, isGoogleSigningIn, signInWithGoogle, user } =
    useAuthStore();
  const navigate = useNavigate();
  const { state } = useLocation();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      userImage: "",
    },
  });
  const handleRegister = async (data) => {
    const { user, error } = await signUp(
      data.fullName,
      data.email,
      data.password,
      data.userImage
    );
    if (user) {
      user && navigate(state || "/", { replace: true });
      reset();
      toast.success("Account registration is completed!");
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
      <title>Register | PlateShare</title>
      {!user ? (
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="fieldset glass-card py-6 px-8 rounded-xl max-w-md w-full"
        >
          <div className="flex justify-center mt-5">
            <BrandLogoComponent />
          </div>
          <h2 className="text-3xl text-center mt-6">Create an Account</h2>
          <p className="text-sm text-center mb-10">
            <span className="me-1">Already a member?</span>
            <Link
              to={"/auth/login"}
              className="link link-hover link-base-content font-semibold"
            >
              Login Now
            </Link>
          </p>
          <label className="font-medium text-sm text-accent">Full name</label>
          <input
            type="text"
            className="input w-full bg-transparent border border-white/15 rounded-full"
            placeholder="John Doe"
            {...register("fullName", {
              required: requiredMessage.name,
              minLength: {
                value: 3,
                message: validationMessage.name,
              },
            })}
          />
          {errors.fullName && (
            <p className="text-error mb-3">{errors.fullName.message}</p>
          )}
          <label className="font-medium text-sm text-accent">Photo Url</label>
          <input
            type="text"
            className="input w-full bg-transparent border border-white/15 rounded-full"
            placeholder="https://..."
            {...register("userImage", {
              required: requiredMessage.photoUrl,
            })}
          />
          {errors.userImage && (
            <p className="text-error mb-3">{errors.userImage.message}</p>
          )}
          <label className="font-medium text-sm text-accent">Email</label>
          <input
            type="email"
            className="input w-full bg-transparent border border-secondary/15 rounded-full"
            placeholder="john.doe@email.com"
            {...register("email", {
              required: requiredMessage.email,
              pattern: {
                value: regex.email,
                message: validationMessage.email,
              },
            })}
          />
          {errors.email && (
            <p className="text-error mb-3">{errors.email.message}</p>
          )}
          <label className="font-medium text-sm text-accent">Password</label>
          <input
            type="password"
            className="input w-full bg-transparent border border-secondary/15 rounded-full"
            placeholder="●●●●●●"
            {...register("password", {
              required: requiredMessage.password,
              pattern: {
                value: regex.password,
                message: validationMessage.password,
              },
            })}
          />
          {errors.password && (
            <p className="text-error mb-3">{errors.password.message}</p>
          )}
          <button
            disabled={isSigningIn || !isValid}
            className="btn btn-primary rounded-full mt-3"
          >
            {isSigningIn && (
              <SpinnerLoader
                size={"loading-sm"}
                color={"text-base-content/20"}
              />
            )}
            Register
          </button>
          <div className="divider">Or</div>
          <button
            disabled={isGoogleSigningIn}
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-accent mb-3 rounded-full border-accent/20"
          >
            {isGoogleSigningIn ? (
              <SpinnerLoader color={"text-base-content/20"} />
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

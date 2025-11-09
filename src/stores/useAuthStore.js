import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.config";
import { axiosInstance } from "../utils/axiosInstance";

const provider = new GoogleAuthProvider();
export const useAUthStore = create((set) => ({
  user: null,
  isSigningIn: true,
  error: null,
  isGoogleSigningIn: true,
  isAuthLoading: true,
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      set({ user });
      return { user };
    } catch (err) {
      console.log(err);
      set({ error: err.message });
    } finally {
      set({ isGoogleSigningIn: false });
    }
  },

  register: async (fullName, email, password, userImage) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await updateProfile(user, {
        displayName: fullName,
        photoURL:
          userImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
      set({ user });
      const newUser = {
        email: user.email,
        fullName: user.displayName,
        userImage: user.photoURL,
      };
      await axiosInstance.post("/users", newUser);
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ isSigningIn: false });
    }
  },

  signIn: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      set({ user });
      return { user };
    } catch (err) {
      console.log(err);
      set({ error: err.message });
    } finally {
      set({ isSigningIn: false });
    }
  },

  signOut: async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
      set({ error: err.message });
    }
  },

  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        set({ user: currentUser });
      } else {
        set({ user: null });
      }
      set({ isAuthLoading: false, isSigningIn: false });
      return () => unsubscribe;
    });
  },
}));

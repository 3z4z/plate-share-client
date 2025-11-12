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
import { persist } from "zustand/middleware";

const provider = new GoogleAuthProvider();
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isSigningIn: false,
      error: null,
      isGoogleSigningIn: false,
      isAuthLoading: true,
      signInWithGoogle: async () => {
        try {
          set({ isGoogleSigningIn: true });
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          set({ user });
          return { user };
        } catch (err) {
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isGoogleSigningIn: false });
        }
      },

      signUp: async (fullName, email, password, userImage) => {
        set({ isSigningIn: true });
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
              userImage || "https://images2.imgbox.com/03/34/DB5GzhxX_o.png",
          });
          set({ user });
          const newUser = {
            email: user.email,
            fullName: user.displayName,
            userImage: user.photoURL,
          };
          await axiosInstance.post("/users", newUser);
          return { user };
        } catch (err) {
          console.log("err", err);
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isSigningIn: false });
        }
      },

      signIn: async (email, password) => {
        try {
          set({ isSigningIn: true });
          const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = result.user;
          set({ user });
          return { user };
        } catch (err) {
          console.log(err);
          set({ error: err.message });
          return { error: err.message };
        } finally {
          set({ isSigningIn: false });
        }
      },

      signOut: async () => {
        try {
          await signOut(auth);
          set({ isAuthLoading: false, isSigningIn: false });
        } catch (err) {
          console.log(err);
          set({ error: err.message });
        }
      },

      initAuthListener: () => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (!currentUser) {
            set({ user: null, isAuthLoading: false, isSigningIn: false });
            return;
          } else {
            set({
              user: currentUser,
              isAuthLoading: false,
              isSigningIn: false,
            });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user
          ? {
              uid: state.user.uid,
              displayName: state.user.displayName,
              email: state.user.email,
              photoURL: state.user.photoURL,
            }
          : null,
      }),
    }
  )
);

import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const googleProvider = new GoogleAuthProvider();
	const axiosPublic = useAxiosPublic();

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const updateUserProfile = (userName, image) => {
		return updateProfile(auth.currentUser, {
			displayName: userName,
			photoURL: image,
		});
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				// get token and store client
				const userInfo = { email: currentUser.email };
				axiosPublic.post("/jwt", userInfo).then((res) => {
					if (res.data.token) {
						localStorage.setItem("user-token", res.data.token);
						setLoading(false);
					}
				});
			} else {
				localStorage.removeItem("user-token");
				setLoading(false);
			}
		});
		return () => {
			return unsubscribe();
		};
	}, [axiosPublic]);

	const authInfo = {
		user,
		loading,
		createUser,
		signInUser,
		googleSignIn,
		logOut,
		updateUserProfile,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

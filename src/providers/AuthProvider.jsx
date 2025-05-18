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
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	const axiosSecure = useAxiosSecure();
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
		const provider = new GoogleAuthProvider();
		return signInWithPopup(auth, provider).finally(() => setLoading(false));
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
				const userInfo = { email: currentUser.email };

				axiosPublic.post("/jwt", userInfo).then((res) => {
					if (res.data.token) {
						localStorage.setItem("user-token", res.data.token);

						axiosSecure
							.get(`/user/admin/${currentUser.email}`)
							.then((res) => setIsAdmin(res.data.admin))
							.catch(() => setIsAdmin(false));
					}
					setLoading(false);
				});
			} else {
				localStorage.removeItem("user-token");
				setIsAdmin(false);
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, [axiosPublic, axiosSecure]);

	const authInfo = {
		user,
		loading,
		isAdmin,
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

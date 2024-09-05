import React from "react";

import { useState, useEffect } from "react";

import { AuthService } from "@/api/AuthService";
import { requestClient } from "@/api/apiClient";

import Profile from "./Profile";
import Leaderboard from "./Leaderboard";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { USERS_URL, LEADERBOARD_URL, FRIENDS_URL } from "@/api/APIConstants";

import { Loader2 } from "lucide-react";

function ProfilePage() {
	const [username, setUsername] = useState(() =>
		localStorage.getItem("username")
	);

	const [user, setUser] = useState(null);

	// returns the user object from the backend
	async function retrieveUser(username) {
		try {
			const response = await requestClient.get(
				USERS_URL + "/user" + "/" + username
			);

			console.log(response.data);
			setUser(response.data);
		} catch (error) {
			console.error(
				"Get user info failed for profile page " + error.response.data
			);
		}
	}

	// returns the leaderboard object from the backend
	async function retrieveLeaderboard(username, type) {
		try {
			const response = await requestClient.get(
				USERS_URL +
					"/user" +
					"/" +
					username +
					FRIENDS_URL +
					LEADERBOARD_URL +
					"/" +
					type // type is either "totalScore" or "highestScore" or "SPG"
			);

			console.log(response.data);
		} catch (error) {
			console.error(
				"Get leaderboard failed for profile page " + error.response.data
			);
		}
	}

	useEffect(() => {
		try {
			AuthService.checkAuth();
		} catch (error) {
			console.error("Check auth failed " + error.response.data);
		}
	}, []);

	useEffect(() => {
		try {
			retrieveUser(username);
			retrieveLeaderboard(username, "SPG");
		} catch (error) {
			console.error("Get user info failed for profile page " + error);
		}
	}, [username]);

	const handleSelectChange = (value) => {
		console.log(value);
	};

	return user ? (
		<div className="w-full h-screen flex flex-col items-center justify-evenly md:flex-row gap-10">
			<Profile user={user} />
			<Leaderboard />
		</div>
	) : (
		<div className="w-full h-screen flex items-center justify-center">
			<Loader2 className=" w-20 h-20 animate-spin" />
		</div>
	);
}
export default ProfilePage;

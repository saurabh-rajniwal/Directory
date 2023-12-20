import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import UserData from "./UserData";
import { useParams } from "react-router-dom";

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams(); // Access userId from the route's parameters

  useEffect(() => {
    // Fetch user information based on userId
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .catch((error) => console.error("Error fetching user data:", error));

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((postsData) => setPosts(postsData))
      .catch((error) => console.error("Error fetching posts data:", error));
  }, [userId]);

  return (
    <div>
      <ProfileHeader />
      {user && <UserData user={user} posts={posts} />}
    </div>
  );
}

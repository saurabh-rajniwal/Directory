import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const [postsCount, setPostsCount] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/details/${user.id}`);
  };

  useEffect(() => {
    const fetchUserPostsCount = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
        );
        const data = await response.json();
        setPostsCount(data.length);
      } catch (error) {
        console.error(`Error fetching posts count for user ${user.id}:`, error);
      }
    };

    fetchUserPostsCount();
  }, [user.id]);

  return (
    <>
      <div className="user-card" onClick={handleCardClick}>
        <div className="user-info">
          <div className="user-name">Name: {user.name}</div>
          <div className="user-posts">Posts: {postsCount}</div>
        </div>
      </div>
    </>
  );
};

export default UserCard;

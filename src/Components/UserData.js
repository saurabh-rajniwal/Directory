// src/components/UserData.js
import React from "react";

const UserData = ({ user, posts }) => {
  return (
    <>
      <div className="user-data-container">
        <h2>User Data</h2>
        <div className="user-data">
          <div className="left-column">
            <p>{user.name}</p>
            <p>
              {user.username} | {user.company.catchPhrase}
            </p>
          </div>
          <div className="right-column">
            <p>
              {`${user.address.street}, ${user.address.suite}, ${user.address.city}`}
            </p>
            <p>
              {user.email} | {user.phone}
            </p>
          </div>
        </div>
      </div>
      <div className="user-posts">
        <h3>User Posts</h3>
        <div className="post-cards">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserData;

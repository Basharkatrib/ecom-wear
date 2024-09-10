import React, { useState, useEffect } from "react";
import logo from '../../images/logo.png'; 

export default function Profile() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          "http://localhost:1337/api/users/me?populate=profilePicture", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData); 

          
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            password: "********",
            profilePicture: userData.profilePicture && userData.profilePicture.url
              ? `${process.env.REACT_APP_API_APP}${userData.profilePicture.url}` 
              : logo, 
          });
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setUser((prevUser) => ({
        ...prevUser,
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("jwt");
      let profilePictureId = user.profilePicture;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("files", selectedFile);

        const uploadResponse = await fetch("http://localhost:1337/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (uploadResponse.ok) {
          const fileData = await uploadResponse.json();
          profilePictureId = fileData[0].id;
        } else {
          console.error("Failed to upload image.");
          return;
        }
      }

      const updateData = {
        username: user.username,
        email: user.email,
        profilePicture: profilePictureId,
      };

      const response = await fetch(
        `http://localhost:1337/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        alert("Profile updated!");
        const updatedUser = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          profilePicture: updatedUser.profilePicture && updatedUser.profilePicture.url
            ? `${process.env.REACT_APP_API_APP}${updatedUser.profilePicture.url}`
            : prevUser.profilePicture,
        }));
      } else {
        console.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 ">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center">
          <label htmlFor="profilePicture">
            <img
              className="w-32 h-32 rounded-full object-cover mb-4 cursor-pointer"
              src={user.profilePicture} 
              alt="Profile"
            />
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

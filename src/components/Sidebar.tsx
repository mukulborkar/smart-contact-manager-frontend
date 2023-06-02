import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { getCurrentUser, getToken } from "../auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const userData = getCurrentUser();
  const token = getToken();
  // console.log(getCurrentUser.imageUrl == null);
  let profileImage = window.location.origin + "/default.png";
  if (userData.imageUrl != null)
    profileImage = "http://localhost:8081/api/users/image/" + userData.id;
  // console.log(userData);
  // console.log(profileImage);
  const [image, setImage] = useState(profileImage);

  const handleImageUpload = async (event: { target: { files: any[] } }) => {
    const file = event.target.files[0];
    // console.log(event.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      userData.imageUrl = file.name;
      // console.log(file.name);
      setImage(file.name);
    };
    reader.readAsDataURL(file);
    let formData = new FormData();
    formData.append("image", file);
    console.log(formData);

    await axios
      .post(
        "http://localhost:8081/api/users/image/upload/" + userData.id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Image Uploaded");
        console.log(response.data);
        window.location.replace("/user/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="sidebar">
        <form>
          <div className="content">
            <label htmlFor="image">
              <img
                src={profileImage}
                alt="User Avatar"
                className="rounded-circle avatar-img"
              />
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </form>
        <div className="user-data">
          <h4 style={{ color: "white", textAlign: "center" }}>
            {userData.name}
          </h4>
        </div>
        <hr />
        <div className="info-box" style={{ color: "white" }}>
          {userData.about}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

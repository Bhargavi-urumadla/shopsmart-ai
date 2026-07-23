import "./ProfileCard.css";
import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
} from "react-icons/fi";

function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img
          src={`https://ui-avatars.com/api/?name=${
            user?.name || "Guest User"
          }&background=14b8a6&color=fff&size=160`}
          alt="profile"
        />

        <span className="online-dot"></span>
      </div>

      <h2>{user?.name || "Guest User"}</h2>

      <span className="member-badge">
        <FiAward />
        Gold Member
      </span>

      <div className="profile-info">
        <p>
          <FiMail />
          {user?.email || "user@gmail.com"}
        </p>

        <p>
          <FiPhone />
          {user?.phone || "+91 9876543210"}
        </p>

        <p>
          <FiMapPin />
          Telangana, India
        </p>
      </div>

      <div className="reward-box">
        <h3>560</h3>
        <span>Reward Points</span>
      </div>

      <button>
        <FiEdit2 />
        Edit Profile
      </button>
    </div>
  );
}

export default ProfileCard;
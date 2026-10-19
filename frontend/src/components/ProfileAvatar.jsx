import { useEffect, useState } from "react";

const getFallbackAvatar = (gender) =>
  gender === "female" ? "/avatars/female.svg" : "/avatars/male.svg";

const ProfileAvatar = ({ profilePic, gender, alt = "User avatar", className = "" }) => {
  const fallbackAvatar = getFallbackAvatar(gender);
  const [imageSrc, setImageSrc] = useState(profilePic || fallbackAvatar);

  useEffect(() => {
    setImageSrc(profilePic || fallbackAvatar);
  }, [profilePic, fallbackAvatar]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imageSrc !== fallbackAvatar) setImageSrc(fallbackAvatar);
      }}
    />
  );
};

export default ProfileAvatar;

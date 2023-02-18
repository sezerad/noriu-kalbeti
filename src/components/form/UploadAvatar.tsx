import { FaUser } from "react-icons/fa";
import Input from "../shared/Input";

interface IUploadAvatarProps {
  avatarUrl?: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<File | undefined>>;
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

export default function UploadAvatar({
  avatarUrl,
  setAvatarUrl,
  setAvatar,
}: IUploadAvatarProps) {
  const handleAvatarSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];

    if (!file) return;

    setAvatar(file);

    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      setAvatarUrl(fileReader.result as string);
    });

    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <label htmlFor="avatar-input">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" />
        ) : (
          <FaUser size={28} />
        )}
      </label>
      <Input
        id="avatar-input"
        type="file"
        onChange={handleAvatarSubmit}
        accept="image/png, image/jpg"
      />
    </div>
  );
}

import uploadImage from "@/services/cloudinary/uploadImage";

export default function uploadProfileImage(
  file: File
) {
  return uploadImage(
    file,
    "portfolio/profile"
  );
}
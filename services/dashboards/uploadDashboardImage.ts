import uploadImage from "@/services/cloudinary/uploadImage";

export default function uploadDashboardImage(
  file: File
) {
  return uploadImage(
    file,
    "portfolio/dashboards"
  );
}
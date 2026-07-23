export interface UploadedCV {
  url: string;
  publicId: string;
  originalFilename: string;
}

export default async function uploadCV(
  file: File
): Promise<UploadedCV> {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    throw new Error(
      "Cloudinary cloud name is missing."
    );
  }

  if (!uploadPreset) {
    throw new Error(
      "Cloudinary upload preset is missing."
    );
  }

  /* ================================= */
  /* VALIDATE PDF */
  /* ================================= */

  if (
    file.type !== "application/pdf"
  ) {
    throw new Error(
      "Please select a PDF document."
    );
  }

  const maximumSize =
    10 * 1024 * 1024;

  if (file.size > maximumSize) {
    throw new Error(
      "The CV must be 10 MB or smaller."
    );
  }

  /* ================================= */
  /* CLOUDINARY FORM DATA */
  /* ================================= */

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  formData.append(
    "upload_preset",
    uploadPreset
  );

  /* ================================= */
  /* UPLOAD PDF TO CLOUDINARY */
  /* ================================= */

  const response =
    await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

  /* ================================= */
  /* HANDLE RESPONSE */
  /* ================================= */

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Cloudinary CV upload error:",
      data
    );

    throw new Error(
      data?.error?.message ||
        "CV upload failed."
    );
  }

  if (!data.secure_url) {
    throw new Error(
      "Cloudinary did not return a CV URL."
    );
  }

  /* ================================= */
  /* RETURN UPLOAD INFORMATION */
  /* ================================= */

  return {
    url: data.secure_url,

    publicId:
      data.public_id || "",

    originalFilename:
      data.original_filename ||
      file.name,
  };
}
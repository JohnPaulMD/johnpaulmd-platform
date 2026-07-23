export default async function uploadImage(
  file: File,
  folder?: string
): Promise<string> {
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

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    uploadPreset
  );

  if (folder) {
    formData.append(
      "folder",
      folder
    );
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error =
      await response.json();

    throw new Error(
      error?.error?.message ??
        "Image upload failed."
    );
  }

  const data =
    await response.json();

  return data.secure_url;
}
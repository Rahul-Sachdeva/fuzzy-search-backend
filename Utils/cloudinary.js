import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier"; // Allows uploading buffers directly
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) return null;

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // Auto-detect file type
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            console.log("File uploaded to Cloudinary successfully!");
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Upload to Cloudinary failed");
  }
};

export default uploadCloudinary;

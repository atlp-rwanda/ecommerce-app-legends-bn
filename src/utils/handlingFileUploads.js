import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
//configuring environment variable at cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
//generating upload function to cloudinary
export const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id,
      }),
        {
          resource: 'auto',
          folder: folder,
        };
    });
  });
};
//using multer for grabbing images.
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});
export const removeImageFromCloudinary = (imgId)=>{
 return cloudinary.uploader.destroy(imgId);
}
import multer, { Multer } from "multer";
import { Request, Response, NextFunction } from "express";
import AWS, { S3 } from "aws-sdk";

// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
  accessKeyId:  "AKIAR7T5FRYX2Q55MSNZ",                   //"YOUR_ACCESS_KEY",
  secretAccessKey: "KDb3/N2Z519fvBXqMn+EjP3In/nqEQtDRreDZhyq",                                     //"YOUR_SECRET_ACCESS_KEY",
  region: "ap-south-1"
});
// Set up Multer storage and upload options
const storage = multer.memoryStorage(); // Store the file in memory
const upload: Multer = multer({ storage });
// Extend the Request object to include the fileUrl property
declare global {
  namespace Express {
    interface Request {
      fileUrl?: string;
    }
  }
}
// Middleware function for handling file upload
export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  // Use upload.single('image') middleware to handle file upload
  upload.single("image")(req, res, (err: any) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: "File upload error" });
    }
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }
    // File uploaded successfully, now let's upload it to AWS S3
    const params: S3.PutObjectRequest = {
      Bucket:"taskmanagement046",               //"your-s3-bucket-name",
      Key: `${Date.now()}-${Math.round(Math.random() * 1e9)}.${req.file.originalname.split(".").pop()}`,
      Body: req.file.buffer,
      ACL: "public-read", // Make the object publicly accessible
    };
    s3.upload(params, (s3Err, data) => {
      if (s3Err) {
        console.error("AWS S3 upload error:", s3Err);
        return res.status(500).json({ error: "AWS S3 upload error" });
      }
      // File uploaded to S3, and data.Location contains the public URL
      req.fileUrl = data.Location;
      console.log(req.fileUrl);
      next();
    });
  });
};
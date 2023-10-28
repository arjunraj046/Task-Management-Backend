"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Configure AWS SDK with your credentials
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: "AKIAR7T5FRYX2Q55MSNZ",
    secretAccessKey: "KDb3/N2Z519fvBXqMn+EjP3In/nqEQtDRreDZhyq",
    region: "ap-south-1"
});
// Set up Multer storage and upload options
const storage = multer_1.default.memoryStorage(); // Store the file in memory
const upload = (0, multer_1.default)({ storage });
// Middleware function for handling file upload
const uploadImage = (req, res, next) => {
    // Use upload.single('image') middleware to handle file upload
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(400).json({ error: "File upload error" });
        }
        if (!req.file) {
            console.error("No file uploaded");
            return res.status(400).json({ error: "No file uploaded" });
        }
        // File uploaded successfully, now let's upload it to AWS S3
        const params = {
            Bucket: "taskmanagement046",
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
exports.uploadImage = uploadImage;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
// Set up multer storage and upload options
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Specify the directory where uploaded images will be saved
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Define a unique filename for the uploaded image
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        const filename = uniqueSuffix + '.' + extension;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({ storage });
const saveFile = () => {
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            // Use upload.single('image') middleware to handle file upload
            upload.single('image')(req, res, (err) => {
                if (err) {
                    console.error('File upload error:', err);
                    reject('File upload error');
                    return;
                }
                // Check if the 'file' property exists in the request
                if (!req.file) {
                    console.error('No file uploaded');
                    reject('No file uploaded');
                    return;
                }
                // Access the uploaded image file
                const imageFile = req.file;
                // Define the path where you want to save the file
                const savePath = 'uploads/' + imageFile.filename;
                // Use fs to move the file from the temporary location to the final destination
                fs_1.default.rename(imageFile.path, savePath, (fsErr) => {
                    if (fsErr) {
                        console.error('Error saving the file:', fsErr);
                        reject('Error saving the file');
                        return;
                    }
                    // File saved successfully
                    resolve(savePath);
                });
            });
        });
    });
};
exports.default = saveFile;


import multer from "multer";
import path from "path";
import fs from "fs";


export const multerUploader = () => {
    // !upload folder
    const uploadFolder = path.join(process.cwd(), "upload");
    
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    
    // multer storage
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadFolder);
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
      },
    });
    
    const upload = multer({ storage: storage });
    return upload;
};
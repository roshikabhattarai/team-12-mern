
import multer from "multer";
import path from "path";
import fs from "fs";
import AppError from "../utils/appError.utils";


export const multerUploader = () => {
    // !upload folder
    const uploadFolder = path.join(process.cwd(), "upload");
    const fileSize = 10 * 1024 * 1024;
    
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    
    // multer storage
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadFolder);
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s/g,"");
        cb(null, uniqueName);
      },
    });


    // !file filter

    // virus.exe => file-image.png
    const fileFilter: multer.Options['fileFilter']= (req, file, cb)=> {
      const allowedExtentions = /png|jpg|jpeg|webp|pdf/;
      const allowedMimeType = [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "application/pdf",
      ];
      const extName = allowedExtentions.test(
        path.extname(file.originalname).toLocaleLowerCase(),
      );
      const isAllowedMimeType = allowedMimeType.includes(file.mimetype);

      if(extName && isAllowedMimeType){
        cb(null, true);
      }else {
        const error = new AppError(
          `Only image png,jpg,jpeg,webp,pdf`,
          400,
        );
        cb(error);
      }

    }
    
    const upload = multer({
      storage: storage,
      fileFilter:fileFilter,
      limits:{
        fileSize:fileSize,
      } 
    });
    return upload;
};

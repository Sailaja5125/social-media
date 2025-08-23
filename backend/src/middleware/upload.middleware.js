// multer is a middleware for handling 

import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req ,file , cb)=>{
  if(file.mimetype.startsWith("image/")){
    cb(null , true);
  }else{
    cb(new Error("Only Image Files are allowed") , false)
  }
}
const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:5*1024*1024
    }
})

export default upload;
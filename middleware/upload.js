const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,'-')+'-'+file.originalname.replace(/\s/g,''))
    }
});

const filefilter = (req,file,cb)=>{
    if(['image/png', 'image/jpg','image/jpeg','image/gif','image/jpeg','video/mp4','video/x-msvideo','video/quicktime','video/x-ms-wmv'].includes(file.mimetype)){
        cb(null,true);
    }
    else{
        cb(null,true)
    }

}

const upload = multer({storage:storage,fileFilter:filefilter})

module.exports =upload
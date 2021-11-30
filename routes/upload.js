const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const {
  singleFileUpload,
  multipleFileUpload,
  getAllFiles,
  getAllMultiFiles,
  getAllMediaByUserId
} = require("../controllers/upload");
const { error500, error400 } = require("../util/res");
const { cloudinary } = require("../util/cloudinary");
router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFile",upload.array("files"),multipleFileUpload);
router.post("/singleFile2", async(req,res)=>{
    console.log(req.body)
    const { file }=req.body.file
    try {
        const filleStr= file;
        const uploadRes = await cloudinary.uploader.upload(filleStr,{upload_preset:"ml_default"})
        console.log(uploadRes)
    } catch (error) {
        console.log(error)
    }
  
    res.send("")
});
router.get("/getAllSingleFiles",getAllFiles)
router.get("/getAllMultipleFiles",getAllMultiFiles)
router.get('file',async(req,res)=>{
    const {resource} = await cloudinary.search.expression('folder:home')
    .sort_by('public_id','desc')
    .max_results(30)
    .execute();
    const publicIds = resource.map(file => file.public_id);
    res.send(publicIds)
})
router.get("/getAllMediaByUserId",getAllMediaByUserId)

module.exports = {
  routes: router,
};

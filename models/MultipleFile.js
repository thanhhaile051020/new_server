const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const multipleFileSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    files:[{
        type: Schema.Types.ObjectId,
        ref:'SingleFile'
    }]
},{timestamps:true})


module.exports = mongoose.model("MultipleFile", multipleFileSchema);
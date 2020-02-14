const mongoose=require('mongoose');
exports.id_convertor=(id)=>{
return mongoose.Types.ObjectId(id)
}
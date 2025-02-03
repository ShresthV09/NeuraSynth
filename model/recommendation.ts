import mongoose from "mongoose"

const promptSchema = new mongoose.Schema({
  country:{
    type:String,
    required:true,
  },
  state:{
    type:String,
  },
  userQuery:{
    type:String,
    required:true,
  },
  createdAt: { type: Date, default: Date.now }

},
{timestamps:true},
)


export default mongoose.models.recommendation || mongoose.model("Prompt",promptSchema);
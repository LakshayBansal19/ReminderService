const emailService=require('../services/email-service');

const create=async(req,res)=>{
    try{
        const response=await emailService.createNotification(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully registered the email reminder"
        });
    }catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            err:error,
            message:"Unable to register the email reminder"
        });
    }
}
module.exports={
    create
}
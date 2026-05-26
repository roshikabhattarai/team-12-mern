import ENV_CONFIG from "../config/env.config";
import tranpoter from "../config/nodemailer.config";

export const sendEmail = async () => {
    try{
        await tranpoter.sendMail({
            to:"roshikabhattarai74@gmail.com",
            from:`Project Ecommerce <${ENV_CONFIG.smtp_user}>`,
            subject:" Welcome to ecom",
            text:"Login Successfull. Welcome to ecom",
        });
        return true;

    }catch (error){
        console.log(error);
        throw error;
    }
};
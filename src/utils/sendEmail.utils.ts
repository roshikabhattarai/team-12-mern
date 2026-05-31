import Mail from "nodemailer/lib/mailer";
import ENV_CONFIG from "../config/env.config";
import tranpoter from "../config/nodemailer.config";

type TEmailOption ={
    to: string;
    subject: string;
    html: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: any[];
}

export const sendEmail = async ({to, cc,html,subject, bcc,attachments}: TEmailOption) => {
    try{
        const mailOptions:Mail.Options ={
            to: to,
            from: `Project Ecommerce <${ENV_CONFIG.smtp_user}>`,
            subject: subject,
            html:html,
        
    }
        if(cc){
            mailOptions["cc"] = cc;
        }
        if (bcc){
            mailOptions["bcc"]= bcc;
        }
        if (html){
            mailOptions["attachments"]=attachments;
        }
        
        await tranpoter.sendMail(mailOptions);

        return true;

    }catch (error){
        console.log(error);
        throw error;
    }
};
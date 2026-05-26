import nodemailer from "nodemailer";
import ENV_CONFIG from "./env.config";

// !tranpoter

const tranpoter = nodemailer.createTransport({
    host: ENV_CONFIG.smtp_host,
    service:ENV_CONFIG.smtp_service,
    port:Number(ENV_CONFIG.smtp_port)?? 587,
    secure: Number(ENV_CONFIG.smtp_port)===465,
    auth:{
    user:"ENV_CONFIG.stmp_user",
    pass:"ENV.CONFIG.stmp_user",
    },
});

export default tranpoter;



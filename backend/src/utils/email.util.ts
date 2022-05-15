
import nodemailer from "nodemailer";
import envConfig from "../configs/env.config";

export const sendEmail = async (to: string, subject: string, text: string) => {

    const transporter = nodemailer.createTransport({
            service: envConfig.email.service,
            auth:  {
                user: envConfig.email.user,
                pass: envConfig.email.pass
            }
        }
    );

    const mailDetails = {
        from: envConfig.email.user,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailDetails, (err: any) => {
        if (err) console.log(err);
    });

}
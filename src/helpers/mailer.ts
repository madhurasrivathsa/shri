
import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        //created a hasehd token
        const hashedToken =await bcryptjs.hash(userId.toString(),10);
        console.log("The emailtype is ", emailType)
        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:
                Date.now()+360000})
        }else if(emailType="REST"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:
                Date.now()+360000})
        }
        console.log("THe User value is ",User)
        var transport =nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user:process.env.MAIL_USERNAME,
              pass:process.env.MAIL_PASSWORD,
            },           
        });

        console.log("The transport values are ",transport )

        const mailOptions={
            from:'madhurasrivathsa@gmail.com',
            to:email,
            subjext:emailType==='VERIFY'?"Verify Your Email":"Rest your password",
            html:`<p>Click<a href="${process.env.domain}/
            verifyemail?token=${hashedToken}">here</a> to $
            {emailType==='VERIFY'?"Verify Your Email":"Rest your password"}</p>`
        }
          const mailresponse =   await transport.sendMail(mailOptions);
          console.log("The Mail Response is ",mailresponse)
          return mailresponse;
        
    } catch (error:any) {
        throw new Error(error.message)

    }
}

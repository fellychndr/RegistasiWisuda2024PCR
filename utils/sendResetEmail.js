import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tumbal3014@gmail.com',
            pass: 'oufo rput cvqv ayun',
        },
    });

    const mailOptions = {
        to: email,
        from: 'passwordreset@yourdomain.com',
        subject: 'Password Reset',
        html: `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the button below to reset your password:</p>
        <a href="${process.env.LINKURL}/reset/${token}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; 
        background-color: #007bff; text-decoration: none; border-radius: 5px;">
        Reset Password
        </a>
        <p>If the button doesn't work, please copy and paste the following link into your browser:</p>
        <p><a href="${process.env.LINKURL}/reset/${token}">${process.env.LINKURL}/reset/${token}</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};
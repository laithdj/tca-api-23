const nodemailer = require("nodemailer");
const htmlFormates = require('../views/htmlFormates')
const emailFormat = require('email-body-format')
module.exports = {
    send: async (to, subject, template, data, filePath) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        console.log(`${__dirname}/public${filePath}`)
        let mailOption = {
            from: process.env.EMAIL_FROM, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            // html: emailFormat(htmlFormates[template], data), // html body
            html: template,
            // attachments: [
            //     {
            //         filename: "student_application.pdf",
            //         // path: `http://localhost:3000/public/${filePath}`,
            //         path: `http://localhost:3000/public/applicantsResume/c3d23b86-bb0e-4b9c-80cf-f4208cc0dfe402_preview2.jpg`
            //     }]
        };

        if (filePath) {
            mailOption['attachments'] = [
                {
                    filename: filePath.split('/').pop(),
                    path: `http://localhost:3000/public/${filePath}`
                    // path: `http://localhost:3000/public/applicantsResume/c3d23b86-bb0e-4b9c-80cf-f4208cc0dfe402_preview2.jpg`
                }
            ]
        }
        console.log('email')
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error)
            }
        })


    }
}


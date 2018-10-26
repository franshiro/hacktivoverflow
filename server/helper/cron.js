var CronJob = require('cron').CronJob;
const User = require('../models/user')
const Article = require('../models/article')
const mongoose =require('mongoose')
const sgMail = require('@sendgrid/mail')

class Cron{
    static sendEmail(userEmail, id){
        // console.log(userEmail, userId)
        const userId = new mongoose.Types.ObjectId(id);
        Article.find({}).populate('user')
        .then(article => {
            const result = article.filter(function (datum) {
                return userId.equals(datum.user._id);
            });
            new CronJob('* 0 0 * * 7', function() {
                console.log(userEmail, result.length)
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                to: userEmail,
                from: 'franshiromedia@gmail.com',
                subject: 'Weekly Report',
                text: `Your weekly report`,
                html:`
                <div>
                    <h1>Hello, ${userEmail}</h1>
                    <br/>
                    <br/>
                    <pp>this is your weekly report for your contributions</p><br/>
                    <p>You have " ${result.length} " Question until now,</p>
                    <br/>
                    <br/>
                    <p>Are You get your solution ?</p>
                </div>
                        `,
                };
                sgMail.send(msg);
            }, null, true, 'Asia/Jakarta');
        })
        .catch(err => {
            // res.status(500).json({error: err.message})
            console.log(err)
        })
    }
}

module.exports = Cron

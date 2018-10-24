var CronJob = require('cron').CronJob;

module.exports = function kirimEmail(email){
    new CronJob('* 0 0 * * 7', function() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
        to: user.email,
        from: 'franshiro@gmail.com',
        subject: 'Registration Success',
        text: `thansk for your Registration
                `,
        html: `
                This is Your Weekly report`,
        };
        sgMail.send(msg);

    }, null, true, 'Asia/Jakarta');
}

'use strict';
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')
// import mongoose from 'mongoose'
// mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://gabotronics:Kintos#3312@ds111565.mlab.com:11565/heroku_pwjvwks3');
// import User from './model'
import { MongoClient } from 'mongodb'

export const confirmationReminder = (user) => {
    let transporter = nodemailer.createTransport({
        host: 'mail.kintos.mx',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'contacto@kintos.mx',
            pass: '3]X-Hsx5ID6i'
          },
        tls: { rejectUnauthorized: false }
    });

    transporter.use('compile', hbs({
        viewPath: 'views',
        extName: '.hbs'
    }));

    let mailOptions = {
        from: '"Kintos 👻" <no-reply@kintos.mx>', // sender address
        to: user.email, // list of receivers
        subject: 'Kintos ya esta aqui!', // Subject line
        text: 'Verifica tu cuenta para poder usar Kintos', 
        template: './RecordatorioVerificateAhora.html',
        context: {
            link:`http://kintos-api.herokuapp.com/users/verify?&email=${user.email}&verification=${user.verificationString}`
        }
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("No se pudo mandar correo a: " +  user.name);
            console.log(error);
        }else{
            console.log("Correo mandado a: " + user.name)
        }
    });
}

export const sendMails = (req, res, next) => {
    MongoClient.connect('mongodb://localhost' , (err, client) => {
        if(err) throw err
        const db = client.db('kintos-backend-dev')

        db.collection('users').find({emailVerified:false}).toArray( (err, result) =>{
            if(err) throw err
            console.log(result)
            for(let i = 0; i < result.length; i++){
                confirmationReminder(result[i])
            }
            res.status(200).json(result.length)
        })

        client.close()

    })
}
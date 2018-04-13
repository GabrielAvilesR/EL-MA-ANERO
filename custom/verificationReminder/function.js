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
            user: 'no-reply@kintos.mx',
            pass: 'Kintos#3312Maya'
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
    MongoClient.connect('mongodb://ds111565.mlab.com:11565',{auth: {user:'gabotronics', password:'Kintos#3312'}}, (err, client) => {
        if(err) throw err
        const db = client.db('heroku_pwjvwks3')

        db.collection('users').find({}, (err, result) =>{
            if(err) throw err
            console.log(result)
        })

        client.close()

    })
}
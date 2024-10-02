import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: (req, res) => {
        const { email, password, rePassword } = req.body;
        // check if user exist
        const emailExist = User.getByEmail(email);
        if (emailExist) {
            return res.status(400).render('404', {
                title: 'User already exist',
                message: 'User already exist'
            });
        }
        // Validate the email and password
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doMatchPasswords = matchPasswords(password, rePassword);

        if ((isValidEmail, isValidPassword, doMatchPasswords)) {
            // Hash the password
            const hashedPassword = hashPassword(password);
            // Create user
            User.add({ email, password: hashedPassword });
            // Redirect to login
            return res.status(201).redirect('/api/login');
        } else {
            return res.status(400).render('404', {
                title: 'Invalid email or password',
                message: 'Invalid email or password'
            });
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        // check if user exist
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'Please, register',
                message: 'Email does not exist. Please, register'
            });
        }

        // Check the match email and password
        bcrypt.compare(password, emailExist.password, (err, valid) => {
            if (err) {
                console.error(err);
            }
            if (!valid) {
                return res.status(400).render('404', {
                    title: 'Invalid password or email',
                    message: 'Invalid password or email'
                });
            }

            // Create token
            const token = jwt.sign({ email }, process.env.TOKEN_SECRET);

            // Create cookie
            res.cookie('token', token, { httpOnly: true });
            res.status(302).redirect('/api/flights');
        });
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(302).redirect('/api/login');
    },
    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;

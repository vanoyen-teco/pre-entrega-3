const passport = require('passport');
const local = require('passport-local');
const users = require('./User');
const logger = require("../config/logger");

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            {   passReqToCallback: true,
                usernameField: 'email',
                passwordField: 'password'
            },
            async (req, username, password, done) => {
                let name = req.file.mimetype
                name = name.split('/');
                name = req.file.filename+'.'+name[1];
                try {
                    let user = await users.findOne({ email:username })
                    if (user) return done(null, false)
                    const newUser = {
                        email: req.body.email,
                        password,
                        nombre: req.body.nombre,
                        direccion: req.body.direccion,
                        edad: parseInt(req.body.edad),
                        telefono: req.body.fullPhone,
                        imagen: name,
                    }
                    try {
                        let result = await users.create(newUser)
                        return done(null, result)
                    } catch(err) {
                        logger.loggerError.error(`Error en Create user: ${err}`);
                        done(err)
                    }
                } catch(err) {
                    logger.loggerError.error(`Error en Register: ${err}`);
                    done(err)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async(username, password, done) => {
                try {
                    let user = await users.findOne({ email:username })
                    if (!user) return done(null, false);
                    const comp = user.comparePassword(password, user.password);
                    if(comp){
                        return done(null, user);                        
                    }else{
                        return done(null, false);
                    }
                } catch(err) {
                    logger.loggerError.error(`Error en Login: ${err}`);
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    })
}

module.exports = {
    initializePassport,
}
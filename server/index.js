import express from 'express'

import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import GoogleStrategy from 'passport-google-oauth20'

import { google } from './config/auth'
import { access } from 'fs';
import { userInfo } from 'os';

const transformGoogleProfile = profile => ({
    name: profile.displayName,
    avatar: profile.image.url
})

passport.use(new GoogleStrategy(
    google,
    async (accessToke, refreshToke, profile, done)
        => done(null, transformGoogleProfile(profile._json))
))

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((user, done) => done(null, user))

const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google', () => {
    passport.authenticate('google', {scope: ['profile']})
})

app.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/auth/google'}),
    (req, res) 
        => res.redirect(`OAuthLogin://login?user=${JSON.stringify(req.user)}`)
)

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
});
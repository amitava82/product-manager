/**
 * Created by amitava on 08/02/16.
 */

var Promise = require('bluebird');
var _ = require('lodash');


module.exports = function(deps){

    return {

        oauthCallback: function(req, res, next){
            var returnUrl = req.session.return;
            if(returnUrl){
                delete req.session.return;
            }else{
                returnUrl = '/';
            }

            deps.passport.authenticate(req.params.module, {
                successRedirect: returnUrl,
                failureRedirect: '/login' }
            )(req, res, next)
        },


        login: function(req, res, next){
            //TODO user login logic
            req.session.return = req.query.return;
            deps.passport.authenticate(req.params.module, {scope: deps.config.get('auth.spotify.scope')}, function(err, user,info){
                if(err){
                    next(err);
                }else if(!user){
                    next(new Error(info.message));
                }else{
                    req.login(user, loginErr => {
                        if (loginErr) {
                            return next(loginErr);
                        }
                        return res.send(user);
                    });
                }
            })(req, res, next);
        },

        logout: function(req, res){
            req.logout();
            res.redirect('/');
        }
    }
};
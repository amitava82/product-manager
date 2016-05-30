/**
 * Created by amitava on 09/02/16.
 */
var config = require('config');
var _ = require('lodash');
var url = require('url');

module.exports = function(deps){
    var passport = require('passport');

    function callbackUrl(module){
        var port = deps.config.get('ui.port');
        return url.format({
            hostname: deps.config.get('ui.host'),
            port:  (port == 80 || port == 443) ? "" : deps.config.get('ui.port'),
            protocol: deps.config.get('ui.protocol'),
            pathname: 'auth/'+module+'/callback'
        });
    }

    function _callback(accessToken, refreshToken, profile, cb){
        var User = deps.models.User;
        var oauthId = profile.id;
        var photo = _.get(profile, 'photos[0]');

        //TODO auth logic
        User.findOne({_id: oauthId}, {lean: true}, (err, user) => {
            if(err){
                cb(err);
            }else if(!user) {
                //TODO no account, create
                
            }else{
                //account exists, 
                cb(null, user)
            }
        });
    }
    
    //TODO Define strategy

    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {
        //TODO fetch user
        cb();
    });

    return passport;
};
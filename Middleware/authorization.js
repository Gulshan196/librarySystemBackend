
class Authorization {
    static checkRole(role) {
        return function(req, res, next) {
          console.log('cookie used = ' ,req.session );
          if (req.session.role === role) {
            next();
          } else {
            res.send("Access denied");
          }
        }
      } 
}

module.exports = Authorization;
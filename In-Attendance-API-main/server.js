var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var md5 = require('MD5');
var rest = require("./rest.js");
var cors = require('cors');
var app  = express();
app.use(cors());
function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'database-devhub-in-attendance.crh3urkarnix.us-east-1.rds.amazonaws.com',
        user     : 'admin',
        password : 'DtG2669!!',
        database : 'in_attendance',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(pool);
        }
    });
}

REST.prototype.configureExpress = function(pool) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/', router);
      var rest_router = new rest(router,pool,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(8080,function(){
          console.log("All right ! I am alive at Port 8080.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();

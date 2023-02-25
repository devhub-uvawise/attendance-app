function REST_ROUTER(router, pool) {
  var self = this;
  self.handleRoutes(router, pool);
}


REST_ROUTER.prototype.handleRoutes = function (router, pool) {
  router.get("/", function (req, res) {
    res.json({
      Message: "In Attendance API",
    });
  });


  router.get("/professor/:id", function (reg, res) {
    email = reg.params.id
    var query =
      "SELECT professor_id FROM PROFESSOR NATURAL JOIN CLASS WHERE professor_email = " + email;
    pool.getConnection(function (err, connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        var result = {};
        result["data"] = rows;
        res.json(result);
      });
    });
  });
  router.get("/student/:classId/class", function (reg, res) {
    const { classId } = reg.params
    var query =
      "SELECT * FROM STUDENT NATURAL JOIN ENROLLS NATURAL JOIN CLASS WHERE enrolls_class_id = " + classId + " AND class_id = enrolls_class_id";
    pool.getConnection(function (err, connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        var result = {};
        result["data"] = rows;
        res.json(result);
      });
    });
  });


  router.get("/professor/:id/class", function (reg, res) {
    proId = reg.params.id
    var query = 
      "SELECT * FROM PROFESSOR NATURAL JOIN TEACHES NATURAL JOIN CLASS WHERE professor_id = " + proId;
    pool.getConnection(function (err, connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        var result = {};
        result["data"] = rows;
        res.json(result);
      });
    });
  });
  router.get("/professor/:proId/class/:classId", function (reg, res) {
    const { proId, classId } = reg.params
    var query = 
      "SELECT * FROM PROFESSOR NATURAL JOIN TEACHES NATURAL JOIN CLASS NATURAL JOIN LECTURE WHERE professor_id = " + proId + " AND class_id = " + classId + " AND class_id = lecture_class_id";
    pool.getConnection(function (err, connection) {
      connection.query(query, function (err, rows, fields) {
        connection.release();
        if (err) {
          console.log(err);
          return;
        }
        var result = {};
        result["data"] = rows;
        res.json(result);
      });
    });
  });

};

module.exports = REST_ROUTER;

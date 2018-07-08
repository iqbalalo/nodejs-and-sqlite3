var express = require('express')
var app = express()
var sqlite = require('sqlite3').verbose()
var db = new sqlite.Database('test_db', (err) => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to the database.')
})

db.serialize(function() {
    db.run("CREATE TABLE test (id INT)")
    
    var stmt = db.prepare("INSERT INTO test VALUES (?)")
    for (var i = 1; i < 11; i++) {
        stmt.run(i)
    }
    stmt.finalize()
});

//  db.close((err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });

app.get('/', function (req, res){
    db.all("SELECT * FROM test", [], (err, rows) => {
        if (err) {
            return err
        }
        var array = rows.map(function(item) {
            return item.id
        });
        
        // console.log(array)
        res.send(array)
    });
    // db.close();
})

app.listen(8080, function(){
    console.log('app listening on port 8080')
})
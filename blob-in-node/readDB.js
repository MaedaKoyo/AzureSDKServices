const mysql = require('mysql');
const fs = require('fs');

var config =
{
    host: '',
    user: '',
    password: '',
    database: '',
    port: 0000,
    ssl:{ca:fs.readFileSync("")}//ssl証明書

    //さらに、azure portal でクライアントのIPアドレスをファイヤーウォールに追加する必要あり
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
        if (err) { 
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            readData();
        }
    });

function readData(){
    conn.query('SELECT * FROM inventory', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');
        })
    conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};
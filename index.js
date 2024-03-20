const connection = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json())

app.get('/employees', (req, res) => {
    connection.query('select*from emp', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(rows);
            res.send(rows)
        }
    })
})
app.get('/employees/:id', (req, res) => {
    connection.query('select*from emp where id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(rows);
            res.send(rows)
        }
    })
})
app.delete('/employees/:id', (req, res) => {
    connection.query('delete from emp where id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(rows);
            res.send(rows)
        }
    })
})

app.post('/employees', (req, res) => {
    let empData = req.body;
    connection.query('INSERT INTO emp (id, name, salary) VALUES (?, ?, ?)', [empData.id, empData.name, empData.salary], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.patch('/employees', (req, res) => {
    let empData = req.body;
    connection.query('update  emp set ? where id=+ ' + empData.id, [empData], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.put('/employees', (req, res) => {
    let empData = req.body;
    connection.query('update  emp set ? where id=+ ' + empData.id, [empData], (err, rows) => {
        if (err) {
            console.log(err);
        } else{
            if(rows.affectedRows==0){
                let empData = req.body;
                connection.query('INSERT INTO emp (id, name, salary) VALUES (?, ?, ?)', [empData.id, empData.name, empData.salary], (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rows);
                    }
                });
            }else{
                res.send(rows)
            }
        }
    });
});


app.listen(3000, () => console.log("express server is running on port 3000"));

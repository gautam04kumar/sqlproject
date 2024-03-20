const mySql=require('mysql');
let mysqlConnection=mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'empolyee'
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in DB connection'+JSON.stringify(err,undefined,2))
    }
    else{
        console.log('DB connected successfully');
    }
})
module.exports=mysqlConnection


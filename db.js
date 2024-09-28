var mysql=require('mysql2');

const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'***',
    database:'ideaSparkDatabase'
});

function getUser(){
    return new Promise((suc,rej)=>{
        conn.query(`select * from users`,(err,rows,cols)=>{
            if(err){
                rej(err)}
            else{
                suc(rows)
            }
        })
    })
}

function enterUsers(data){
    return new Promise((suc,rej)=>{
        conn.query(`insert into users (email,password) values (?,?)`,[data.email,data.password],(err,res)=>{
            if(err){
                rej(err);
            }
            else{
                suc(res);
            }
        })
    })
}

function addIdeas(email, password, name, problemstatement, image_url, domain)
{
    return new Promise((suc,rej)=>{
        conn.query(`INSERT INTO edps (email, password, name, problemstatement, image_url, domain) VALUES (?, ?, ?, ?, ?, ?)`, [email, password, name, problemstatement, image_url, domain],(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}

function getIdeas(){
    return new Promise((suc,rej)=>{
        conn.query(`select * from edps`,(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}

function deleteIdeas(id){
    return new Promise((suc,rej)=>{
        conn.query(`delete from edps where id=?`,[id],(err,res)=>{
            if(err){
                rej(err);
            }
            else{
                suc(res);
            }
        })
    }) 
}

function editIdeas(id, name, problemstatement, image_url, domain)
{
    return new Promise((suc,rej)=>{
        conn.query(`update edps set name=?, problemstatement=?, image_url=?, domain=? where id=?`, [name, problemstatement, image_url, domain, id],(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}

function addIdea(email, password, name, problemstatement, image_url, domain)
{
    return new Promise((suc,rej)=>{
        conn.query(`INSERT INTO hcps (email, password, name, problemstatement, image_url, domain) VALUES (?, ?, ?, ?, ?, ?)`, [email, password, name, problemstatement, image_url, domain],(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}

function getIdea(){
    return new Promise((suc,rej)=>{
        conn.query(`select * from hcps`,(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}

function deleteIdea(id){
    return new Promise((suc,rej)=>{
        conn.query(`delete from hcps where id=?`,[id],(err,res)=>{
            if(err){
                rej(err);
            }
            else{
                suc(res);
            }
        })
    }) 
}

function editIdea(id, name, problemstatement, image_url, domain)
{
    return new Promise((suc,rej)=>{
        conn.query(`update hcps set name=?, problemstatement=?, image_url=?, domain=? where id=?`, [name, problemstatement, image_url, domain, id],(err,result)=>{
            if(err){
                rej(err);
            }
            else{
                suc(result);
            }
        })
    }) 
}


module.exports={
    getUser,enterUsers,addIdeas,getIdeas,deleteIdeas,editIdeas,addIdea,getIdea,deleteIdea,editIdea
}
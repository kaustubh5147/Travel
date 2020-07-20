const express=require('express');
const db=require('../config/database');
const router=express.Router();
router.post('/add',(req,res)=>{
    const {name,location,cost,type}=req.body;
    let sql='insert into hotel set ?';
    let body={name:name,location:location,cost:cost,type:type};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','hotel created');
            res.redirect('/admin/hotel');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/hotel');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from hotel where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                genre:result[0]
            });
        }
        else
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
    });
});
router.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from hotel where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'hotel deleted'
            });
        }
        else
        {
            res.status(401).json({
                msg:'error occured',
                error:err
            });
        }
    });
});
module.exports=router;
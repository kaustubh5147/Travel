const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {name}=req.body;
    let sql='insert into type set ?';
    let body={name:name};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','type created');
            res.redirect('/admin/type');
        }
        else
        {
            req.flash('error',err);
            req.redirect('/admin/type');
        }
    });
});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from type where id=?';
    let body=[id];
    db.query(sql,bod,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                type:result[0]
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
router.put('/:id',(req,res)=>{
    const {id}=req.params;
    const {type}=req.body
    let body=[timing,id];
    let sql='update type set type=? where id=?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'type updated'
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
    let {id}=req.params;
    let body=[id];
    let sql='delete from type where id=?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'type deleted'
            });
        }
        else
        {
            res.status(401).json({
                msg:'errror occured',
                error:err
            });
        }
    });
});
module.exports=router;
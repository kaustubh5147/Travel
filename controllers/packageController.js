const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {name,cost}=req.body;
    let body={name:name,cost:cost};
    let sql='insert into package set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','package created');
            res.redirect('/admin/package');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/package');
        }
    });

});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from package where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                package:result[0]
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
    let {id}=req.params;
    let {id,name,cost}=req.body;
    let sql='update package set travel=? , timing=? where id=?';
    let body=[id,name,cost];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'package updated'
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
router.delete('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='delete from package where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'package deleted'
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
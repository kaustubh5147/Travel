const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/add',(req,res)=>{
    const {name}=req.body;
    let body={name:name};
    let sql='insert into location set ?';
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','location created');
            res.redirect('/admin/location');
        }
        else
        {
            req.flash('error',err);
            res.redirect('/admin/location');
        }
    });

});
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let sql='select * from location where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                location:result[0]
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
    let {id,name}=req.body;
    let sql='update location set travel=? , name=? where id=?';
    let body=[id,name,id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'location updated'
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
    let sql='delete from location where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'location deleted'
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
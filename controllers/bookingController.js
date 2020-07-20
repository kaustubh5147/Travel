const express=require('express');
const router=express.Router();
const db=require('../config/database');
router.post('/book',(req,res)=>{
    const {name,persons,cost,date,type}=req.body;
    let sql='insert into bookings set ?';
    let body={name:name,persons:persons,cost:cost,date:date,type:type};
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('success_msg','booking confirmed');
            res.redirect('/');
        
        }
        else
        {
                req.flash('error',err);
                res.redirect('/');
        }
    });
});
router.delete('/:id',(req,res)=>{
    let {id}=req.params;
    let sql='delete from bookings where id=?';
    let body=[id];
    db.query(sql,body,(err,result)=>{
        if(!err)
        {
            res.status(200).json({
                msg:'booking cancelled'
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
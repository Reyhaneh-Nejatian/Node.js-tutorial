const express = require('express');

const router = express.Router();

const {check, validationResult} = require('express-validator');

let users = require('../users');  //گرفتن یوزرها


router.get('/', function(req, res){    //ریسپانس کل یوزرها

    // res.status(200).json({    //api
    //     data : users,
    //     success : true
    // });

    res.render('users', {users, errors : req.flash('errors')} );   //viewe
});


router.get('/:id', function(req, res){   //ریسپانس یک یوزر
    let user = users.find(user=>{
        if(user.id == req.params.id){
            return user;
        }
    });

    // res.status(200).json({  //api
    //     data : user,
    //     success : true
    // });

    return res.render('user', {user});  //view
});

router.post('/', [           // ایجاد یک کاربر جدید
    check('name', 'اسم باید از نوع رشته باشد').isString(),
    check('age', 'سن باید از نوع عدد باشد').isNumeric()
], function(req, res){
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        //  return res.status(422).json({    //api
        //      errors : errors.array(),
        //  });

        req.flash('errors', errors.array());
        return res.redirect('/user'); //viewe

     }
     req.body.id = parseInt(req.body.id);
     users.push(req.body);

    //  res.status(200).json({     api
    //      data : "کاربر جدید با موفقیت اضافه شد",
    //      success : true
    //  });

    return res.redirect('/user');
});


router.put('/user:id', [    //ویرایش کاربر
    check('name', 'اسم باید از نوع رشته باشد').isString(),
    check('age', 'سن باید از نوع عدد باشد').isNumeric()
], function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(422).json({
            errors : errors.array(),
        });
    }

    users = users.map(user=>{
        if(user.id == req.params.id){
            return req.body;
        }else{
            return user;
        }
    })

    // res.status(200).json({  //api
    //     data : "کاربر با موفقیت ویرایش شد",
    //     success : true
    // });

    return res.redirect('/user');
})

router.delete('/:id', function(req, res){
    users = users.filter(user=>{
        if(user.id != req.params.id){
            return user;
        }
    });

    // res.status(200).json({     //api
    //     data : "کاربر حذف شد",
    //     success : true
    // });

    return res.redirect('/user');
})



module.exports = router;
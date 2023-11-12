const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const users = require('../users');  //گرفتن یوزرها


router.get('/', function(req, res){    //ریسپانس کل یوزرها

    // res.status(200).json({    //api
    //     data : users,
    //     success : true
    // });

    res.render('users', {users} );   //viewe
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

        // req.flash('errors', errors.array());
        return res.redirect('/user'); //viewe

     }
     req.body.id = parseInt(req.body.id);
     users.push(req.body);

    //  res.status(200).json({     api
    //      data : "کاربر جدید با موفقیت اضافه شد",
    //      success : true
    //  });

    return res.redirect('/');
});

router.put('/:id', function (req, res) {
    console.log('jjj');
});


// router.delete('/user/:id', (req, res) => {
//     const resourceId = req.params.id;
//     // انجام عملیات حذف با ID مشخص
//     res.send(`رکورد با ID ${resourceId} حذف شد.`);
//   });

router.delete('/user/:id', function(req, res){

    console.log('ll');
    users = filter(user=>{
        if(user.id != req.params.id){
            return user;
        }
    });

    // res.status(200).json({     //api
    //     data : "کاربر حذف شد",
    //     success : true
    // });

    return res.redirect('/user');
});

router.delete('/delete/:id', (req, res) => {
    console.log('pp');
});



module.exports = router;

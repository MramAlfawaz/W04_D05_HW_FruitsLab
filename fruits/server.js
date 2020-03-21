const express = require('express'); //
const mongoose = require('mongoose'); //
const ejs = require('ejs'); //
const methodOverride = require("method-override");
const Fruit = require('./models/fruits.js');
const app = express(); //


app.use(express.static("public"));


// parse requests of content-type - application/json
app.use(express.json())

app.use(express.urlencoded({ extended: false }));


mongoose.connect('mongodb://localhost/fruits',  
{useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('mongodb is running'),
(err)=> console.log(err) ); //

app.set("view engine", "ejs"); //
app.use(methodOverride("_method"));




//simple route
app.get('/' , (req , res) =>{

    Fruit.find()
    .then(fruits =>{

        res.render('index', {fruits})
    })
   
})

app.get('/create', (req, res) => {

    res.render('create')
});

app.post('/create' , (req , res) =>{
    console.log(req.body)
    Fruit.create(req.body)
    .then((fruits)=>{
        console.log(fruits)
        res.redirect('/')
    }).catch((err) => console.log(err))
  
    });



//show page
app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id)
     .then ( fruits => {
        res.render('show', {fruits});
    });
});



app.get('/update/:id', (req, res) => {
  
    res.render('update' , {id : req.params.id})
});



app.put('/edit/:id', (req,res)=>{
    // if(req.body.readyToEat === 'on'){
    //     req.body.readyToEat = true;
    // } else {
    //     req.body.readyToEat = false;
    // }
    
    Fruit.findByIdAndUpdate(req.params.id, {name : req.body.name , color : req.body.color , size :req.body.size})
    .then(()=>{
        res.redirect('/')
    }) .catch(err => console.log(err))
})




app.delete('/delet/:id' , (req , res) =>{

    Fruit.findByIdAndDelete(req.params.id)
    .then(()=>{

        res.redirect('/')
    }).catch(err => console.log(err))

})




// listen for requests
app.listen(7000, () => {
   console.log("running on port 7000");
}); //


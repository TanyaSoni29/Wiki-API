const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB",{useNewUrlParser: true});


const articleSchema ={
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);


////////////////////// All Articles /////////////////////////////////////////////


app.route("/articles")

.get(function(req,res){

   foundArticles = Article.find()
   .then( (foundArticles) =>{
    res.send(foundArticles);
   })
   .catch( (error)=>{
    res.send(error);
   }); 
})

.post( function(req,res){
   

const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
});
newArticle.save()
.then( () =>{
    res.send("Successfully added new article.");
})
.catch( (error) =>{
 res.send(error);
});
})

.delete(function(req,res){
    Article.deleteMany()
    .then( () =>{
        res.send("Successfully deleted all articles.");
    })
    .catch( (error) =>{
     res.send(error);
    });
});


 ////////////////////////// Specific Article ////////////////////////////////////////////////


 app.route("/articles/:articleTitle")

 .get(function(req,res){
foundArticle = Article.findOne({title: req.params.articleTitle})
.then( (foundArticle) =>{
    res.send(foundArticle);
   })
   .catch( (error)=>{
    res.send(error);
   }); 

 })

.put(function(req,res){
    Article.updateOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite: true})
.then( () =>{
    res.send("Successfully updated article.");
})
.catch( (error) =>{
 res.send(error);
});
})

.patch(function(req,res){
    Article.updateOne({title: req.params.articleTitle}, {$set: req.body})
    .then( () =>{
        res.send("Successfully updated article.");
    })
    .catch( (error) =>{
     res.send(error);
    });
    })

    .delete(function(req,res){
        Article.deleteOne({title: req.params.articleTitle})
        .then( () =>{
            res.send("Successfully deleted article.");
        })
        .catch( (error) =>{
         res.send(error);
        });
    });









app.listen(3000,function(){
    console.log("server has started on port 3000!");
})
//jshint esversion:6
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/journalDB", {useNewUrlParser: true, useUnifiedTopology: true});

// defaultPosts

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = new Post ({
  title: "home",
  content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});

const aboutContent = new Post ({
  title: "about",
  content: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
});

const contactContent = new Post({
  title: "contact",
  content: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
});

const defaultPosts = [homeStartingContent, aboutContent, contactContent];

// routes
app.get('/', function(req, res){

  Post.find({}, function(err, foundPosts){
    if (foundPosts.length === 0) {
      Post.insertMany(defaultPosts, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully saved default content to DB!");
        }
      });
      res.redirect('/');
    } else {
      Post.findOne({ title: "home" }, function(err , foundPost){
        if (!err) {
          res.render('home', { homeConent: foundPost });
        }
      });
    }
  });
});

app.get('/about', function(req, res){
  Post.findOne({ title: "about" }, function(err , foundPost){
    if (!err) {
      console.log()
      res.render('about', { aboutContent: foundPost });
    }
  });
});

app.get('/contact', function(req, res){
  Post.findOne({ title: "contact" }, function(err , foundPost){
    if (!err) {
      console.log()
      res.render('contact', { contactContent: foundPost });
    }
  });
});

app.get('/compose', function(req, res){
  res.render("compose");
});

app.post('/compose', function(req, res){
  const postTitle = _.lowerCase(req.body.postTitle);
  const postContent = req.body.postBody;

  var newPost = new Post({
    title: postTitle,
    content: postContent
  });

  Post.findOne( {title: postTitle}, function(err, foundPost){
    if (!err) {
      if (!foundPost) {
        // create, push, save, and redirect to homepage
        newPost.save(function (err) {
          if (!err) {
            res.redirect('/');
          } else {
            res.redirect('/compose');
          }
        });
      } else {
        console.log(foundPost);
        res.redirect('/compose');
        console.log("I'm sorry, this title matches a current post, please pick a new one!");
        }
      }
    });
});

app.get('/posts/:postTitle', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postTitle);

  for (var i=0; i<posts.length; i++) {
    const storedTitle = _.lowerCase(posts[i].title);
      if (requestedTitle == storedTitle) {
        console.log(storedTitle);
        res.render("post", {
          currentPost: posts[i]
        });
        return;
      }
  }
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

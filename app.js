//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [
  {
    title: 'Test',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vestibulum lorem sed risus ultricies tristique nulla. Tristique et egestas quis ipsum suspendisse. Nibh praesent tristique magna sit amet purus gravida quis blandit. Blandit massa enim nec dui nunc mattis. Fames ac turpis egestas sed tempus urna et pharetra pharetra. Non consectetur a erat nam at lectus. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Massa sapien faucibus et molestie ac feugiat sed lectus. Duis ut diam quam nulla porttitor massa. Mauris augue neque gravida in.'
  },
  {
    title: 'Testing',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus imperdiet nulla malesuada pellentesque elit eget gravida. Quam pellentesque nec nam aliquam sem et. Adipiscing elit pellentesque habitant morbi tristique senectus et. Lorem sed risus ultricies tristique nulla aliquet. Consequat ac felis donec et odio. Vulputate dignissim suspendisse in est ante. Turpis egestas integer eget aliquet nibh praesent tristique magna. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Urna porttitor rhoncus dolor purus non enim praesent elementum.'
  },
  {
    title: 'Another Post',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Faucibus a pellentesque sit amet porttitor eget dolor morbi. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Euismod elementum nisi quis eleifend quam adipiscing vitae proin. Semper risus in hendrerit gravida rutrum quisque non. Amet cursus sit amet dictum sit amet. Id porta nibh venenatis cras sed felis eget. Cras tincidunt lobortis feugiat vivamus at augue eget. Risus nullam eget felis eget nunc lobortis mattis. Enim ut sem viverra aliquet eget sit amet. Aenean vel elit scelerisque mauris pellentesque pulvinar. Ut etiam sit amet nisl purus in. Massa sed elementum tempus egestas sed sed. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Venenatis lectus magna fringilla urna porttitor. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Ut faucibus pulvinar elementum integer.'
  }
];

app.get('/', function(req, res){
  res.render("home", {
    homeConent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get('/contact', function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get('/compose', function(req, res){
  res.render("compose");
});

app.post('/compose', function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postTitle', function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postTitle);

  for (var i=0; i<posts.length; i++) {
    const storedTitle = _.lowerCase(posts[i].title);
      if (requestedTitle == storedTitle) {
        res.render("post", {currentPost: posts[i]});
        return;
      }
  }
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

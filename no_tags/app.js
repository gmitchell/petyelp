var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose")

mongoose.connect("mongodb://localhost:27017/pet-yelp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var locationSchema = new mongoose.Schema({
  name: String,
  image: String,
  discription: String
})

var Location = mongoose.model("Location", locationSchema);

// INDEX - Show all locations
app.get("/", function(req, res){
  Location.find({}, function(err, alllocations){
    if(err){
      console.log(err)
    } else {
      res.render("index", {locations: alllocations})
    }
  })
})

// GET - Show more info about one campground
app.get("/locations", function(req, res){
  Location.find({}, function(err, alllocations){
    if(err){
      console.log(err)
    } else {
      res.render("index", {locations: alllocations})
    }
  })
});

// NEW - Show new location form
app.get("/locations/new", function(req, res){
  res.render("new");
});

// CREATE - Create a new location, then redirect home
app.post("/locations", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.discription;
  var newLocation = {name: name, image: image, discription: desc}
  Location.create(newLocation, function(err, newlyCreated){
    if(err){
      console.log(err)
    } else {
      res.redirect("/");
    }
  })
});

// SHOW - show more info about one location
app.get("/locations/:id", function(req, res){
  Location.findById(req.params.id, function(err, foundLocation){
    if(err){
      console.log(err)
    } else {
      res.render("show", {location: foundLocation});
    }
  });
});

app.listen(80, process.env.IP, function(){
  console.log("The PetYelp Server Has Started!!");
});

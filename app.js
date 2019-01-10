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

// Location.create(
//   {
//     name: "Big Bear Camp",
//     image: "https://images.onepixel.com/00e5cad5-1209-37b8-b774-9bb558675f03_1000.jpg?auto=format&q=55&mark=watermark%2Fcenter-v5.png&markalign=center%2Cmiddle&h=364&markalpha=20&s=d5f904a9deaafa0e181146f4c577ebfb",
//     discription: "There are a lot of big bears here. They are all friendly and want hugs."
//   }, function(err, location){
//     if(err){
//       console.log("Something went wrong");
//       console.log(err)
//     } else {
//       console.log('Location added: ');
//       console.log(location);
//     }
//   });

// Location.create({
//   name: "Salmon Creek",
//   image: "https://images.onepixel.com/c811c509-a1de-b06a-ef02-23866585a711_1000.jpg?auto=format&q=55&mark=watermark%2Fcenter-v5.png&markalign=center%2Cmiddle&h=364&markalpha=20&s=ee5394066b1ecfc34eb0dc946701eed6",
//   discription: "Catching salmon is almost a sure thing here."
// }, function (err, location) {
//   if (err) {
//     console.log("Something went wrong");
//     console.log(err)
//   } else {
//     console.log('Location added: ');
//     console.log(location);
//   }
// });

app.get("/", function(req, res){
  res.render("landing");
})

app.get("/locations", function(req, res){
  Location.find({}, function(err, alllocations){
    if(err){
      console.log(err)
    } else {
      res.render("index", {locations: alllocations})
    }
  })
});

app.get("/locations/new", function(req, res){
  res.render("new");
});

app.post("/locations", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.discription;
  var newLocation = {name: name, image: image, discription: desc}
  Location.create(newLocation, function(err, newlyCreated){
    if(err){
      console.log(err)
    } else {
      res.redirect("/locations");
    }
  })
});

// SHOW - shows more info about one campground
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

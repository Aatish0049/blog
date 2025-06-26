const express=require("express");
const app=express();
let port=8080;

const path=require("path");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts = [
  {
    id: uuidv4(),
    username: "Mark Zuckerberg",
    content: `The Visionary Behind Facebook and Meta.`,
    image: "https://hips.hearstapps.com/hmg-prod/images/facebook-founder-and-ceo-mark-zuckerberg-delivers-the-news-photo-1740153091.pjpeg?crop=1xw:1xh;center,top&resize=980:*"
  },
  {
    id: uuidv4(),
    username: "Ranbir Kapoor's Cinematic Life",
    content: `"Behind the Camera: Life, Films & Me"
Film reflections, personal anecdotes, and Bollywood stories.`,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvEEHgWB7VDCVX6B2QSJ3dSU11NQcIlgp_wk2J0Fz2e6kPqldnaOLd2Z804ey9eH58Po0&usqp=CAU"
  },
  {
    id: uuidv4(),
    username: "MS Dhoni",
    content: "Leadership Isn't About Talking, It's About Listening.",
    image: "https://media.licdn.com/dms/image/v2/C5112AQGvuO8Jk2Vl9A/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520118597226?e=2147483647&v=beta&t=TSInh7VchTQiXTwFJStJkUR7bQbJ3A7b8amkXnS1pdk"
  }
];
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts} );
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content, image } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content, image });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    if (!post) {
        return res.status(404).send("Post not found");
        // Or optionally render a custom 404 page
        // return res.render("notfound.ejs");
    }

    res.render("show.ejs", { post });
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
     let post = posts.find((p) => id === p.id);
     post.content=newContent;
     console.log(post);
     res.redirect("/posts")
    });
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});



app.listen(port,()=>{
console.log(`app is listeninig on port ${port}`);
});
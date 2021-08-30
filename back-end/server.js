const express = require('express')
//moongoose est un package  pour faire la transaction de se connecter a la base de donnée avec mongoose connect plus bas (avec npm install mongoose, voir la doc https://mongoosejs.com/docs/guide.html#definition)
const mongoose = require("mongoose")

//j'ai besoin de body-parser qui va servi pour analyser et transformer en format choisit en dessous 
const bodyParser = require("body-parser")
const data =require('./posts')
const app = express()
const port = 5000

//Pour configurer la base de donnée (voir la doc plus loin  ,mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]], https://docs.mongodb.com/manual/reference/connection-string/)
const DB = "mongodb://localhost/blog"

const { Schema } = mongoose;
app.use(bodyParser.json())
app.listen(port, () => {console.log(`J'ecoute petiit coquin http://localhost:${port}`)})

//la donction qui va permettre de se connecter car elle prend en paramtre la DB(database)
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`connexion à la DB réussie`))


app.get('/api', function (req, res) {
  res.send('welcome api basic!');
});


const postSchema = new Schema({
    
  title: {
      type: String,
      required:true
  },
 content: {
      type: String,
      required:true
  },
  createdAt: {
 
  type: String,
  index: true,
  unique:true
},
  author: {  
      type: String,
      category: String
}
})

//To use our schema definition, we need to convert our blogSchema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):
//https://mongoosejs.com/docs/guide.html#definition

const Post = mongoose.model('Post', postSchema);








//methods gets pour recuperer et renvoyer les reponses
app.get('/', function (req, res) {
  res.send(` <p>  BAsicApi Rest </p >
  <ul>
  <li>ALL posts - 
      <a href="/api/posts">api/posts</a>
  </li>

  <li>
  Single post: 1 - 
  <a href="/api/post/612ca71129b05f3566e26bda">api/posts:id</a>
  </li>
  <li>
  Single post: 2 - 
  <a href="/api/post/2">api/posts:id</a>
  </li>
  <li>
  Single post: 3 - 
  <a href="/api/post/45454">api/posts:id</a>
  </li>

</ul>`)
})



app.get('/api', function (req, res) {
  res.send('welcome api basic Rest!');
});


app.get('/api/posts', function (req, res) {
  Post.find({}, (error, posts) => {
  
      if (error) {

          res.status(400).error(error)
            return
      }
     
    console.log(posts);
    res.send(posts)
})

})

app.get('/api/post/:id', function (req, res) {
    const id = req.params.id
    Post.findById(id, (error, post) => {
       
        if (error || !post) {
            res.status(400).send({
                error: true,
                message:"Post not found"
            })
            
        } else {
            res.status(200).send({
            response: post
        })}
   })
})
app.post('/api/post/add', function (req, res) {
  const post = new Post({

      title: "new post title",
      content: "du contenu",
      createdAt: "Mon Jul 12 2021 9:40:10 GMT+0200",
      author: "author clement",
      category: "design"
  })

const{ body } = req

  newPost = new Post(body)
  newPost.save(error => {
      if (error) {
          res.status(400).send({
              error: `error adding new post ${error}`
          }
          )
          return
      }
      res.status(200).send({response:`post succefuly  added`})
  }
  )
}) 
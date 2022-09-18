const express = require('express');
const db = require('./db.js');
const app = express();
const DB = new db('data')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const handlebars = require('express-handlebars');

const hbs = handlebars.engine({
  extname: 'hbs',
  layoutsDir: './views/layouts/'
});

app.engine('hbs', hbs); 

app.set('view engine', 'hbs');


app.get("/api/productos", (req, res)=>{
  res.render("main", {layout: "registro"})
})

app.get("/api/admin", async (req, res)=>{
  const data = await DB.getAll();
  res.render("main", {layout: "productos", data})
})




























/*-------------------------------------*/
app.get('/api/productos',async (req, res) =>{
  const data = await DB.getAll();
  res.send(data)
});

app.get('/api/productos/:id',async (req, res) =>{
  const {id} = req.params;
  const data = await DB.getAll();
  const producto = data.find((producto) => producto.id == id);

  if(isNaN(parseInt(id))){
      res.status(404).send({error: true, message: 'Invalid id'});
  }else if(producto){
      res.send(producto)
  }else{
      res.send({message: 'Id not found'});        
  }
});

app.post('/api/productos', async (req, res)=>{
  const data = await DB.getAll();
  const {title,price,thumbnail} = req.body;
  const id = data.length +1;
  await DB.save({title,price, thumbnail,id});
  return res.redirect('productos')
});

app.listen(8080, ()=>{
  console.log('server iniciado'); 
})
 
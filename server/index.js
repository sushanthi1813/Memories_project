
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from "./routes/users.js"
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
  
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

 const CONNECTION_URL = "mongodb+srv://sushanthidevaraju:projectk123@cluster0.rh7e9uf.mongodb.net/?retryWrites=true&w=majority";
 // const CONNECTION_URL = 'mongodb+srv://projectk:projectk123@cluster0.8qlz4rb.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log("app listening");
})
const connectToDB = async() => {
  await mongoose.connect(CONNECTION_URL)
  console.log("connected");
}
connectToDB()
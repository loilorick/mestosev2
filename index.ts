import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import { ItemsController } from './controllers/ItemsController';

const app: Express = express();
const itemsController = new ItemsController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


declare module "express-session" {
  interface SessionData {
    auth: boolean,
    admin: boolean,
    username: String,
    loyalPass: boolean,
    errRegist:boolean,
    
  }
};


app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/", (req: Request, res: Response) => {
  itemsController.home(req, res);
});
app.get("/add", (req: Request, res: Response) => {
  itemsController.add(req, res);
});
app.get("/login", (req: Request, res: Response) => {
  itemsController.login(req, res);
});
app.get("/register", (req: Request, res: Response) => {
  itemsController.register(req, res);
});
app.post("/logout", (req: Request, res: Response) => {
  itemsController.logout(req, res);
});
app.post("/login", (req: Request, res: Response) => {
  itemsController.vhod(req, res);
});
app.post("/register", (req: Request, res: Response) => {
  itemsController.registration(req, res);
});
app.post("/add", (req: Request, res: Response) => {
  itemsController.create(req, res);
}); 
app.get("/items/:id", (req: Request, res: Response) => {
  itemsController.item(req, res);
});
app.get("/profile", (req: Request, res: Response) => {
  itemsController.profile(req, res);
});
app.post("/basket/:id", (req: Request, res: Response) => {
  itemsController.basket(req, res);
});
app.get("/changeItem/:id", (req: Request, res: Response) => {
  itemsController.change(req, res);
});
app.post("/update/:currentId", (req: Request, res: Response) => {
  itemsController.changeUpdate(req, res);
});
app.get("/delete/:id", (req: Request, res: Response) => {
  itemsController.destroy({ req, res });
});

app.post("/create/comment/:id", (req: Request, res: Response) => {
  itemsController.comments(req, res);
});
app.post("/deleteCommentary/:id", (req: Request, res: Response) => {
  itemsController.deleteComment(req, res);
});
app.get("/categories/:id", (req: Request, res: Response) => {
  itemsController.category(req, res);
});
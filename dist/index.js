"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const ItemsController_1 = require("./controllers/ItemsController");
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
;
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
app.get("/", (req, res) => {
    itemsController.home(req, res);
});
app.get("/add", (req, res) => {
    itemsController.add(req, res);
});
app.get("/login", (req, res) => {
    itemsController.login(req, res);
});
app.get("/register", (req, res) => {
    itemsController.register(req, res);
});
app.post("/logout", (req, res) => {
    itemsController.logout(req, res);
});
app.post("/login", (req, res) => {
    itemsController.vhod(req, res);
});
app.post("/register", (req, res) => {
    itemsController.registration(req, res);
});
app.post("/add", (req, res) => {
    itemsController.create(req, res);
});
app.get("/items/:id", (req, res) => {
    itemsController.item(req, res);
});
app.get("/profile", (req, res) => {
    itemsController.profile(req, res);
});
app.post("/basket/:id", (req, res) => {
    itemsController.basket(req, res);
});
app.get("/changeItem/:id", (req, res) => {
    itemsController.change(req, res);
});
app.post("/update/:currentId", (req, res) => {
    itemsController.changeUpdate(req, res);
});
app.get("/delete/:id", (req, res) => {
    itemsController.destroy({ req, res });
});
app.post("/create/comment/:id", (req, res) => {
    itemsController.comments(req, res);
});
app.post("/deleteCommentary/:id", (req, res) => {
    itemsController.deleteComment(req, res);
});
app.get("/categories/:id", (req, res) => {
    itemsController.category(req, res);
});
//# sourceMappingURL=index.js.map
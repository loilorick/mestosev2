"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ItemsController {
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany({});
            const users = yield prisma.users.findMany({});
            const categories = yield prisma.categories.findMany({});
            console.log(items);
            res.render('home', {
                'items': items,
                'users': users,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                username: req.session.username
            });
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.auth != true) {
                res.redirect("/");
            }
            else {
                const categories = yield prisma.categories.findMany({});
                res.render("add", {
                    'categories': categories,
                    auth: req.session.auth,
                    admin: req.session.admin,
                    username: req.session.username,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.loyalPass == undefined) {
                req.session.loyalPass = true;
            }
            const categories = yield prisma.categories.findMany({});
            res.render("login", {
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                loyalPass: req.session.loyalPass,
                username: req.session.username,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.errRegist == undefined) {
                req.session.errRegist = true;
            }
            const categories = yield prisma.categories.findMany({});
            res.render("register", {
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                errRegist: req.session.errRegist,
                username: req.session.username,
            });
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const basket = yield prisma.basket.findMany({
                where: {
                    username: String(req.session.username)
                }
            });
            const users = yield prisma.users.findMany({
                where: {
                    username: String(req.session.username)
                }
            });
            let type = '';
            if (users[0].type == 'A') {
                type = 'администратор';
            }
            else {
                type = 'пользователь';
            }
            const categories = yield prisma.categories.findMany({});
            res.render("profile", {
                'categories': categories,
                'basket': basket,
                'users': users,
                'type': type,
                auth: req.session.auth,
                admin: req.session.admin,
                errRegist: req.session.errRegist,
                username: req.session.username,
            });
        });
    }
    vhod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    username: username,
                    password: password
                }
            });
            if (users[0] != undefined && users[0].type == "A") {
                req.session.auth = true;
                req.session.admin = true;
                console.log("вы вошли как админ");
                req.session.username = username;
                res.redirect("/");
            }
            else if (users[0] != undefined && users[0].type == "U") {
                req.session.auth = true;
                req.session.admin = false;
                console.log("вы вошли как пользователь");
                req.session.username = username;
                res.redirect("/");
            }
            else {
                console.log("Аккаунт не существует");
                req.session.auth = false;
                req.session.admin = false;
                console.log("вы не вошли");
                res.redirect("/login");
            }
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    username: String(req.session.username)
                }
            });
            if (users[0] == undefined) {
                yield prisma.users.create({
                    data: {
                        username: String(username),
                        password: String(password),
                        type: "U",
                    }
                });
                req.session.username = username;
                req.session.auth = true;
                req.session.admin = false;
                res.redirect("/");
            }
            else {
                console.log("Аккаунт занят");
                req.session.auth = false;
                req.session.admin = false;
                console.log("вы не зарегистрировались");
                res.redirect("/register");
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, description, price } = req.body;
            const categories = yield prisma.categories.findMany({
                where: {
                    id: Number(req.body.check__radio)
                }
            });
            yield prisma.items.create({
                data: {
                    title: title,
                    image: image,
                    type: Number(req.body.check__radio),
                    description: description,
                    price: Number(price),
                    author: String(req.session.username),
                    categories: String(categories[0].title)
                }
            });
            res.redirect("/");
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.auth = false;
            req.session.auth = false;
            req.session.username = undefined;
            res.redirect("/");
        });
    }
    item(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const comments = yield prisma.comments.findMany({
                where: {
                    commentId: Number(id)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.render("item", {
                'item': items,
                'comments': comments,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                loyalPass: req.session.loyalPass,
                username: req.session.username,
            });
        });
    }
    basket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, image, price, author } = req.body;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const basket = yield prisma.basket.create({
                data: {
                    title: title,
                    image: image,
                    price: Number(price),
                    author: author,
                    username: String(req.session.username)
                }
            });
            yield prisma.basket.findMany({});
            res.redirect("/");
        });
    }
    change(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.render("changeItem", {
                'items': items,
                'currentId': id,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                username: req.session.username
            });
        });
    }
    changeUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentId } = req.params;
            const { title, image, description, price } = req.body;
            yield prisma.items.update({
                where: {
                    id: Number(currentId),
                },
                data: {
                    title: title,
                    image: image,
                    description: description,
                    price: Number(price),
                    author: String(req.session.username)
                }
            });
            res.redirect("/");
        });
    }
    destroy({ req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma.items.delete({
                where: {
                    id: Number(id),
                }
            });
            res.redirect("/");
        });
    }
    comments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { text } = req.body;
            yield prisma.comments.create({
                data: {
                    text: text,
                    name: String(req.session.username),
                    commentId: Number(id)
                }
            });
            res.redirect(`/`);
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma.comments.delete({
                where: {
                    id: Number(id)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.redirect(`/`);
        });
    }
    categories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categories = yield prisma.categories.findMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect(`/`);
        });
    }
    category(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categories = yield prisma.categories.findMany({
                where: {
                    id: Number(id)
                }
            });
            const items = yield prisma.items.findMany({
                where: {
                    type: Number(categories[0].id)
                }
            });
            res.render(`categories`, {
                'items': items,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                username: req.session.username
            });
        });
    }
}
exports.ItemsController = ItemsController;
//# sourceMappingURL=ItemsController.js.map
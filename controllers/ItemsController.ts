import { Request, Response } from 'express';
import { items, basket, categories, comments, users, PrismaClient } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

export class ItemsController {
    async home(req: Request, res: Response) {
        const items = await prisma.items.findMany({});
        const users = await prisma.users.findMany({});
        const categories = await prisma.categories.findMany({
          
        });
        console.log(items)
        res.render('home', {
            'items': items,
            'users': users,
            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin,
            username: req.session.username
        });
    }
    async add(req: Request, res: Response) {
        if (req.session.auth != true) {
            res.redirect("/");
        } else {
            const categories = await prisma.categories.findMany({})
            res.render("add", {
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                username: req.session.username,
            });
        }
    }
    async login(req: Request, res: Response) {
        if (req.session.loyalPass == undefined) {
            req.session.loyalPass = true;
        }
        const categories = await prisma.categories.findMany({})
        res.render("login",
            {
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                loyalPass: req.session.loyalPass,
                username: req.session.username,
            });
    }

    async register(req: Request, res: Response) {
        if (req.session.errRegist == undefined) {
            req.session.errRegist = true;
        }

        const categories = await prisma.categories.findMany({})
        res.render("register",
            {
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                errRegist: req.session.errRegist,
                username: req.session.username,
            });
    }
    async profile(req: Request, res: Response) {
        const basket = await prisma.basket.findMany({
            where: {
                username: String(req.session.username)
            }
        })

        const users = await prisma.users.findMany({
            where: {
                username: String(req.session.username)
            }
        })
        let type = ''
        if (users[0].type == 'A') {
            type = 'администратор'
        } else {
            type = 'пользователь'
        }
        const categories = await prisma.categories.findMany({})
        res.render("profile",
            {
                'categories': categories,
                'basket': basket,
                'users': users,
                'type': type,
                auth: req.session.auth,
                admin: req.session.admin,
                errRegist: req.session.errRegist,
                username: req.session.username,
            });
    }
    async vhod(req: Request, res: Response) {
        const { username, password } = req.body
        const users = await prisma.users.findMany({
            where: {
                username: username,
                password: password
            }
        });

        if (users[0] != undefined && users[0].type == "A") {
            req.session.auth = true
            req.session.admin = true
            console.log("вы вошли как админ")
            req.session.username = username
            res.redirect("/");

        } else if (users[0] != undefined && users[0].type == "U") {
            req.session.auth = true
            req.session.admin = false
            console.log("вы вошли как пользователь")
            req.session.username = username
            res.redirect("/");
        } else {
            console.log("Аккаунт не существует")
            req.session.auth = false
            req.session.admin = false
            console.log("вы не вошли")
            res.redirect("/login");
        }

    }

    async registration(req: Request, res: Response) {
        const { username, password } = req.body
        const users = await prisma.users.findMany({
            where: {
                username: String(req.session.username)
            }
        })
        if (users[0] == undefined) {
            await prisma.users.create({
                data: {
                    username: String(username),
                    password: String(password),
                    type: "U",
                }
            });
            req.session.username = username
            req.session.auth = true
            req.session.admin = false
            res.redirect("/");
        } else {
            console.log("Аккаунт занят")
            req.session.auth = false
            req.session.admin = false
            console.log("вы не зарегистрировались")
            res.redirect("/register");



        }

    }
    async create(req: Request, res: Response) {
        const { title, image, description, price } = req.body;
        const categories = await prisma.categories.findMany({
            where:{
                id:Number(req.body.check__radio)
            }
        })
        await prisma.items.create({
            data: {
                title: title,
                image: image,
                type: Number(req.body.check__radio),
                description: description,
                price: Number(price),
                author: String(req.session.username),
                categories:String(categories[0].title)
            }
        })
      
        res.redirect("/")
    }

    async logout(req: Request, res: Response) {
        req.session.auth = false;
        req.session.auth = false;
        req.session.username = undefined
        res.redirect("/")
    }

    async item(req: Request, res: Response) {
        const { id } = req.params;
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }
        })
        const comments = await prisma.comments.findMany({
            where: {
                commentId: Number(id)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render("item",
            {
                'item': items,
                'comments': comments,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                loyalPass: req.session.loyalPass,
                username: req.session.username,
            });
    }

    async basket(req: Request, res: Response) {
        const { id } = req.params;
        const { title, image, price, author } = req.body
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }
        })
        const basket = await prisma.basket.create({
            data: {
                title: title,
                image: image,
                price: Number(price),
                author: author,
                username: String(req.session.username)
            }
        })
        await prisma.basket.findMany({})

        res.redirect("/");
    }

    async change(req: Request, res: Response) {
        const { id } = req.params
        const items = await prisma.items.findMany({
            where: {
                id: Number(id)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render("changeItem", {
            'items': items,
            'currentId': id,
            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin,
            username: req.session.username
        })
    }
    async changeUpdate(req: Request, res: Response) {
        const { currentId } = req.params
        const { title, image, description, price } = req.body;

        await prisma.items.update({
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
        })

        res.redirect("/")
    }

    async destroy({ req, res }: { req: Request; res: Response; }) {
        const { id } = req.params;

        await prisma.items.delete({
            where: {
                id: Number(id),
            }
        })

        res.redirect("/")
    }
    async comments(req: Request, res: Response) {
        const { id } = req.params;
        const { text } = req.body
        await prisma.comments.create({
            data: {
                text: text,
                name: String(req.session.username),
                commentId: Number(id)
            }
        })
        res.redirect(`/`)
    }
    async deleteComment(req: Request, res: Response) {
        const { id } = req.params;

        await prisma.comments.delete({
            where: {
                id: Number(id)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.redirect(`/`)
    }

    async categories(req: Request, res: Response) {
        const { id } = req.params;

        const categories = await prisma.categories.findMany({
            where: {
                id: Number(id)
            }
        })
        res.redirect(`/`)
    }

    async category(req: Request, res: Response) {
        const { id } = req.params;

        const categories = await prisma.categories.findMany({
            where: {
                id: Number(id)
            }
        })
        const items = await prisma.items.findMany({
            where: {
                type: Number(categories[0].id)
            }
        })
        res.render(`categories`, {
            'items': items,

            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin,
            username: req.session.username
        }
        )
    }

}

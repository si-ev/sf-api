import { Prisma, PrismaClient } from '@prisma/client';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
//import cookieSession from 'cookie-session';
import multer from 'multer'

const prisma = new PrismaClient();
const app: Express = express();

const LocalStrategy = require('passport-local').Strategy

const whitelist = ['http://localhost:8081'];
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

            callback(new Error('Not allowed by CORS')
    }
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//app.use(cookieSession({
//    name: 'mysession',
//    keys: ['sf-api-key'],
//    maxAge: 60*60*1000
//}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    cookie: {  
        secure: true, 
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

let users = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@email.com',
        password: 'password',
    },
    {
        id: 2,
        username: 'simeon',
        email: 'simeon@email.com',
        password: 'password2',
    },
];

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).send([user, 'Cannot log in', info]);
        }
        req.login(user, err => {
            res.send('Logged in')
        });
    })(req, res, next);
});

app.get('/logout', function(req, res) {
    req.logout();

    console.log('logged out')

    return res.send();
});

const authMiddleware = (req, res, next) => {
    console.log('authMiddleware', req.session);
    if (!req.isAuthenticated()){
        res.status(401).send('You are not authenticated')
    } else {
        return next()
    }
}

app.get('/user',  (req, res) => {
    console.log('Passport', req.session.passport);
    let user = users.find(user => {
        return user.id === req.session.passport.user
    })
    console.log([user, req.session]);
    res.send({ user: user })
});

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },

        (username: string, password: string, done: (err: any, user: any, msg?: any) => void ) => {
            let user = users.find((user) =>{
                return user.username === username && user.password === password
            })

            if (user) {
                console.log('User found');
                done(null, user)
            } else {
                console.log('User NOT found');
                done(null, false, { message: 'Incorrect username or password'}) 
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    let user = users.find((user) => {
        return user.id === id
    })

    done(null, user);
})

// File Upload
//TODO: make a file filter

const upload = multer({
    dest: './uploads',
    limits: {
        fileSize: 500000
    }
});

app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE'){
        res.status(422).json({ error: 'Allowed file size is 500KB' });
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Req.file: ',req.file);
    // We are interestedin the field 'filename'
    res.json({ file: req.file });
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/categories', async (req, res) => {
    const categories = await prisma.dishCategory.findMany()
    res.json(categories)
});

app.get('/category/:id', async (req, res) => {
   const { id }: { id?: string } = req.params; 

   const posts = await prisma.dish.findMany({
        where: { categoryId: Number(id) }
   });

   res.json(posts);

})

app.post('/dish', upload.single('file'), async (req, res) => {
    let { name, 
          ingredients, 
          price, 
          weight,
          image,
          description,
          categoryId
    } = req.body;
    console.log('Posting a dish');
    console.log('Cat id', req.body);
    console.log('Creating dish, categoryId = ', categoryId);
    const createdDish = await prisma.dish.create({
        data: {name, 
               weight,
               price: Number(price),
               ingredients,
               image,
               description, 
               category: {
                   connect: { id: Number(categoryId) }
               }
        },
    });
    console.log('createdDish = ', createdDish);
    res.send(createdDish);
});

app.post('/dish/:id', upload.single('file'), async (req, res) => {
    let { id, 
          name, 
          ingredients, 
          price, 
          weight,
          image,
          description
    } = req.body;
    console.log('Update Req');
    const updateDish = await prisma.dish.update({
        where: {
            id: Number(id)
        },
        data: {name, 
               weight, 
               price: Number(price), 
               ingredients, 
               image,
               description
              }
    });
    console.log('updateDish = ', updateDish);
    res.send(updateDish);
});

app.delete('/dish/:id', async (req, res) => {
    // Insert ParseInt
    const id = Number(req.params.id);
    const deleteDish = await prisma.dish.delete({
        where: {
            id: Number(id)
        }
    })
});


app.get('/menu', async (req, res) => {
   const menu = await prisma.dishCategory.findMany({
       include: {
           dishes: true, 
       }
   })
   res.json(menu);

})

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`))

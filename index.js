const express = require('express');
const cors = require('cors');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./src/routes/index.js');
const db = require('./src/config/db');
const apiRoutes = require('./src/routes/api.js');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const adminRoutes = require('./src/routes/admin.js');
const route = require('./src/routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/education_dev' }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'src/resources/views/layouts'),
  partialsDir: path.join(__dirname, 'src/resources/views/partials'),
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/resources/views'));

// Đặt các route sau khi đã khai báo middleware
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
route(app); // hoặc routes(app), chỉ giữ 1 cái đúng

// Kết nối MongoDB và listen server
async function startServer() {
    try {
        await db.connect();
        console.log('Đã kết nối MongoDB');
        app.listen(4000, () => {
            console.log('Server chạy cổng 4000');
        });
    } catch (error) {
        console.error('Lỗi kết nối MongoDB:', error);
    }
}

startServer();

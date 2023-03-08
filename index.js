const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./src/routes/userRoutes');
const productRouter = require('./src/routes/productRoutes');

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/products', productRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
    });
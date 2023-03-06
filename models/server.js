const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { userRouter } = require('../routes/user.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const { mealRouter } = require('../routes/meal.routes');
const { orderRouter } = require('../routes/order.routes');
const initModel = require('./initModel');
const { db } = require('../database/db');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const { authRouter } = require('../routes/auth.routes');



class Server {

        constructor(){
            this.app = express();
            this.port = process.env.PORT || 2000;
            
            this.paths = {
                user: '/api/v1/user',
                restaurant: '/api/v1/restaurant',
                meals: '/api/v1/meals',
                order: '/api/v1/order',
            };

            this.database();

            this.middlewares();

            this.routes();
        }

        
        middlewares(){
            this.app.use(cors());
            this.app.use(express.json());

            if(process.env.NODE_ENV === 'development'){ 
                this.app.use(morgan('dev'));
                
            }

        }

        routes(){
            //this.app.use(this.paths.auth, authRouter);
            this.app.use(this.paths.user, userRouter);
            this.app.use(this.paths.restaurant, restaurantRouter);
            this.app.use(this.paths.meals, mealRouter);
            this.app.use(this.paths.order, orderRouter);

            this.app.all('*', (req, res, next) => {
                return next(
                    new AppError(`Can't find ${req.originalUrl} on this server`, 404)
                )
             });

             this.app.use(globalErrorHandler);
             
        }

        database(){
            db.authenticate()
            .then(() => console.log('Database authenticated 😁'))
            .catch(error => console.error(error));

            initModel()

            db.sync()
            .then(() => console.log('Database synced 😎'))
            .catch(error => console.error(error));
        }

        listen(){
            this.app.listen(this.port, () => {
                console.log('Server running on port:', this.port)
            })
        }

}

module.exports = Server;
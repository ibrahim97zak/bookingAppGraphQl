const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlSchema = require('./graphql/schema/index')
const graphqlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema ,
        rootValue: graphqlResolvers ,
        graphiql: true, // Enables the GraphiQL interface
    })
);
mongoose.connect(process.env.DB_URL).then(
    () => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000 ');
        });
    }
).catch(
    (err) => console.log(err)
)


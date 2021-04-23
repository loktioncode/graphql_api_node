const express = require('express')
// Import the GraphQL HTTP server
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema')
const cors = require('cors')

const app = express()
const PORT = 5001
app.use(cors())

app.use(graphqlHTTP({
  // Declare the schema
  schema,
  // Show the handy GraphiQL thing in the browser
  graphiql: true,
}))

app.listen(PORT, () => console.log(`🚀 Graphql API ready at http://localhost:${PORT}`));

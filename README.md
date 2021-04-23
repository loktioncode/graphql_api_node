# Star Wars

> React, GraphQL, Apollo app that uses the Star Wars API to display launches

## Quick Start

```bash
# Install dependencies (server & client)
npm install
cd client && npm install

# Server only (:5000)
npm run server

# Client only (:3000)
npm run client

# Build for production (Builds into server ./public)
cd client && npm run build

# Graphiql - http://localhost:5000/graphql
```

## Info

### Author

Elisha Bere
[Elisha Bere](http://www.loktioncode.com)

### HOW TO QUERY GRAPHQL API

## Querying for all people with their home planet, name, height, mass, gender

{
allPeople{
name
mass
gender
homeworld{
name
}
}
}

## Querying for specific page number

lastpage=9
{
allPeople(page: "9") {
name
mass
gender
homeworld {
name
}
}
}

## Querying for person using name

{
Person(name: "Sly Moore") {
name
mass
gender
homeworld{
name
}
}
}

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql')
const fetch  = require('node-fetch');

const BASE_URL = `https://swapi.dev/api`;


const PlanetType = new GraphQLObjectType({
  name: 'Planet',
  description: 'characters planet',
  fields: () => ({
    name: {type: GraphQLString},
  })
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'A star wars Character',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'A character\'s  name',
      resolve: (person) => person.name
    },
    gender: {
      type: GraphQLString,
      description: 'character\'s gender',
      resolve: (person) => person.gender
    },
    mass: {
      type: GraphQLString,
      description: 'character\'s  mass',
      resolve: (person) => person.mass
    },
    height: {
      type: GraphQLString,
      description: 'character\'s  height',
      resolve: (person) => person.height 
    },
    homeworld: {
      type: PlanetType,
      resolve: (person) => (
        fetch(person.homeworld).then(res => res.json())
      )
    },
  })
});

const paginationHandler = (page) => (
  page ? `/?page=${page}` : ''
);


const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      args: {
        page: {type: GraphQLString}
      },
      description: 'All Star Wars People',
      resolve: (root, args) => fetch(`${BASE_URL}/people${paginationHandler(args.page)}`)
        .then(response => response.json())
        .then(data => data.results)
    },
    person: {
      type: PersonType,
      args: {
        name: {type: GraphQLString}
      },
      resolve: (root, args) => fetch(`https://swapi.dev/api/people/${args.name}`)
          .then(res => res.json())
      
    }
  })
})

const schema = new GraphQLSchema({
  query: QueryType,
})

module.exports = schema
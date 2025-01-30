export const typeDefs = `#graphql
    type User {
        id: ID!
        nombre: String!
        telefono: String!
        ip: String!
        time: String!
    }
    
    type Query {
        getUser(id:ID!): User!
        getUsers:[User]!
    }

    type Mutation {
        addUser(nombre:String!, telefono:String!, ip:String!): User!
        deleteUser(id:ID!):Boolean!
        updateUser(nombre:String!, telefono:String!, ip:String!, id:String!): User!
    }
`
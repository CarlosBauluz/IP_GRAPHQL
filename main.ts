import { MongoClient } from "mongodb"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers.ts";
import { GraphQLError } from "graphql";
import { User } from "./type.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")
if(!MONGO_URL) throw new GraphQLError("MONGO URL NOT EXISTS")

const client = new MongoClient(MONGO_URL)
await client.connect()
console.log("Conectado a la base de datos")

const db = client.db("IP")
const userCollection= db.collection<User>("usuarios")

const server = new ApolloServer({typeDefs, resolvers})

const { url } = await startStandaloneServer(server,{
  context: async() => ({ userCollection })
})

console.log(`🚀  Server ready at: ${url}`);
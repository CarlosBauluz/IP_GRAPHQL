import { Collection, ObjectId } from "mongodb";
import { User } from "./type.ts";
import { GraphQLError } from "graphql";
import { timeIP, timeIRL } from "./utils.ts";

type Context = {
    userCollection: Collection<User>
}

type MutationArgsUser = {
    nombre: string
    telefono: string
    ip: string
    id: string
    time: string
}

export const resolvers = {
    User: {
        id: (parent: User) => parent._id!.toString(),
        time: async(parent:User) => {
            const zonahoraria:string = (await timeIP(parent.ip)).toString()
            const resul = timeIRL(zonahoraria)
            return resul
        }
    },

    Query: {
        getUser: async(
            _:unknown,
            args:MutationArgsUser,
            context: Context
        ):Promise<User> =>{
            const resultado = await context.userCollection.findOne({_id:new ObjectId(args.id)})
            if(!resultado) throw new GraphQLError("No se ha encontrado al usuario")
            return resultado
        },

        getUsers: async(
            _:unknown,
            args:MutationArgsUser,
            context:Context
        ):Promise<User[]> =>{
            const resultado = await context.userCollection.find().toArray()
            return resultado
        }
    },
    Mutation: {

        addUser: async(
            _:unknown,
            args:MutationArgsUser,
            context: Context
        ):Promise<User> =>{
            const {insertedId} = await context.userCollection.insertOne({
                nombre: args.nombre,
                ip: args.ip,
                telefono: args.telefono
            })
            return {
                _id: insertedId,
                ...args
            }
        },

        deleteUser: async(
            _:unknown,
            args:MutationArgsUser,
            context: Context
        ):Promise<boolean> =>{
            const {deletedCount} = await context.userCollection.deleteOne({_id: new ObjectId(args.id)})
            if(!deletedCount)throw new GraphQLError("No se ha encontrado el usuario a borrar")
            return true
        },

        updateUser: async(
            _:unknown,
            args:MutationArgsUser,
            context: Context
        ):Promise<User> => {
            const updateUser = await context.userCollection.findOneAndUpdate({_id: new ObjectId(args.id)},{$set: {
                nombre: args.nombre,
                telefono: args.telefono,
                ip: args.ip
            }}, {returnDocument: "after"})
            if(!updateUser){throw new GraphQLError("No se ha encontrado el usuario a modificar")}
            return updateUser
        }
        
    }
}
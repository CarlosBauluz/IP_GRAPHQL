import { GraphQLError } from "graphql";

export const timeIP = async(ip:string):Promise<string> =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY) throw new GraphQLError("Falta la api key")
    const url = `https://api.api-ninjas.com/v1/iplookup?address=${ip}`
    const data = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY
          },
    })

    if(data.status!== 200){throw new GraphQLError("Error en la peticion de la api")}
    const resultado = await data.json()
    return resultado.timezone
}

export const timeIRL = async(timezone:string):Promise<String> =>{
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY) throw new GraphQLError("Falta la api key")
    const url = `https://api.api-ninjas.com/v1/worldtime?timezone=${timezone}`
    const data = await fetch(url, {headers: {
        'X-Api-Key': API_KEY
    },})
    if(data.status !== 200)throw new GraphQLError("No se ha podido acceder bien a la api")
    const resultado = await data.json()
    return resultado.datetime

}
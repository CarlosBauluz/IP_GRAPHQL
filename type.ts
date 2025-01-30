import { OptionalId } from "mongodb";

export type User = OptionalId<{
    nombre: string,
    telefono: string,
    ip: string
}>

export type IP_Lookup = {
    timezone: string,
    is_valid: boolean
}

export type WORLDTIME = {
    datetime: string
}
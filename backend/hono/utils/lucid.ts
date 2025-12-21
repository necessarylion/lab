import { LucidStandalone } from "standalone-lucid"
import databaseConfig from "@/config/database"

const lucid = new LucidStandalone(databaseConfig as any)
const { Model, Factory } = lucid

export { lucid, Model, Factory }

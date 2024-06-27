import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { createFolderIfNotExists } from './helpers'
import { Program, ProgramWithoutId } from './type/program'

dotenv.config()

const OUTPUT_FOLDER_PATH = '../generated'
const OUTPUT_FILENAME = 'dataset_out.json'
const PROGRAMS_FOLDER_PATH = '../programs'
const INTERFACE_PATH = './../common/interface.yaml'

/**
 * Build programs dataset from folder and yaml files
 * Parse data folder to build list of programs
 * Each program must be written as a distinct yaml file
 */

/**
 * Reads all program data
 */
export const readPrograms = (log: boolean = false): Program[] => {
  const programs: Program[] = []

  // joining path of directory
  const dataDirPath: string = path.join(__dirname, PROGRAMS_FOLDER_PATH)

  if (log) console.log('📂 Reading data at', dataDirPath, '\n')

  const filenames: string[] = fs.readdirSync(dataDirPath)

  filenames.forEach((file: string) => {
    const id = file.substring(0, file.lastIndexOf('.')) || file

    if (log) console.log(' 🗎 Reading program', id)

    const yamlFilePath: string = `${dataDirPath}/${file}`
    const yamlFile: string = fs.readFileSync(yamlFilePath, 'utf8')

    const program: Program = { ...(yaml.load(yamlFile) as ProgramWithoutId), id: id }

    programs.push(program)
  })

  return programs
}

/** Prepends publicodes with a publicodes snippet common to all programs (stored in
 * "packages/data/common/interface.yaml")
 */
export const prependInterface = (programs: Program[], log: boolean = false): Program[] => {
  const fullPath: string = path.join(__dirname, INTERFACE_PATH)

  if (log) console.log('🗎 reading constants at', fullPath)
  const file: string = fs.readFileSync(fullPath, 'utf8')
  const constants = yaml.load(file) as Record<string, unknown>

  if (log) console.log('➕ prepending publicodes with common constants')

  return programs.map((p) => {
    p.publicodes = { ...constants, ...p.publicodes }
    return p
  })
}

/**
 * Converts program data to JSON and writes it to a file.
 */
export const buildProgramJSONOutput = (programs: Program[]): void => {
  console.log('♺ Converting data to JSON')
  const dataAsJson: string = JSON.stringify(programs, null, 2)

  const dataBuiltOutputDir: string = path.join(__dirname, OUTPUT_FOLDER_PATH)

  createFolderIfNotExists(dataBuiltOutputDir)

  const dataOutPath: string = `${dataBuiltOutputDir}/${OUTPUT_FILENAME}`
  fs.writeFileSync(dataOutPath, dataAsJson)
  console.log('🖊️  Data successfully written at', dataOutPath)
}

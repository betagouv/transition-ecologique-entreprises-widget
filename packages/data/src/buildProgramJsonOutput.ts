import { readPrograms, prependInterface, buildProgramJSONOutput } from './dataPipeline'
// Script

console.log('▶ Starting data consolidation (buildJsonOutput.ts)\n')

let programs = readPrograms(true)

console.log()

programs = prependInterface(programs, true)

console.log()

buildProgramJSONOutput(programs)

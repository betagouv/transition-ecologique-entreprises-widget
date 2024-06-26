import { ProjectFeatures } from './projects/project'

console.log('Start the project data generation')

new ProjectFeatures()
  .buildProjectsJSONOutputs()
  .then(() => {
    console.log('Project data generated')
  })
  .catch((error) => {
    console.error('Error during the project data generation:', error)
  })

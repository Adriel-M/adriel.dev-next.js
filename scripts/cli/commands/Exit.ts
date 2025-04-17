import CommandInterface from './CommandInterface'

class Exit implements CommandInterface {
  name = 'Exit'
  run(): Promise<void> {
    console.log('Exiting')
    process.exit()
  }
}

const exit = new Exit()

export default exit

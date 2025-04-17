export default interface CommandInterface {
  name: string
  run(): Promise<void>
}

export default interface CommandInterface {
  name: string
  run(): Promise<void>

  choice: { name: string; value: CommandInterface }
}

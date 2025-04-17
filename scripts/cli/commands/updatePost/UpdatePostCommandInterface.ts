export default interface UpdatePostCommandInterface {
  name: string
  run(postsFolder: string, fileName: string): Promise<void>

  choice: { name: string; value: UpdatePostCommandInterface }
}

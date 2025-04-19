export default interface UpdatePostCommandInterface {
  name: string
  run(postsFolder: string, postName: string): Promise<void>

  choice: { name: string; value: UpdatePostCommandInterface }
}

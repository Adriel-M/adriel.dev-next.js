import fs from 'fs'

type TagCounts = {
  [key: string]: number
}

let cachedTagCounts: TagCounts = {}
export const getTagCounts = (): TagCounts => {
  if (!Object.keys(cachedTagCounts).length) {
    const path = process.cwd() + '/tag-data.json'
    if (fs.existsSync(path)) {
      const jsonString = fs.readFileSync(path, 'utf-8')
      const jsonObject: Record<string, number> = JSON.parse(jsonString)

      for (const key in jsonObject) {
        cachedTagCounts[key] = jsonObject[key]
      }
    }
  }
  return cachedTagCounts
}

export const reset = () => {
  cachedTagCounts = {}
}

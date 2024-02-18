// Sort by tag frequency descending then by alphabetical
// Add a comment
export function compareTagsByCountThenAlpha(
  tagCounts: Record<string, number>
): (a: string, b: string) => number {
  return function (a, b): number {
    return tagCounts[b] - tagCounts[a] || a.localeCompare(b)
  }
}

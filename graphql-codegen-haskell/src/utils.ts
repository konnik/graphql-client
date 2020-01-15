/**
 * A mustache function that transforms
 *
 * [ {{foo}} ~ {{bar}}
 * ]
 *
 * with [{ foo: 'a', bar: 1 }, { foo: 'b', bar: 2 }] into
 *
 * [ a ~ 1
 * , b ~ 2
 * ]
 */
export const templateOverList = (
  text: string,
  list: Array<{ [key: string]: string }>
) => {
  const match = text.match(/^\s*\n(.*?)\n(.*?)\n\s*$/)
  if (!match) {
    throw new Error('templateOverList requires a two-line template')
  }

  const render = (template: string, vars: { [key: string]: string }): string =>
    template.replace(/{{(.*?)}}/g, (_, name) => vars[name])

  const templateFirst = match[1]
  const templateRest = templateFirst.replace(/[^\s]/, ',')
  const suffix = match[2]

  const listFirst = list[0]
  const listRest = list.slice(1)

  const lines = ([] as string[]).concat(
    render(templateFirst, listFirst),
    listRest.map((elem) => render(templateRest, elem)),
    suffix
  )

  return lines.map((s) => s + '\n').join('')
}

/**
 * Implementation of lodash's fromPairs.
 */
export const fromPairs = <K extends string | number | symbol, V>(
  pairs: Array<[K, V]>
): Record<K, V> => {
  const acc = {} as Record<K, V>
  for (const pair of pairs) {
    const [k, v] = pair
    acc[k] = v
  }
  return acc
}

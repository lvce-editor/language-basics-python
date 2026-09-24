import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const configuration = JSON.parse(
  await readFile(
    new URL('../languageConfiguration.json', import.meta.url),
    'utf8',
  ),
)
const increaseIndentPattern = new RegExp(
  configuration.indentationRules.increaseIndentPattern,
)

test('increases indentation after Python block headers and open brackets', () => {
  for (const line of [
    'if text:',
    '  if text: # comment',
    'async def main():',
    'else:',
    'match value:',
    'case 1:',
    'items = [',
  ]) {
    assert.equal(increaseIndentPattern.test(line), true, line)
  }
})

test('does not increase indentation after comments, strings, or ordinary colons', () => {
  for (const line of [
    '# if text:',
    'value = "if text:"',
    'value = other: text',
    'print(1)',
  ]) {
    assert.equal(increaseIndentPattern.test(line), false, line)
  }
})

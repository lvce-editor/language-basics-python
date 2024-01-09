import { execaCommand } from 'execa'
import { readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const REPO = 'https://github.com/MagicStack/MagicPython'
const COMMIT = '7d0f2b22a5ad8fccbd7341bc7b7a715169283044'

const getTestName = (line) => {
  return (
    'magic-python-' +
    line
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replaceAll('/', '-')
      .replaceAll('.py', '')
      .replaceAll('builtins-builtins', 'builtins')
      .replaceAll('classes-class', 'class')
      .replaceAll('calls-call', 'call')
      .replaceAll('expressions-expr', 'expressions')
  )
}

const parseFile = (fileName, content) => {
  const tests = []
  const tripleNewLineIndex = content.indexOf('\n\n\n')
  if (tripleNewLineIndex === -1) {
    console.warn('could not parse ', fileName)
  } else {
    const start = content.slice(0, tripleNewLineIndex + 1)
    tests.push({
      testName: getTestName(fileName),
      testContent: start,
    })
  }
  return tests
}

const getAllTests = async (folder) => {
  const dirents = await readdir(folder, { recursive: true })
  const allTests = []
  for (const dirent of dirents) {
    if (!dirent.endsWith('.py')) {
      continue
    }
    const filePath = join(folder, dirent)
    const fileContent = await readFile(filePath, 'utf8')
    const parsed = parseFile(dirent, fileContent)
    allTests.push(...parsed)
  }
  return allTests
}

const writeTestFiles = async (allTests) => {
  for (const test of allTests) {
    await writeFile(`${root}/test/cases/${test.testName}.py`, test.testContent)
  }
}

const main = async () => {
  process.chdir(root)
  await rm(`${root}/.tmp`, { recursive: true, force: true })
  await execaCommand(`git clone ${REPO} .tmp/magic-python`)
  process.chdir(`${root}/.tmp/magic-python`)
  await execaCommand(`git checkout ${COMMIT}`)
  process.chdir(root)
  const allTests = await getAllTests(`${root}/.tmp/magic-python/test`)
  await writeTestFiles(allTests)
}

main()

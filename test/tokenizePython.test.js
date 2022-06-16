import {
  initialLineState,
  tokenizeLine,
  TokenType,
  TokenMap,
} from '../src/tokenizePython.js'

const DEBUG = true

const expectTokenize = (text, state = initialLineState.state) => {
  const lineState = {
    state,
  }
  const tokens = []
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const result = tokenizeLine(lines[i], lineState)
    lineState.state = result.state
    tokens.push(...result.tokens.map((token) => token.type))
    tokens.push(TokenType.NewLine)
  }
  tokens.pop()
  return {
    toEqual(...expectedTokens) {
      if (DEBUG) {
        expect(tokens.map((token) => TokenMap[token])).toEqual(
          expectedTokens.map((token) => TokenMap[token])
        )
      } else {
        expect(tokens).toEqual(expectedTokens)
      }
    },
  }
}

test('empty', () => {
  expectTokenize(``).toEqual()
})

test('whitespace', () => {
  expectTokenize(` `).toEqual(TokenType.Whitespace)
})

test('keywords', () => {
  // see https://www.w3schools.com/python/python_ref_keywords.asp
  expectTokenize('and').toEqual(TokenType.Keyword)
  expectTokenize('as').toEqual(TokenType.Keyword)
  expectTokenize('assert').toEqual(TokenType.Keyword)
  expectTokenize('break').toEqual(TokenType.Keyword)
  expectTokenize('class').toEqual(TokenType.Keyword)
  expectTokenize('continue').toEqual(TokenType.Keyword)
  expectTokenize('def').toEqual(TokenType.Keyword)
  expectTokenize('del').toEqual(TokenType.Keyword)
  expectTokenize('elif').toEqual(TokenType.Keyword)
  expectTokenize('else').toEqual(TokenType.Keyword)
  expectTokenize('except').toEqual(TokenType.Keyword)
  expectTokenize('False').toEqual(TokenType.Keyword)
  expectTokenize('finally').toEqual(TokenType.Keyword)
  expectTokenize('for').toEqual(TokenType.Keyword)
  expectTokenize('from').toEqual(TokenType.Keyword)
  expectTokenize('global').toEqual(TokenType.Keyword)
  expectTokenize('if').toEqual(TokenType.Keyword)
  expectTokenize('import').toEqual(TokenType.Keyword)
  expectTokenize('in').toEqual(TokenType.Keyword)
  expectTokenize('is').toEqual(TokenType.Keyword)
  expectTokenize('lambda').toEqual(TokenType.Keyword)
  expectTokenize('None').toEqual(TokenType.Keyword)
  expectTokenize('nonlocal').toEqual(TokenType.Keyword)
  expectTokenize('not').toEqual(TokenType.Keyword)
  expectTokenize('or').toEqual(TokenType.Keyword)
  expectTokenize('pass').toEqual(TokenType.Keyword)
  expectTokenize('raise').toEqual(TokenType.Keyword)
  expectTokenize('return').toEqual(TokenType.Keyword)
  expectTokenize('True').toEqual(TokenType.Keyword)
  expectTokenize('try').toEqual(TokenType.Keyword)
  expectTokenize('while').toEqual(TokenType.Keyword)
  expectTokenize('with').toEqual(TokenType.Keyword)
  expectTokenize('yield').toEqual(TokenType.Keyword)
})

test('number', () => {
  expectTokenize('123').toEqual(TokenType.Numeric)
})

test('line comment', () => {
  expectTokenize('# comment').toEqual(TokenType.Comment, TokenType.Comment)
})

test('lambda', () => {
  expectTokenize(`x = lambda a: a + 10`).toEqual(
    TokenType.VariableName,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.Keyword,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.Numeric
  )
})

test('variable name with underscore', () => {
  expectTokenize(`def my_function():`).toEqual(
    TokenType.Keyword,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Punctuation
  )
})

test(`while`, () => {
  expectTokenize(`while file_text != file_finish:`).toEqual(
    TokenType.Keyword,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Punctuation
  )
})

test('if', () => {
  expectTokenize(`if 1 < 2:`).toEqual(
    TokenType.Keyword,
    TokenType.Whitespace,
    TokenType.Numeric,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.Numeric,
    TokenType.Punctuation
  )
})

test('modulo', () => {
  expectTokenize(`5 % 2`).toEqual(
    TokenType.Numeric,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.Numeric
  )
})

test("if __name__ == 'main'", () => {
  expectTokenize(`if __name__ == 'main'`).toEqual(
    TokenType.Keyword,
    TokenType.Whitespace,
    TokenType.VariableName,
    TokenType.Whitespace,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.PunctuationString,
    TokenType.String,
    TokenType.PunctuationString
  )
})

test('unclosed double quote string', () => {
  expectTokenize(`print("hello world)
`).toEqual(
    TokenType.VariableName,
    TokenType.Punctuation,
    TokenType.PunctuationString,
    TokenType.String,
    TokenType.NewLine
  )
})

test('unclosed single quote string', () => {
  expectTokenize(`print('hello world)
`).toEqual(
    TokenType.VariableName,
    TokenType.Punctuation,
    TokenType.PunctuationString,
    TokenType.String,
    TokenType.NewLine
  )
})

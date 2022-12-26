/**
 * @enum number
 */
export const State = {
  None: 0,
  TopLevelContent: 1,
  AfterOpeningAngleBracket: 2,
  InsideOpeningTag: 3,
  InsideOpeningTagAndHasSeenWhitespace: 4,
  AfterClosingTagAngleBrackets: 5,
  AfterClosingTagName: 6,
  AfterAttributeName: 7,
  AfterAttributeEqualSign: 8,
  InsideAttributeDoubleQuote: 9,
  InsideBlockComment: 10,
  InsideDoubleQuoteString: 11,
  InsideLineComment: 12,
  InsideSingleQuoteString: 13,
  InsideTripleDoubleQuoteString: 14,
  InsideTripleSingleQuoteString: 15,
}

/**
 * @enum number
 */
export const TokenType = {
  None: 99999999,
  Numeric: 30,
  String: 50,
  Whitespace: 0,
  Comment: 60,
  Text: 117,
  PunctuationTag: 228,
  TagName: 118,
  AttributeName: 119,
  Punctuation: 10,
  Error: 141,
  PunctuationString: 11,
  NewLine: 771,
  Keyword: 951,
  VariableName: 952,
  LanguageConstant: 953,
  KeywordReturn: 954,
  KeywordImport: 955,
  KeywordControl: 956,
  Function: 957,
}

export const TokenMap = {
  [TokenType.None]: 'None',
  [TokenType.Numeric]: 'Numeric',
  [TokenType.String]: 'String',
  [TokenType.Whitespace]: 'Whitespace',
  [TokenType.Comment]: 'Comment',
  [TokenType.Text]: 'Text',
  [TokenType.PunctuationTag]: 'PunctuationTag',
  [TokenType.TagName]: 'TagName',
  [TokenType.AttributeName]: 'AttributeName',
  [TokenType.Punctuation]: 'Punctuation',
  [TokenType.Error]: 'Error',
  [TokenType.PunctuationString]: 'PunctuationString',
  [TokenType.NewLine]: 'NewLine',
  [TokenType.Keyword]: 'Keyword',
  [TokenType.VariableName]: 'VariableName',
  [TokenType.LanguageConstant]: 'LanguageConstant',
  [TokenType.KeywordReturn]: 'KeywordReturn',
  [TokenType.KeywordImport]: 'KeywordImport',
  [TokenType.KeywordControl]: 'KeywordControl',
  [TokenType.Function]: 'Function',
}

const RE_WHITESPACE = /^\s+/
const RE_DOUBLE_QUOTE = /^"/
const RE_TRIPLE_DOUBLE_QUOTE = /^"{3}/
const RE_SINGLE_QUOTE = /^'/
const RE_TEXT = /^.+/
const RE_ANY_TEXT = /^[^\n]+/
const RE_STRING_DOUBLE_QUOTE_CONTENT = /^[^"\\]+/
const RE_STRING_SINGLE_QUOTE_CONTENT = /^[^'\\]+/
const RE_STRING_TRIPLE_DOUBLE_QUOTE_CONTENT = /^.+(?=""")/
const RE_LINE_COMMENT = /^#/
const RE_KEYWORD =
  /^(?:__debug__|Ellipsis|yield|with|while|try|true|True|return|raise|pass|or|NotImplemented|not|nonlocal|None|lambda|is|in|import|if|global|from|for|finally|False|false|except|else|elif|del|def|continue|class|break|await|async|assert|as|and)\b/
const RE_VARIABLE_NAME = /^[_a-zA-Z][a-zA-Z\d_]*/
const RE_NUMERIC =
  /^((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)\b/
const RE_PUNCTUATION = /^[\(\)\{\}:,\+\-\*&=\/\\\[\]!\.<>%]+/
const RE_FUNCTION_CALL_NAME = /^[\w]+(?=\s*\()/
const RE_DECORATOR = /^@[\w]+/
const RE_TRIPLE_QUOTED_STRING_CONTENT_DOUBLE_QUOTES = /.*(?=""")/s
const RE_TRIPLE_QUOTED_STRING_CONTENT_SINGLE_QUOTES = /.*(?=''')/s
const RE_TRIPLE_QUOTED_STRING_CONTENT_COMMON = /.*/s
const RE_STRING_ESCAPE = /^\\./
const RE_TRIPLE_SINGLE_QUOTE = /^'{3}/

export const initialLineState = {
  state: State.TopLevelContent,
}

export const hasArrayReturn = true

/**
 *
 * @param {string} line
 * @param {{state: State}} lineState
 * @returns
 */
export const tokenizeLine = (line, lineState) => {
  let next = null
  let index = 0
  let tokens = []
  let token = TokenType.None
  let state = lineState.state
  while (index < line.length) {
    const part = line.slice(index)
    switch (state) {
      case State.TopLevelContent:
        if ((next = part.match(RE_WHITESPACE))) {
          token = TokenType.Whitespace
          state = State.TopLevelContent
        } else if ((next = part.match(RE_KEYWORD))) {
          switch (next[0]) {
            case 'True':
            case 'False':
            case 'None':
              token = TokenType.LanguageConstant
              break
            case 'return':
              token = TokenType.KeywordReturn
              break
            case 'from':
            case 'import':
              token = TokenType.KeywordImport
              break
            case 'if':
            case 'elif':
            case 'else':
            case 'try':
            case 'catch':
            case 'finally':
            case 'while':
            case 'for':
            case 'continue':
            case 'not':
            case 'except':
            case 'with':
            case 'as':
            case 'raise':
            case 'break':
              token = TokenType.KeywordControl
              break
            default:
              token = TokenType.Keyword
              break
          }
          state = State.TopLevelContent
        } else if ((next = part.match(RE_FUNCTION_CALL_NAME))) {
          token = TokenType.Function
          state = State.TopLevelContent
        } else if ((next = part.match(RE_VARIABLE_NAME))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_PUNCTUATION))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if ((next = part.match(RE_NUMERIC))) {
          token = TokenType.Numeric
          state = State.TopLevelContent
        } else if ((next = part.match(RE_TRIPLE_DOUBLE_QUOTE))) {
          token = TokenType.Punctuation
          state = State.InsideTripleDoubleQuoteString
        } else if ((next = part.match(RE_TRIPLE_SINGLE_QUOTE))) {
          token = TokenType.Punctuation
          state = State.InsideTripleSingleQuoteString
        } else if ((next = part.match(RE_DOUBLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_SINGLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.InsideLineComment
        } else if ((next = part.match(RE_DECORATOR))) {
          token = TokenType.VariableName
          state = State.TopLevelContent
        } else if ((next = part.match(RE_TEXT))) {
          token = TokenType.Text
          state = State.TopLevelContent
        } else {
          part //?
          throw new Error('no')
        }
        break
      case State.InsideDoubleQuoteString:
        if ((next = part.match(RE_STRING_DOUBLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_DOUBLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideDoubleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideSingleQuoteString:
        if ((next = part.match(RE_STRING_SINGLE_QUOTE_CONTENT))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_SINGLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.TopLevelContent
        } else if ((next = part.match(RE_STRING_ESCAPE))) {
          token = TokenType.String
          state = State.InsideSingleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideTripleDoubleQuoteString:
        if ((next = part.match(RE_TRIPLE_DOUBLE_QUOTE))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if (
          (next = part.match(RE_TRIPLE_QUOTED_STRING_CONTENT_DOUBLE_QUOTES))
        ) {
          token = TokenType.String
          state = State.InsideTripleDoubleQuoteString
        } else if (
          (next = part.match(RE_TRIPLE_QUOTED_STRING_CONTENT_COMMON))
        ) {
          token = TokenType.String
          state = State.InsideTripleDoubleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideTripleSingleQuoteString:
        if ((next = part.match(RE_TRIPLE_SINGLE_QUOTE))) {
          token = TokenType.Punctuation
          state = State.TopLevelContent
        } else if (
          (next = part.match(RE_TRIPLE_QUOTED_STRING_CONTENT_SINGLE_QUOTES))
        ) {
          token = TokenType.String
          state = State.InsideTripleSingleQuoteString
        } else if (
          (next = part.match(RE_TRIPLE_QUOTED_STRING_CONTENT_COMMON))
        ) {
          next
          token = TokenType.String
          state = State.InsideTripleSingleQuoteString
        } else {
          throw new Error('no')
        }
        break
      case State.InsideLineComment:
        if ((next = part.match(RE_ANY_TEXT))) {
          token = TokenType.Comment
          state = State.TopLevelContent
        } else {
          throw new Error('no')
        }
        break
      default:
        state
        throw new Error('no')
    }
    const tokenLength = next[0].length
    index += tokenLength
    tokens.push(token, tokenLength)
  }
  return {
    state,
    tokens,
  }
}

tokenizeLine(`'''test'''`, initialLineState) //?

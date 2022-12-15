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
}

const RE_WHITESPACE = /^\s+/
const RE_DOUBLE_QUOTE = /^"/
const RE_SINGLE_QUOTE = /^'/
const RE_ANGLE_BRACKET_OPEN = /^<(?!\s)/
const RE_ANGLE_BRACKET_CLOSE = /^>/
const RE_TAGNAME = /^[!\w]+/
const RE_TEXT = /^.+/
const RE_ANY_TEXT = /^[^\n]+/
const RE_SLASH = /^\//
const RE_ATTRIBUTE_NAME = /^[a-zA-Z\d\-]+/
const RE_EQUAL_SIGN = /^=/
const RE_STRING_DOUBLE_QUOTE_CONTENT = /^[^"]+/
const RE_STRING_SINGLE_QUOTE_CONTENT = /^[^']+/
const RE_PUNCTUATION_SELF_CLOSING = /^\/>/
const RE_INVALID_INSIDE_OPENING_TAG = /^[^a-zA-Z>]/
const RE_INVALID_INSIDE_ClOSING_TAG = /^[^a-zA-Z>]/
const RE_NOT_TAGNAME = /^[^a-zA-Z\d]+/
const RE_WORD = /^[^\s]+/
const RE_ANGLE_BRACKET_ONLY = /^</
const RE_NEWLINE = /^\n/
const RE_EXCLAMATION_MARK = /^!/
const RE_SELF_CLOSING = /^\/>/
const RE_DASH_DASH = /^\-\-/
const RE_TAG_TEXT = /^[^\s>]+/
const RE_LINE_COMMENT = /^#/
const RE_NEWLINE_WHITESPACE = /^\n\s*/
const RE_BLOCK_COMMENT_START = /^\/\*/
const RE_BLOCK_COMMENT_CONTENT = /^.+(?=\*\/)/s
const RE_BLOCK_COMMENT_END = /^\*\//
const RE_UNKNOWN_VALUE = /^[^\}\{\s,"]+/
const RE_KEYWORD =
  /^(?:__debug__|Ellipsis|yield|with|while|try|true|True|return|raise|pass|or|NotImplemented|not|nonlocal|None|lambda|is|in|import|if|global|from|for|finally|False|false|except|else|elif|del|def|continue|class|break|await|async|assert|as|and)\b/
const RE_FUNCTION_NAME = /^[a-zA-Z\d]+/
const RE_ROUND_OPEN = /^\(/
const RE_VARIABLE_NAME = /^[_a-zA-Z][a-zA-Z\d_]*/
const RE_ROUND_CLOSE = /^\)/
const RE_OPERATOR = /^(\+|\-|\*|\/)/
const RE_NUMERIC =
  /^((0(x|X)[0-9a-fA-F]*)|(([0-9]+\.?[0-9]*)|(\.[0-9]+))((e|E)(\+|-)?[0-9]+)?)\b/
const RE_PUNCTUATION = /^[\(\)\{\}:,\+\-\*&=\/\\\[\]!\.<>%]+/

export const initialLineState = {
  state: State.TopLevelContent,
}

// TODO maybe reverse order of parameters -> line, context (context may be optional)

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
              token = TokenType.KeywordControl
              break
            default:
              token = TokenType.Keyword
              break
          }
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
        } else if ((next = part.match(RE_DOUBLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideDoubleQuoteString
        } else if ((next = part.match(RE_SINGLE_QUOTE))) {
          token = TokenType.PunctuationString
          state = State.InsideSingleQuoteString
        } else if ((next = part.match(RE_LINE_COMMENT))) {
          token = TokenType.Comment
          state = State.InsideLineComment
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
    index += next[0].length
    tokens.push({
      type: token,
      length: next[0].length,
    })
  }
  return {
    state,
    tokens,
  }
}

// tokenizeLine(initialContext, `def add(a,b):`) //?

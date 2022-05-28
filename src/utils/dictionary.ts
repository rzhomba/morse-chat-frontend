export const dictionary = new Map<string, string>([
  ['A', '.-'],
  ['B', '-...'],
  ['C', '-.-.'],
  ['D', '-..'],
  ['E', '.'],
  ['F', '..-.'],
  ['G', '--.'],
  ['H', '....'],
  ['I', '..'],
  ['J', '.---'],
  ['K', '-.-'],
  ['L', '.-..'],
  ['M', '--'],
  ['N', '-.'],
  ['O', '---'],
  ['P', '.--.'],
  ['Q', '--.-'],
  ['R', '.-.'],
  ['S', '...'],
  ['T', '-'],
  ['U', '..-'],
  ['V', '...-'],
  ['W', '.--'],
  ['X', '-..-'],
  ['Y', '-.--'],
  ['Z', '--..'],
  ['1', '.----'],
  ['2', '..---'],
  ['3', '...--'],
  ['4', '....-'],
  ['5', '.....'],
  ['6', '-....'],
  ['7', '--...'],
  ['8', '---..'],
  ['9', '----.'],
  ['0', '-----']
])

export const dictionaryReversed = new Map<string, string>()
for (const [key, value] of dictionary) {
  dictionaryReversed.set(value, key)
}

export const strToMorse = (str: string): string => {
  str = str
    .replace(/\s{2,}/g, ' ') // Remove extra spaces
    .replace(/[^A-Z\d\s]+/g, '') // Remove invalid characters
    .trim()

  let result = ''

  for (const char of str) {
    if (char === ' ') {
      result = result.trim()
      result += '/'
    } else {
      result += dictionary.get(char) ?? ''
      result += ' '
    }
  }

  return result.trim()
}

export const morseToStr = (morse: string): string => {
  const processed = morse
    .replace(/\s{2,}/g, ' ') // Remove extra spaces
    .replace(/[^.\-/\s]+/g, '') // Remove invalid characters
    .trim()
    .split('/')
    .map(v => v.split(' '))

  let result = ''

  for (const word of processed) {
    for (const letter of word) {
      result += dictionaryReversed.get(letter) ?? ''
    }
    result += ' '
  }

  return result.trim()
}

export const validateMorse = (morse: string): string => {
  return strToMorse(morseToStr(morse)) // I'm terribly sorry for this
}

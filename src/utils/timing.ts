/*
 * The length of a dot is 1 time unit.
 * A dash is 3 time units.
 * The space between symbols (dots and dashes) of the same letter is 1 time unit.
 * The space between letters is 3 time units.
 * The space between words is 7 time units.
 */

const msPerUnit = 150

export default {
  dotLength: msPerUnit,
  dashLength: msPerUnit * 3,
  symbolSpace: msPerUnit,
  letterSpace: msPerUnit * 3,
  wordSpace: msPerUnit * 7,
  sendTimeout: msPerUnit * 15
}

/**
 * Validates if string is a valid whole number, no decimal places, can be negative.
 * From: https://stackoverflow.com/a/24457420
 *
 * @param value string to be validated.
 * @returns True if it passes validation, false if otherwise.
 */
function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

export default isNumeric;

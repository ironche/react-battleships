export function nextLetter(step: number = 1, char: string = 'A'): string {
  return String.fromCharCode(char.charCodeAt(0) + step);
}

export function parseCoord(coord: string): [string, number] {
  const pieces = coord.match(/([A-Z]+)(\d+)/) ?? ['', '', '0'];
  return [pieces[1], parseInt(pieces[2])];
}

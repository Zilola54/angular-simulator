
//пункт 4
let instatus: "loading"| "success"| "error";
instatus = "loading"
instatus = "success"
instatus = "error"

//5 пункт
let textFormat:  'uppercase'|  'lowercase' | 'capitalize';
textFormat = 'uppercase'
textFormat = 'lowercase'
textFormat = 'capitalize'

//пункт 3
function addNumbers(a: number, b: number): number {
  return a + b;
}
addNumbers(10, 20)

//пункт 8
function changeLine(text: string, format:'uppercase'|  'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') {
    return text.toUpperCase();
  } else if (format === 'lowercase') {
    return text.toLowerCase();
  } else if (format === 'capitalize') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  } else {
    return text
  }
}
//пункт 9 
function convertString(text: string, symbol: string): string {
  return text.replaceAll(symbol,'')
}
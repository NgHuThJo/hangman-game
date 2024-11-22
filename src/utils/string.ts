export function convertAllUnderscoresToHyphens(string: string) {
  return string.replaceAll(/_/g, "-");
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toLocaleUpperCase() + string.slice(1);
}

export function findAllOccurencesOfLetter(text: string, character: string) {
  const occurenceList = [];

  for (let i = 0; i < text.length; i++) {
    if (text[i] === character) {
      occurenceList.push(i);
    }
  }
  return occurenceList;
}

export default function getVimeoVideoID(vimeoUrl) {
  const groupOfNumbers = /([0-9]+)/;
  const groupsOfNumbers = vimeoUrl.match(groupOfNumbers);

  return groupsOfNumbers[0];
}

export default function replaceImageType(url: string) {
  const allAfterUnderscore = /\_(.*)/;
  const modifiedUrl = url.replace(allAfterUnderscore, ".webp");

  return modifiedUrl;
}

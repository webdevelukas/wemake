export default function getAspectRatio(width: number, height: number) {
  try {
    if (height > width) return "vertical";
    if (height < width) return "horizontal";
    if (height === width) return "square";
  } catch (error) {
    throw new error("Can't define aspect ratio");
  }
  return "";
}

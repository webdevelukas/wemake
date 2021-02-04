function elementIsInView(element: Element) {
  const elementRectangle = element.getBoundingClientRect();
  const bodyRectangle = document.body.getBoundingClientRect();
  const elementHeight = document.documentElement.clientHeight;

  const elementPosition = elementRectangle.top - bodyRectangle.top;
  const scrollPosition = window.scrollY;

  return (
    (elementRectangle.top <= 0 && elementRectangle.bottom >= 0) ||
    (elementRectangle.bottom >= (window.innerHeight || elementHeight) &&
      elementRectangle.top <= (window.innerHeight || elementHeight)) ||
    (elementRectangle.top >= 0 &&
      elementRectangle.bottom <= (window.innerHeight || elementHeight)) ||
    elementPosition <= scrollPosition
  );
}

export default elementIsInView;

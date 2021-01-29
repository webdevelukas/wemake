function elementIsInView(element: Element) {
  const elementRectangle = element.getBoundingClientRect();

  return (
    (elementRectangle.top <= 0 && elementRectangle.bottom >= 0) ||
    (elementRectangle.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      elementRectangle.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (elementRectangle.top >= 0 &&
      elementRectangle.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  );
}

export default elementIsInView;

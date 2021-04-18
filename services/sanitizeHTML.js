import DOMPurify from "isomorphic-dompurify";

export default function sanitizeHTML(HTML) {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if ("target" in node) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noopener noreferrer");
    }
    if (
      !node.hasAttribute("target") &&
      (node.hasAttribute("xlink:href") || node.hasAttribute("href"))
    ) {
      node.setAttribute("xlink:show", "new");
    }
  });

  const sanitizedHTML = DOMPurify.sanitize(HTML);

  return sanitizedHTML;
}

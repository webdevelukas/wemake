import DOMPurify from "isomorphic-dompurify";

export default function sanitizeHTML(HTML: string) {
  const sanitizedHTML = DOMPurify.sanitize(HTML);

  return sanitizedHTML;
}

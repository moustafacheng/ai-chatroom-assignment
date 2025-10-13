import { marked } from "marked";

// Shared renderer: only override links; keep list semantics default
const renderer = new marked.Renderer();
renderer.link = function (token) {
  const safeHref = String(token.href || "");
  const safeText = String(token.text || "");
  const titleAttr = token.title ? ` title="${token.title}"` : "";
  return `<a href="${safeHref}"${titleAttr} class="tw-break-all tw-text-orange-400 hover:tw-text-orange-800 tw-transition-colors tw-duration-200 tw-underline tw-font-medium" target="_blank" rel="noopener noreferrer">${safeText}</a>`;
};

const baseOptions = {
  breaks: true,
  gfm: true,
  renderer,
};

export function renderMarkdown(content) {
  if (!content) return "";
  return marked.parse(content, { async: false, ...baseOptions });
}

export function markdownToHtml(content) {
  return renderMarkdown(content);
}

export function markdownToPlainText(content) {
  const html = renderMarkdown(content || "");
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

export { renderer };

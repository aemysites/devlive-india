/**
 * Accordion Block - WKND Trendsetters
 * Pixel-perfect reproduction of original accordion design
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';

    // Create text wrapper
    const textWrapper = document.createElement('span');
    textWrapper.className = 'accordion-item-text';
    textWrapper.append(...label.childNodes);

    // Create chevron icon
    const icon = document.createElement('span');
    icon.className = 'accordion-item-icon';
    icon.setAttribute('aria-hidden', 'true');

    summary.append(textWrapper, icon);

    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    row.replaceWith(details);
  });
}

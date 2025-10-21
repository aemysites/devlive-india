/**
 * Hero Block - WKND Trendsetters
 * Pixel-perfect reproduction of original hero design
 */

export default function decorate(block) {
  // Parse EDS block structure
  const rows = [...block.children];

  // The content is in the second row
  const contentRow = rows[1];
  if (!contentRow) return;

  const contentCell = contentRow.querySelector('div');
  if (!contentCell) return;

  // Extract elements
  const h1 = contentCell.querySelector('h1');
  const paragraphs = contentCell.querySelectorAll('p');

  // Separate description paragraph from link paragraphs
  const description = paragraphs[0];
  const linkParagraphs = Array.from(paragraphs).slice(1);

  // Create hero structure matching original
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  // Add h1 (remove strong wrapper if present)
  if (h1) {
    const h1Clone = h1.cloneNode(true);
    // Extract text from strong tag if present
    const strong = h1Clone.querySelector('strong');
    if (strong) {
      h1Clone.textContent = strong.textContent;
    }
    heroContent.appendChild(h1Clone);
  }

  // Add description paragraph
  if (description) {
    const descClone = description.cloneNode(true);
    heroContent.appendChild(descClone);
  }

  // Create links container
  if (linkParagraphs.length > 0) {
    const linksContainer = document.createElement('div');
    linksContainer.className = 'hero-links';

    linkParagraphs.forEach(linkP => {
      const link = linkP.querySelector('a');
      if (link) {
        const linkClone = link.cloneNode(true);
        linkClone.className = 'button';
        linksContainer.appendChild(linkClone);
      }
    });

    heroContent.appendChild(linksContainer);
  }

  heroContainer.appendChild(heroContent);

  // Replace block content
  block.textContent = '';
  block.appendChild(heroContainer);
}

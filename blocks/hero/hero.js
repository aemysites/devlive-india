/**
 * Hero Block - WKND Trendsetters
 * Pixel-perfect reproduction of original hero design
 */

export default function decorate(block) {
  // Parse EDS block structure
  const rows = [...block.children];

  // Extract all content
  let h1, description, links = [];

  rows.forEach(row => {
    const cell = row.querySelector('div');
    if (!cell) return;

    // Check for h1
    const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && heading.textContent.trim().startsWith('#')) {
      // Markdown h1 starts with #
      h1 = document.createElement('h1');
      h1.textContent = heading.textContent.replace(/^#+\s*/, '').trim();
    } else if (heading && !h1) {
      h1 = heading.cloneNode(true);
    }

    // Check for description paragraph
    const paragraphs = cell.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (!p.querySelector('a') && p.textContent.trim() && !description) {
        description = p.cloneNode(true);
      } else if (p.querySelector('a')) {
        const linkElements = p.querySelectorAll('a');
        linkElements.forEach(link => links.push(link.cloneNode(true)));
      }
    });
  });

  // Create hero structure matching original
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  // Add h1
  if (h1) {
    heroContent.appendChild(h1);
  }

  // Add description paragraph
  if (description) {
    heroContent.appendChild(description);
  }

  // Create links container
  if (links.length > 0) {
    const linksContainer = document.createElement('div');
    linksContainer.className = 'hero-links';

    links.forEach(link => {
      link.className = 'button';
      linksContainer.appendChild(link);
    });

    heroContent.appendChild(linksContainer);
  }

  heroContainer.appendChild(heroContent);

  // Replace block content
  block.textContent = '';
  block.appendChild(heroContainer);
}

/**
 * Cards Block - WKND Trendsetters
 * Pixel-perfect reproduction of blog-style cards
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards-card';

    const cells = [...row.children];

    // First cell contains image
    const imageCell = cells[0];
    const contentCell = cells[1];

    if (imageCell) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'cards-card-image';
      while (imageCell.firstElementChild) {
        imageDiv.append(imageCell.firstElementChild);
      }
      li.append(imageDiv);
    }

    if (contentCell) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'cards-card-body';

      // Parse content - handling ### as h3
      const rawContent = contentCell.innerHTML;

      // Extract h3 from ### markdown or actual h3
      const h3Match = rawContent.match(/###\s*([^<\n]+)/);
      let heading = contentCell.querySelector('h3');

      if (h3Match && !heading) {
        heading = document.createElement('h3');
        heading.textContent = h3Match[1].trim();
      }

      // Get all text content split by <br> tags
      const parts = contentCell.innerHTML.split('<br>');

      // Extract metadata (e.g., "Chill • 3 min read")
      const metaText = parts.find(p =>
        p.includes('•') && !p.includes('###')
      );

      if (metaText) {
        const meta = document.createElement('div');
        meta.className = 'cards-card-meta';
        meta.textContent = metaText.replace(/<[^>]*>/g, '').trim();
        contentDiv.append(meta);
      }

      // Add title
      if (heading) {
        const title = heading.cloneNode(true);
        title.className = 'cards-card-title';
        contentDiv.append(title);
      }

      // Extract description (text between heading and link)
      const paragraphs = contentCell.querySelectorAll('p');
      const descParagraph = Array.from(paragraphs).find(p =>
        !p.querySelector('a') && p.textContent.trim() && !p.textContent.includes('•')
      );

      if (descParagraph) {
        const desc = document.createElement('p');
        desc.className = 'cards-card-description';
        desc.textContent = descParagraph.textContent.trim();
        contentDiv.append(desc);
      } else {
        // Try to find description in text content
        const descMatch = parts.find(p =>
          !p.includes('###') &&
          !p.includes('•') &&
          !p.includes('<a ') &&
          p.replace(/<[^>]*>/g, '').trim().length > 20
        );

        if (descMatch) {
          const desc = document.createElement('p');
          desc.className = 'cards-card-description';
          desc.textContent = descMatch.replace(/<[^>]*>/g, '').trim();
          contentDiv.append(desc);
        }
      }

      // Link (last link in content)
      const link = contentCell.querySelector('a');
      if (link) {
        const cardLink = link.cloneNode(true);
        cardLink.className = 'cards-card-link';
        contentDiv.append(cardLink);
      }

      li.append(contentDiv);
    }

    ul.append(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.replaceChildren(ul);
}

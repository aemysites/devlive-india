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

      // Extract meta, title, description, and link
      const paragraphs = contentCell.querySelectorAll('p');
      const heading = contentCell.querySelector('h3');

      // Meta (first paragraph with strong, e.g., "Chill • 3 min read")
      if (paragraphs[0] && paragraphs[0].querySelector('strong')) {
        const meta = document.createElement('div');
        meta.className = 'cards-card-meta';
        meta.textContent = paragraphs[0].textContent.trim();
        contentDiv.append(meta);
      }

      // Title
      if (heading) {
        const title = heading.cloneNode(true);
        title.className = 'cards-card-title';
        contentDiv.append(title);
      }

      // Description (paragraph between heading and link)
      const descParagraph = Array.from(paragraphs).find(p =>
        !p.querySelector('strong') && !p.querySelector('a')
      );
      if (descParagraph) {
        const desc = document.createElement('p');
        desc.className = 'cards-card-description';
        desc.textContent = descParagraph.textContent.trim();
        contentDiv.append(desc);
      }

      // Link (last paragraph with link)
      const linkParagraph = Array.from(paragraphs).find(p => p.querySelector('a'));
      if (linkParagraph) {
        const link = linkParagraph.querySelector('a').cloneNode(true);
        link.className = 'cards-card-link';
        contentDiv.append(link);
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

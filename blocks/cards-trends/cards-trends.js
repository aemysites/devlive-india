import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Check if there's a link in the content
    const link = row.querySelector('a');
    let cardWrapper;

    if (link && link.textContent.trim()) {
      // Create a link wrapper for the entire card
      cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.title = link.textContent.trim();
    } else {
      // Create a div wrapper if no link
      cardWrapper = document.createElement('div');
    }

    while (row.firstElementChild) cardWrapper.append(row.firstElementChild);

    // Classify the card sections
    [...cardWrapper.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else if (!div.querySelector('a')) {
        // Only set as card-body if it doesn't contain the link we already processed
        div.className = 'cards-card-body';
      }
    });

    // Remove the link from card body if it was moved to wrapper
    if (link && cardWrapper.tagName === 'A') {
      const linkInBody = cardWrapper.querySelector('.cards-card-body a');
      if (linkInBody && linkInBody.href === cardWrapper.href) {
        linkInBody.remove();
      }
    }

    li.append(cardWrapper);
    ul.append(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) =>
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])
    )
  );

  block.textContent = '';
  block.append(ul);
}

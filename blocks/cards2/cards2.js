/**
 * Cards2 Block - WKND Trendsetters Style (Icon Cards)
 * Simple text-based cards without images
 */

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'cards2-card';

    // Create card wrapper
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cards2-card-content';

    // Get the text content from the row
    const textContent = row.textContent.trim();

    // Description text
    const description = document.createElement('p');
    description.className = 'cards2-card-description';
    description.textContent = textContent;
    cardDiv.append(description);

    li.append(cardDiv);
    ul.append(li);
  });

  block.replaceChildren(ul);
}

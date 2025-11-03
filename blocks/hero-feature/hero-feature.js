export default function decorate(block) {
  // The hero-feature block expects:
  // - First row: background image
  // - Second row: container for card + side image
  //   - Card with: heading, list, button (has border/shadow)
  //   - Side image (outside the card)

  const rows = [...block.children];

  // First row is the background image (leave as is)

  // Second row contains both the card and the side image
  if (rows[1]) {
    const container = rows[1];
    const contentItems = [...container.children];

    // Create card wrapper for heading, list, button
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'hero-feature-card';

    // Create image wrapper (outside the card)
    const imageDiv = document.createElement('div');
    imageDiv.className = 'hero-feature-image';

    // Distribute items
    contentItems.forEach((item) => {
      // If item contains an image (not wrapped in anything else), it goes to imageDiv
      if (item.querySelector('picture') && item.children.length === 1) {
        imageDiv.append(item);
      } else {
        // Everything else (heading, list, button) goes to cardWrapper
        cardWrapper.append(item);
      }
    });

    // Clear and rebuild structure: card and image as siblings
    container.innerHTML = '';
    container.append(cardWrapper);
    container.append(imageDiv);
  }
}

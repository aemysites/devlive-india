export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns and buttons
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // Style buttons
      const links = col.querySelectorAll('a');
      links.forEach(link => {
        const parent = link.parentElement;
        // If link is in its own paragraph, make it a button
        if (parent.tagName === 'P' && parent.children.length === 1) {
          link.className = 'button';
        }
      });

      // Group consecutive button paragraphs
      const paragraphs = col.querySelectorAll('p');
      const buttonParagraphs = Array.from(paragraphs).filter(p => {
        const link = p.querySelector('a');
        return link && link.classList.contains('button');
      });

      if (buttonParagraphs.length > 1) {
        // Check if consecutive
        let consecutive = true;
        for (let i = 0; i < buttonParagraphs.length - 1; i++) {
          const next = buttonParagraphs[i].nextElementSibling;
          if (next !== buttonParagraphs[i + 1]) {
            consecutive = false;
            break;
          }
        }

        if (consecutive) {
          const container = document.createElement('div');
          container.className = 'button-container';
          buttonParagraphs.forEach(p => {
            const btn = p.querySelector('a');
            if (btn) container.appendChild(btn);
          });
          buttonParagraphs[0].replaceWith(container);
          buttonParagraphs.slice(1).forEach(p => p.remove());
        }
      }
    });
  });
}

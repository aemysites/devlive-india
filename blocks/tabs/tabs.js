/**
 * Tabs Block - Interactive/Stateful Pattern
 * Pixel-perfect migration from WKND Trendsetters site
 */

export default function decorate(block) {
  // Step 1: Parse EDS table structure
  // Expected structure: each row contains tab label | tab content
  const rows = [...block.children];

  // Create tabs wrapper
  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'tabs-wrapper';

  // Create tablist (navigation)
  const tablist = document.createElement('div');
  tablist.setAttribute('role', 'tablist');
  tablist.className = 'tabs-list';

  // Create tabpanels container
  const tabpanelsContainer = document.createElement('div');
  tabpanelsContainer.className = 'tabs-panels';

  // Process each row to create tab + panel
  rows.forEach((row, index) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const tabLabel = cells[0].textContent.trim();
    const tabContent = cells[1];

    // Create tab button
    const tab = document.createElement('button');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tab.setAttribute('aria-controls', `tabpanel-${index}`);
    tab.setAttribute('id', `tab-${index}`);
    tab.className = 'tab-button';
    tab.textContent = tabLabel;

    // Create tabpanel
    const panel = document.createElement('div');
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `tab-${index}`);
    panel.setAttribute('id', `tabpanel-${index}`);
    panel.className = 'tab-panel';
    panel.hidden = index !== 0;

    // Move content from cell to panel
    while (tabContent.firstChild) {
      panel.appendChild(tabContent.firstChild);
    }

    // Add click handler
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      const allTabs = tablist.querySelectorAll('[role="tab"]');
      const allPanels = tabpanelsContainer.querySelectorAll('[role="tabpanel"]');

      allTabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.classList.remove('active');
      });

      allPanels.forEach(p => {
        p.hidden = true;
      });

      // Activate clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.classList.add('active');
      panel.hidden = false;
    });

    // Add elements to containers
    tablist.appendChild(tab);
    tabpanelsContainer.appendChild(panel);
  });

  // Assemble structure
  tabsWrapper.appendChild(tablist);
  tabsWrapper.appendChild(tabpanelsContainer);

  // Replace block content
  block.textContent = '';
  block.appendChild(tabsWrapper);

  // Add keyboard navigation
  initializeKeyboardNavigation(block);
}

/**
 * Initialize keyboard navigation for tabs
 */
function initializeKeyboardNavigation(block) {
  const tablist = block.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

  tablist.addEventListener('keydown', (e) => {
    const currentTab = document.activeElement;
    const currentIndex = tabs.indexOf(currentTab);

    let nextIndex = currentIndex;

    // Arrow key navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    // Focus and activate the next tab
    if (nextIndex !== currentIndex) {
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  });
}

export default function decorate(block) {
  // Build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // Build tabpanels
  const tabpanels = document.createElement('div');
  tabpanels.className = 'tabs-panels';

  // decorate tabs and tabpanels
  [...block.children].forEach((child, i) => {
    const tab = document.createElement('button');
    const tabLabel = child.children[0];
    const tabPanel = child.children[1];

    tab.className = 'tabs-tab';
    tab.id = `tab-${i}`;
    tab.innerHTML = tabLabel.innerHTML;
    tab.setAttribute('aria-controls', `tabpanel-${i}`);
    tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('type', 'button');
    tab.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', 'true');
      });
      tabpanels.querySelectorAll(`#tabpanel-${i}`).forEach((panel) => {
        panel.setAttribute('aria-hidden', 'false');
      });
      block.querySelectorAll('[role=tab]').forEach((t) => {
        t.setAttribute('aria-selected', 'false');
      });
      tab.setAttribute('aria-selected', 'true');
    });
    tablist.append(tab);

    tabPanel.className = 'tabs-panel';
    tabPanel.id = `tabpanel-${i}`;
    tabPanel.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    tabPanel.setAttribute('aria-labelledby', `tab-${i}`);
    tabPanel.setAttribute('role', 'tabpanel');
    tabpanels.append(tabPanel);
  });

  block.innerHTML = '';
  block.append(tablist, tabpanels);
}

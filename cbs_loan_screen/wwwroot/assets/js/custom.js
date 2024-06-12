document.addEventListener("DOMContentLoaded", function () {
    const historySections = document.querySelectorAll('.history-section');
    const historyLists = document.querySelectorAll('.history-list');
  
    // Function to save history to localStorage
    function saveHistory(history) {
      localStorage.setItem('pageHistory', JSON.stringify(history));
    }
  
    // Function to load history from localStorage
    function loadHistory() {
      const history = JSON.parse(localStorage.getItem('pageHistory')) || [];
      return history;
    }
  
    // Function to render history
    function renderHistory() {
      const history = loadHistory();
      historyLists.forEach(historyList => {
        historyList.innerHTML = '';
        if (history.length === 0) {
          historySections.forEach(historySection => historySection.style.display = 'none');
        } else {
          historySections.forEach(historySection => historySection.style.display = 'block');
          history.forEach((page, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'history-item';
            listItem.innerHTML = `
              <a href="${page.url}">${page.name}</a>
              <button data-index="${index}">&times;</button>
            `;
            historyList.appendChild(listItem);
          });
        }
      });
    }
  
    // Function to add a page to history
    function addPageToHistory(name, url) {
      let history = loadHistory();
      if (!history.some(page => page.url === url)) {
        history.push({ name, url });
        saveHistory(history);
        renderHistory();
      }
    }
  
    // Function to remove a page from history
    function removePageFromHistory(index) {
      const history = loadHistory();
      history.splice(index, 1);
      saveHistory(history);
      renderHistory();
    }
  
    // Event listener for closing history items
    historyLists.forEach(historyList => {
      historyList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
          const index = event.target.getAttribute('data-index');
          removePageFromHistory(index);
        }
      });
    });
  
    // Add pages to history when sidebar links are clicked
    document.querySelectorAll('.sidebar-menu .menu-item').forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const pageName = this.textContent;
        const pageUrl = this.href;
        addPageToHistory(pageName, pageUrl);
        window.location.href = pageUrl;
      });
    });
  
    // Initial render of history
    renderHistory();
  });
  
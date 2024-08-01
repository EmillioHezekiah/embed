document.addEventListener("DOMContentLoaded", function() {
    const rssFeedUrl = "https://www.tradepr.work/articles/rss";
    const container = document.getElementById("community-articles-container");
  
    fetch(rssFeedUrl)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const items = xml.querySelectorAll("item");
  
        items.forEach(item => {
          const title = item.querySelector("title").textContent;
          const link = item.querySelector("link").textContent;
          const description = item.querySelector("description").textContent;
  
          const article = document.createElement("div");
          article.classList.add("community-article");
  
          const articleTitle = document.createElement("h3");
          articleTitle.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
          article.appendChild(articleTitle);
  
          const articleDescription = document.createElement("p");
          articleDescription.textContent = description;
          article.appendChild(articleDescription);
  
          container.appendChild(article);
        });
      })
      .catch(error => console.error("Error fetching RSS feed:", error));
  });
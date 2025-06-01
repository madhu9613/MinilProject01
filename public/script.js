const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;
let isLoading = false;

async function searchImages() {
    if (isLoading) return;
    isLoading = true;

    keyword = searchBox.value.trim();
    if (!keyword) {
        alert("Please enter a keyword to search.");
        isLoading = false;
        return;
    }
  console.log(keyword);
  
    const url = `/api/search?page=${page}&query=${encodeURIComponent(keyword)}`;
    console.log(url);
    

    try {
        showLoading();

        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        console.log(response);
        

        displayResults(data.results);

        if (data.results.length < 12) {
            showMoreBtn.style.display = "none";
        } else {
            showMoreBtn.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch images. Please try again later.");
    } finally {
        hideLoading();
        isLoading = false;
    }
}

function displayResults(results) {
    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image";
        image.loading = "lazy";

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.rel = "noopener noreferrer";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });
}

function showLoading() {
    showMoreBtn.textContent = "Loading...";
    showMoreBtn.disabled = true;
}

function hideLoading() {
    showMoreBtn.textContent = "Show More";
    showMoreBtn.disabled = false;
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

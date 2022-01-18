// Init a new Fuse instance with some pretty random docs.
const list = ["weddings", "social", "corporate"];
const fuse = new Fuse(list, {
    includeScore: true
});

//query result container
let $queryResultElement = document.getElementById("event-results");
const searchQueryInput = document.getElementById('search-input');
if(typeof(searchQueryInput) != 'undefined' && searchQueryInput != null){
    searchQueryInput.addEventListener("keyup", function (input) {
        const results = fuse.search(input.target.value);
        let $searchItems = results.map((item) => {
            return `<li class="bg-white p-2"><a class="capital-first hover:text-blue" href="${item.refIndex}">${item.item}</a></li>`;
        }).join('');
        $queryResultElement.style = "block"
        $queryResultElement.innerHTML = $searchItems
    });
}




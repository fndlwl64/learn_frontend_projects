import { SearchApi } from "./api.js";
import { SearchRenderer } from "./render.js";
(async function() {

    // dom
    const searchForm = document.querySelector("#search_form");
    const searchList = document.querySelector("#search_list");
    
    // class
    const searchApi = new SearchApi();
    const searchRenderer = new SearchRenderer(searchList);

    // event
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        searchRenderer.loading();
        
        const query = e.target.querySelector("input[type='search']").value;
        const result = await searchApi.call(query);
        const json = await result.json();
        
        searchRenderer.render(json.documents);
    });

})();
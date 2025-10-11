import { SearchApi } from "./api.js";
import { SearchRenderer } from "./render.js";
import { Pagination } from "./pagination.js";

(async function() {
    // dom
    const searchForm = document.querySelector("#search_form");
    const searchList = document.querySelector("#search_list");
    const searchPagination = document.querySelector("#search_pagination");

    // class
    const searchApi = new SearchApi();
    const searchRenderer = new SearchRenderer(searchList);
    const pagination = new Pagination(searchPagination);

    // common
    async function performSearch(query, page = 1) {
        searchRenderer.loading();

        const result = await searchApi.call(query, page);
        const json = await result.json();

        searchRenderer.render(json.documents);
        pagination.render(json.meta.pageable_count ,page);
    }

    // event
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        searchRenderer.loading();
        
        const query = e.target.querySelector("input[type='search']").value;
        
        await performSearch(query);
    });

    searchPagination.addEventListener("click", async (e) => {
        const li = e.target.closest("li");
        if (!li) return;

        const page = Number(li.dataset.page || li.textContent);
        const query= searchForm.querySelector("input[type='search']").value;
        await performSearch(query, page);
    });
})();
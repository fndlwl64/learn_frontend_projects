export class Pagination {
    constructor(paginationElement, pageCount = 5) {
        this.paginationElement = paginationElement;
        this.pageCount = pageCount;
        this.currentPage = 1;
        this.pagableCount = 0;
    }
    render(pagableCount, currentPage = 1) {
        this.clear();
        this.currentPage = currentPage;
        this.pagableCount = pagableCount;
        const component = this.paginationElement;
        
        // prev arrow 
        let firstItem = this.createListItem(currentPage != 1 ? 1 : 0,"arrow_first");
        let prevItem = this.createListItem(currentPage - 1, "arrow_prev");
        component.appendChild(firstItem);
        component.appendChild(prevItem);

        // page numbers 
        let step = (Math.ceil(currentPage / this.pageCount) - 1) * this.pageCount;
        let last = Math.min(step + this.pageCount, pagableCount);
        for(let page = step + 1; page <= last; page++){
            let item = this.createListItem(page);
            component.appendChild(item);
        }

        // next arrow
        let nextItem = this.createListItem(currentPage + 1, "arrow_next");
        let lastItem = this.createListItem(pagableCount, "arrow_last");
        component.appendChild(nextItem);
        component.appendChild(lastItem);
        
    }
    createListItem(page, type){
        let li = document.createElement("li");
        li.dataset.page = page;

        switch (type) {
            case "arrow_first":
                li.innerHTML = "&laquo;";
                if (page <= 0) li.classList.add("disabled");
                break;
            case "arrow_prev":
                li.innerHTML = "&lsaquo;";
                if (page <= 0) li.classList.add("disabled");
                break;
            case "arrow_next":
                li.innerHTML = "&rsaquo;";
                if (page > this.pagableCount) li.classList.add("disabled");
                break;
            case "arrow_last":
                li.innerHTML = "&raquo;";
                if (this.currentPage ==  this.pagableCount) li.classList.add("disabled");
                break;
            default:
                li.textContent = page;
                if (page === this.currentPage) li.classList.add("active");
                li.classList.add("page-number");
                break;
        }

        if(type)
            li.classList.add(type);
        if(Number(li.textContent) && page == this.currentPage)
            li.classList.add("active");

        return li;
    }
    clear() {
        this.paginationElement.innerHTML = '';
    }
}

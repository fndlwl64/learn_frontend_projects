export class SearchRenderer {

    constructor(list) 
    {   
        this.list = list;
    }   
    render(data) {
        this.clear();
        if(data instanceof Array === false)
            throw new Error("data must be an array");

        data.forEach(item => {
            let li = document.createElement('li');
            let detail = document.createElement('a');

            detail.href = item.url;
            detail.target = "_blank";
            detail.textContent = "상세보기";
            
            li.appendChild(this.createSpan(item.title));
            li.appendChild(this.createSpan(item.contents));
            li.appendChild(detail);
            this.list.appendChild(li);
        });
    }
    loading() {
        this.clear();
        let div = document.createElement('div');
        div.className = "search_loading";
        div.textContent = "Loading...";
        this.list.appendChild(div);
    }
    createSpan(text) {
        const span = document.createElement('span');
        span.innerHTML = text;
        return span;
    }
    clear() {
        this.list.innerHTML = '';
    }   
}
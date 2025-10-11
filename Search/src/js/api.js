export class SearchApi {
    constructor(pageSize = 10) {
        this.pageSize = pageSize;
        this.baseUrl = "https://kakaobook.fndlwl64.workers.dev";
    }
    async call(keyword, pageNum = 1) {
        const result = await fetch(`${this.baseUrl}?query=${keyword}&page=${pageNum}&size=${this.pageSize}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return result;
    }
}
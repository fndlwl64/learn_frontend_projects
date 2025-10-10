export class SearchApi {

    constructor(pageSize = 10) {
        this.pageSize = pageSize;
    }
    async call(keyword, pageNum = 1) {
        const result = await fetch(`https://kakaobook.fndlwl64.workers.dev?query=${keyword}&page=${pageNum}&size=${this.pageSize}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return result;
    }
}
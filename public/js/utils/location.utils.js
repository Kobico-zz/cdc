export class Query {
    query = location.search.substr(1);
    getValue(name) {
        const vars = this.query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === name) {
                return decodeURIComponent(pair[1]);
            }
        }
        return '';
    }
}

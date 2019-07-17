export class SitesService {
    url;
    _sites = {};
    constructor() {
        this.url = `/sites`;
    }

    async getSite(dc, domain) {
        try {
            return this._sites[dc][domain];
        }
        catch(e) {
            const response = await axios.get(this.url, {
                params: {
                    dc,
                    domain
                }
            });
            return response.data;
        }
    }

    async getAllSites(dc) {
        if(this._sites[dc]) {
            return this._sites[dc];
        }
        const response = await axios.get(this.url, {
            params: {
                dc
            }
        });
        this._sites[dc] = response.data;
        return response.data;
    }

    saveSite(site) {
        axios.post(this.url, site);
        this.#clearCache(site);
    }

    #clearCache = (site) => {

        if(this._sites[site.dc] && this._sites[site.dc][site.domain]) {
            this._sites[site.dc][site.domain] = {};
        }
    }
}

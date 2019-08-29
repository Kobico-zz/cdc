import { EditConnection } from "./plugins/edit-connection.js";
import { AddConnection } from "./plugins/add-connection.js";
import {Query} from "./utils/location.utils.js";
import {ScriptLoader} from "./utils/script.utils.js";
import {SitesService} from "./services/sites.service.js";
export class GigyaPage {
    _query = new Query();
    _siteService = new SitesService();
    _dcSelector;
    _siteSelector;
    _plugins = {
        editConnections: new EditConnection(),
        addConnections: new AddConnection()
    };

    constructor() {
        this.init()
            .then(() => console.log('Site initialization completed successfully'));
    }

    async init() {
        this._dcSelector = document.getElementById('dc');
        this._siteSelector = document.getElementById('sites');
        const selectedDC = this._query.getValue('dc') || 'us1';

        this._dcSelector.selectedIndex = Array.from(this._dcSelector.options).map(o => o.value)
            .indexOf(selectedDC);
        await this.updateSites();
        this._dcSelector.addEventListener('change', async () => {
            await this.updateSites();
        });
        document.getElementById('openSite').addEventListener('click', () => {
            const domain = document.getElementById('domain').value;
            const apiKey = document.getElementById('apiKey').value;
            const dc = document.getElementById('dataCenter').value;
            const env = document.getElementById('env').value;
            const screenSetPrefix = document.getElementById('screenSetPrefix').value;
            const newPage = document.getElementById('newPage').checked;
            this._siteService.saveSite({
                domain, apiKey, dc, env, screenSetPrefix: screenSetPrefix
            });
            window.open(`http://${domain}:3232/?dc=${dc}&env=${env}&apiKey=${apiKey}`, newPage ? '_blank' : '_self');
        });

        document.getElementById('user').style.display = 'none';

        await this.loadGigyaJs();

        if(document.cookie.indexOf('glt_') !== -1) {
            gigya.accounts.getAccountInfo({callback: res => res.errorCode === 0 ? this.onLogin(res) : this.onLogout()});
        } else {
            this.showScreenSet( 'RegistrationLogin', 'login');
        }
        gigya.accounts.addEventHandlers({
            onLogin: e => this.onLogin(e), onLogout: () => this.onLogout()
        });
    }

    async updateSites() {
        if(!this._dcSelector.value) {
            return;
        }
        for(let i = this._siteSelector.options.length - 1 ; i >= 0 ; i--)
        {
            this._siteSelector.options[i].remove();
        }
        const sites = await this._siteService.getAllSites( this._dcSelector.value);
        Object.keys(sites).forEach(domain =>
        {
            const opt = document.createElement("option");
            opt.value = domain;
            opt.innerHTML = domain;

            // then append it to the select element
            this._siteSelector.appendChild(opt);
        });
        const ind = Object.keys(sites).indexOf(document.location.hostname);
        this._siteSelector.selectedIndex = ind > -1 ? ind : 0;
        this._siteSelector.addEventListener('change', () => {
            if(this._siteSelector.value && sites[this._siteSelector.value]) {
                this.updateSiteDetails(sites[this._siteSelector.value]);
            }
        });
        if(this._siteSelector.value && sites[this._siteSelector.value]) {
            this.updateSiteDetails(sites[this._siteSelector.value]);
        }
    }

    updateSiteDetails(site) {
        document.getElementById('domain').value = this._siteSelector.value;
        document.getElementById('dataCenter').value = site.dc;
        document.getElementById('env').value = site.env || 'prod';
        document.getElementById('apiKey').value = site.apiKey;
        document.getElementById('screenSetPrefix').value = site.screenSetPrefix || 'Default';
    }

    showScreenSet(screenSetName, screenName) {
        document.getElementById('screenSetContainer').innerHTML = '';
        const prefix = document.getElementById('screenSetPrefix').value;
        if(!screenSetName) {
            screenSetName = document.getElementById('screenSetName').value;
        }
        if(!screenName) {
            screenName = document.getElementById('screenName').value;
        }
        gigya.accounts.showScreenSet({
            lang: 'he',
            containerID: 'screenSetContainer',
            screenSet: prefix + '-' + screenSetName,
            startScreen: 'gigya-' + screenName + '-screen'
        });
    }

    showAddConnections() {
        this._plugins.addConnections.show();
    }

    showEditConnections() {
        this._plugins.editConnections.show();
    }

    SAMLLogin() {
        const idpName = document.getElementById('idp-name').value;
        const login_params =  ({
            'provider': 'saml-' + idpName,
            'callback': e => this.onLogin(e)
        });
        gigya.socialize.login(login_params);
    }

    logout() {
        gigya.accounts.logout();
    }

    onLogin(e) {
        document.getElementById('userWelcome').innerHTML = "Hello, " + e.profile.firstName + " " + e.profile.lastName;
        document.getElementById('user').style.display = '';
        this.showScreenSet('ProfileUpdate', 'update-profile')
    }
    onLogout() {
        document.getElementById('userWelcome').innerHTML = '';
        document.getElementById('user').style.display = 'none';
        this.showScreenSet('RegistrationLogin', 'login');
    }

    showToolbar() {
        document.getElementsByTagName('app-toolbar')[0].style.display = '';
    }

    hideToolbar() {
        document.getElementsByTagName('app-toolbar')[0].style.display = 'none';
    }

    get toolbarShown() {
        return document.getElementsByTagName('app-toolbar')[0].style.display !== 'none';
    }

    get apiKey() {
        return this._query.getValue('apiKey');
    }

    get dataCenter() {
        return this._query.getValue('dataCenter') || this._query.getValue('dc');
    }

    get env() {
        return this._query.getValue('env');
    }

    loadGigyaJs() {
        const apiKey = document.getElementById('apiKey').value;;
        let dc = document.getElementById('dataCenter').value;
        dc = dc === 'us1' ? '' : `.${dc}`;
        let env = document.getElementById('env').value;
        env = env && env !== 'prod' ? `-${env}` : '';
        if(env) {
            dc = dc || '.us1';
        }
        ScriptLoader.URL(`https://cdns${dc}${env}.gigya.com/js/gigya.js?apiKey=${apiKey}`);
        return new Promise(resolve => {
            window['onGigyaServiceReady'] = resolve;
        });
    }
}

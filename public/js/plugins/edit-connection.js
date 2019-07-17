import {GigyaPlugin} from "./plugin.js";

export class EditConnection extends GigyaPlugin {
    show() {
        gigya.socialize.showEditConnectionsUI({
            requiredCapabilities: 'login'
        });
    }
}

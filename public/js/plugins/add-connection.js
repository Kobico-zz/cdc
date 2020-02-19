import {GigyaPlugin} from "./plugin.js";

export class AddConnection extends GigyaPlugin {
    show() {
        super.show();
        gigya.socialize.showAddConnectionsUI({
            // enabledProviders: 'apple,facebook',
            requiredCapabilities: 'login',
            width: 300,
            version: '2'
        })
    }
}

import {GigyaPlugin} from "./plugin.js";

export class AddConnection extends GigyaPlugin {
    show() {
        super.show();
        gigya.socialize.showAddConnectionsUI({
            width: 300,
            version: '2'
        })
    }
}

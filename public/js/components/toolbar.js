import {CustomElement} from "../lib/custom-element.js";

export class ToolbarComponent extends CustomElement {
    constructor() {
        super();
        this.style.display = 'none';
    }

    get template() {
        return `<div class="row panel panel-primary">
            <div class="row panel panel-primary select-site">
                <div class="col-lg-2 col-md-2">
                    <select id="dc" class="form-control">
                        <option selected="selected">us1</option>
                        <option>il1</option>
                        <option>au1</option>
                        <option>eu1</option>
                        <option>cn1</option>
                        <option>ru1</option>
                    </select>
                </div>
                <div class="col-lg-4 col-md-4 col-lg-offset-1 col-md-offset-1">
                    <select id="sites" class="form-control"></select>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-2 col-md-2">
                    Domain: <input id="domain" class="form-control"/>
                </div>
                <div class="col-lg-1 col-md-1">
                    DC: <input id="dataCenter" class="form-control"/>
                </div>
                <div class="col-lg-1 col-md-1">
                    Env: <input id="env" class="form-control"/>
                </div>
                <div class="col-lg-5 col-md-5">
                    Api Key: <input id="apiKey" class="form-control"/>
                </div>
                <div class="col-lg-2 col-md-2">
                    Screen Set Prefix: <input id="screenSetPrefix" class="form-control"/>
                </div>
                <div class="col-lg-1 col-md-1">
                    <span><input type="checkbox" id="newPage"/> _blank</span> <button class="btn btn-primary" id="openSite">Open</button>
                </div>
            </div>
        </div>`;
    }
}

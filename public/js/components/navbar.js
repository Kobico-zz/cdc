import {CustomElement} from "../lib/custom-element.js";

export class NavBarComponent extends CustomElement {
    constructor() {
        super();
    }

    get template() {
        return `<div class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <span class="navbar-brand blue" onclick="page.toolbarShown ? page.hideToolbar() : page.showToolbar()" style="background-color:#4A89DC;color:#FFF">Demo Site</span>
                </div>
                <div id="user" class="navbar-text navbar-right">
                    <h4>
                        <span id="userWelcome"></span>
                        <button id="updateProfile" type="button" class="btn btn-default navbar-btn" onclick="page.showScreenSet('ProfileUpdate', 'update-profile')">My Profile</button>
                        <button id="logoutBtn" type="button" class="btn btn-danger navbar-btn" onclick="page.logout()">Logout</button>
                    </h4>
                </div>
            </div>
        </div>`;
    }
}

/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.clientaction";
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);

/** @odoo-module **/

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";

export const tshirtService = {
    dependencies: ["rpc"],
    async: ["loadstatistics"],
    start(env,{rpc}){
        return {
            loadStatistics: memoize(()=> rpc('/awesome_tshirt/statistics'))
        }
    },
}

registry.category("services").add("stats", tshirtService);
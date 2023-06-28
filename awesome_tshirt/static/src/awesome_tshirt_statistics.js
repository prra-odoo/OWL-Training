/** @odoo-module **/

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";

export const awesome_tshirt_statistics = {
    dependencies: ["rpc"],
    start(env,{rpc}){
        return {
            loadStatistics: memoize(() => rpc("/awesome_tshirt/statistics"))}
    },
};
registry.category("services").add("statistics",awesome_tshirt_statistics );
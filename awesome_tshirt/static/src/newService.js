/** @odoo-module */

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";

export const newService = {
    dependencies: ["rpc"],
    async: ["loadStatistics"],
    start(env, { rpc }) {
        return {
            loadStatistics: memoize(() => rpc("/awesome_tshirt/statistics")),
        };
    },
};

registry.category("services").add("newService", newService);
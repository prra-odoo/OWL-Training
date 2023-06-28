/** @odoo-module **/

import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";

export const demoservice = {
  dependencies: ["rpc"],
  async: ["loadStatistics"],
  start(env, { rpc }) {
    // document.write(rpc)
    return {
      loadStatistics: memoize(function () {
        return rpc("/awesome_tshirt/statistics");
      }),
    };
  },
};
registry.category("services").add("demoservice", demoservice);

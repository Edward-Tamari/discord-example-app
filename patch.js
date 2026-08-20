// bun-patch.js
import { plugin } from "bun";

plugin({
  name: "v8-polyfill-patch",
  setup(build) {
    // Intercept any attempt to load 'node:v8' or 'v8'
    build.onLoad({ filter: /^node:v8$/ }, () => {
      return {
        exports: {
          default: {
            startupSnapshot: {
              isBuildingSnapshot: () => false
            }
          },
          startupSnapshot: {
            isBuildingSnapshot: () => false
          }
        },
        loader: "object"
      };
    });
  }
});

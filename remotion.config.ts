/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setVideoImageFormat("jpeg");
// TSM announcement Section VII.d.ii.3 requires Rec709 or sRGB, and compliance
// check #5 verifies it. Remotion's default emits bt470bg (PAL) at full range,
// which fails. Setting it here rather than passing --color-space on the command
// line means every render is compliant, including `npm run build`.
Config.setColorSpace("bt709");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

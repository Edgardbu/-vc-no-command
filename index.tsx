import definePlugin from "@utils/types";
import { ApplicationCommandInputType, sendBotMessage } from "@api/Commands";
import { MessageActions } from "@webpack/common";
import { PluginNative } from "@utils/types";

export default definePlugin({
    name: "NoCommand",
    description: "Sends a good 'no' reason from an API",
    authors: [{ name: "SpaceX" }],

    commands: [
        {
            name: "no",
            description: "Say no with style",
            inputType: ApplicationCommandInputType.BUILT_IN,
            execute: async (_, ctx) => {
                const channelId = ctx.channel?.id;
                if (!channelId) return;

                const Native = VencordNative.pluginHelpers.NoCommand as PluginNative<typeof import("./native")>

                try {
                    const reason = await Native.fetchNoReason();
                    if (!reason) throw new Error("No reason returned");

                    MessageActions.sendMessage(channelId, {
                        content: reason,
                        tts: false
                    });
                } catch (err) {
                    console.error("[NoCommand] Failed to fetch reason:", err);
                    sendBotMessage(channelId, {
                        content: "⚠️ Could not fetch a 'no' reason."
                    });
                }
            }
        }
    ]
});

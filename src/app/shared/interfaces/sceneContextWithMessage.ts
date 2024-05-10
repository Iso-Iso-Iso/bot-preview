import { SceneContext } from "telegraf/scenes";

export interface SceneContextWithMessage extends SceneContext {
    update: SceneContext["update"] & {
        message: {
            text: string;
        };
    };
}

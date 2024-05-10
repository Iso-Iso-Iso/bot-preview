import { SceneContext } from "telegraf/scenes";

export interface SceneContextWithSessionState<T> extends SceneContext {
    scene: SceneContext["scene"] & {
        session: {
            state: T;
        };
    };
}

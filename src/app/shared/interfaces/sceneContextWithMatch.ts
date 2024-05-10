import { SceneContext } from "telegraf/scenes";

export interface SceneContextWithMatch<T> extends SceneContext {
    match: [T];
}

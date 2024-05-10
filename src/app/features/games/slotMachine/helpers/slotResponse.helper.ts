import { Slots } from "../enums/slots.enum";
import { random as _random } from "lodash";

export class SlotResponseHelper {
    static getRandomFromSlots(slots: Slots[]) {
        return slots[_random(0, slots.length - 1)];
    }

    static isUserGainTransition(combination) {
        const rand = _random(0, 100);

        return combination.gainPercentage >= rand;
    }
}

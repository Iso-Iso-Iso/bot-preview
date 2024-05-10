import { SlotVariants } from "../enums/slotVariants.enum";
import { Slots } from "../enums/slots.enum";
import { SlotResponseHelper } from "../helpers/slotResponse.helper";

export const SLOT_COMBINATIONS = {
    // WIN
    [SlotVariants.AXE]: () => [Slots.SEVEN, Slots.SEVEN, Slots.SEVEN, Slots.SEVEN, Slots.SEVEN],
    [SlotVariants.GOLD]: () => [Slots.DOLLAR, Slots.DOLLAR, Slots.DOLLAR, Slots.DOLLAR, Slots.DOLLAR],
    [SlotVariants.CHERRY]: () => [Slots.CHERRY, Slots.CHERRY, Slots.CHERRY, Slots.CHERRY, Slots.CHERRY],
    [SlotVariants.FRUITS]: () => [Slots.CHERRY, Slots.WATERMELON, Slots.GRAPE, Slots.PLUM, Slots.ORANGE],
    [SlotVariants.SLOT_WIN]: () => [Slots.SLOT, Slots.SLOT, Slots.SLOT, Slots.SLOT, Slots.SLOT],

    // CLOSE WIN
    [SlotVariants.CLOSE_AXE]: () => {
        const random = SlotResponseHelper.getRandomFromSlots([
            Slots.WATERMELON,
            Slots.SLOT,
            Slots.BAR,
            Slots.DICE,
            Slots.GRAPE,
            Slots.DOLLAR,
            Slots.ORANGE,
            Slots.CARDS,
        ]);
        return [Slots.SEVEN, Slots.SEVEN, Slots.SEVEN, Slots.SEVEN, random];
    },

    [SlotVariants.CLOSE_GOLD]: () => {
        const random1 = SlotResponseHelper.getRandomFromSlots([
            Slots.SLOT_MACHINE,
            Slots.DOLLAR,
            Slots.DOLLAR,
            Slots.DOLLAR,
            Slots.BAR,
            Slots.WATERMELON,
        ]);

        const random2 = SlotResponseHelper.getRandomFromSlots([
            Slots.CLOVER,
            Slots.EMERALD,
            Slots.PLUM,
            Slots.QUESTION,
        ]);

        return [random1, random2, Slots.DOLLAR, Slots.DOLLAR, Slots.DOLLAR];
    },

    [SlotVariants.CLOSE_CHERRY]: () => {
        const random = SlotResponseHelper.getRandomFromSlots([
            Slots.SLOT_MACHINE,
            Slots.DICE,
            Slots.CARDS,
            Slots.BAR,
            Slots.SLOT,
            Slots.HORSESHOE,
            Slots.PLUM,
            Slots.QUESTION,
        ]);

        return [random, Slots.CHERRY, Slots.CHERRY, Slots.CHERRY, Slots.CHERRY];
    },

    [SlotVariants.CLOSE_FRUITS]: () => {
        const rand1 = SlotResponseHelper.getRandomFromSlots([
            Slots.SLOT_MACHINE,
            Slots.DICE,
            Slots.CARDS,
            Slots.BAR,
            Slots.SLOT,
            Slots.HORSESHOE,
            Slots.PLUM,
            Slots.QUESTION,
        ]);

        const rand2 = SlotResponseHelper.getRandomFromSlots([Slots.GRAPE, Slots.GRAPE, Slots.BAR, Slots.QUESTION]);

        return [Slots.CHERRY, rand1, rand2, Slots.PLUM, Slots.ORANGE];
    },

    [SlotVariants.CLOSE_SLOT_WIN]: () => {
        const rand = SlotResponseHelper.getRandomFromSlots([
            Slots.SLOT_MACHINE,
            Slots.BAR,
            Slots.HORSESHOE,
            Slots.QUESTION,
            Slots.CHERRY,
            Slots.CLOVER,
            Slots.DOLLAR,
            Slots.EMERALD,
            Slots.ORANGE,
        ]);

        return [Slots.SLOT, Slots.SLOT, Slots.SLOT, rand, Slots.SLOT];
    },

    [SlotVariants.LOSE]: () => {
        return [
            SlotResponseHelper.getRandomFromSlots([
                Slots.SLOT_MACHINE,
                Slots.BAR,
                Slots.HORSESHOE,
                Slots.QUESTION,
                Slots.CHERRY,
                Slots.CLOVER,
                Slots.DOLLAR,
                Slots.EMERALD,
                Slots.ORANGE,
            ]),
            SlotResponseHelper.getRandomFromSlots([
                Slots.SLOT_MACHINE,
                Slots.CLOVER,
                Slots.SLOT,
                Slots.CARDS,
                Slots.BAR,
                Slots.WATERMELON,
            ]),
            SlotResponseHelper.getRandomFromSlots([
                Slots.WATERMELON,
                Slots.SLOT,
                Slots.BAR,
                Slots.DICE,
                Slots.GRAPE,
                Slots.DOLLAR,
                Slots.ORANGE,
                Slots.CARDS,
            ]),
            SlotResponseHelper.getRandomFromSlots([
                Slots.SLOT_MACHINE,
                Slots.BAR,
                Slots.CARDS,
                Slots.SLOT,
                Slots.SLOT_MACHINE,
                Slots.CLOVER,
                Slots.DOLLAR,
                Slots.EMERALD,
                Slots.ORANGE,
            ]),
            SlotResponseHelper.getRandomFromSlots([
                Slots.SLOT_MACHINE,
                Slots.BAR,
                Slots.HORSESHOE,
                Slots.QUESTION,
                Slots.CHERRY,
                Slots.CLOVER,
                Slots.DOLLAR,
                Slots.EMERALD,
                Slots.SEVEN,
            ]),
        ];
    },
};

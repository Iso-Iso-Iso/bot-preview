import { SlotVariants } from "../enums/slotVariants.enum";

type Transition = {
    variant: SlotVariants;
    gainPercentage: number;
};

type SlotTransitions = {
    [key: string]: Transition[];
};

export const SLOT_TRANSITIONS: SlotTransitions = {
    [SlotVariants.AXE]: [
        {
            variant: SlotVariants.GOLD,
            gainPercentage: 10,
        },
        {
            variant: SlotVariants.CHERRY,
            gainPercentage: 10,
        },
        {
            variant: SlotVariants.CLOSE_FRUITS,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_AXE,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.GOLD]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.CHERRY]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.FRUITS]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.SLOT_WIN]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    // CLOSE TO WIN
    [SlotVariants.CLOSE_AXE]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.CLOSE_GOLD]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.CLOSE_CHERRY]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.CLOSE_FRUITS]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
    [SlotVariants.CLOSE_SLOT_WIN]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],

    // LOSE
    [SlotVariants.LOSE]: [
        {
            variant: SlotVariants.CLOSE_CHERRY,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.CLOSE_SLOT_WIN,
            gainPercentage: 30,
        },
        {
            variant: SlotVariants.LOSE,
            gainPercentage: 100,
        },
    ],
};

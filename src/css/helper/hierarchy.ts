const hierarchy = ["body", "overlay", "header", "playing", "popover"] as const;

type Hierarchy = typeof hierarchy[number];

export const zIndex = hierarchy.reduce((acc, current, index) => {
    acc[current] = index + 3;
    return acc;
}, {} as Record<Hierarchy, number>);

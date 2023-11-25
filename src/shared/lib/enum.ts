function createEnum<T extends string>(
    array: readonly T[],
): { [key in T]: key } {
    return array.reduce(
        (acc, key) => {
            acc[key] = key;
            return acc;
        },
        {} as { [key in T]: key },
    );
}

export { createEnum };

const find = (linkedList) => {
    return Math.max.apply(0, Object.entries(list).map(([key]) =>  linkedList[key]["age"]));
};


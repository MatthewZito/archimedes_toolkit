const convertQueryToMap = query => {
    if (query == null || typeof query === "undefined" || query === "") {
        return {};
    }
    return query.split('&').reduce((acc, param) => {
        const [key, value] = param.split('=');
        const branch = key.split('.');
        const nest = branch.splice(branch.length - 1, 1)[0];
        const collated = branch.reduce((tree, node) => {
             if (!tree[node]) { tree[node] = {}; }
            return tree[node];
        }, acc);
        collated[nest] = decodeURIComponent(value);
        return acc;
    }, {});
};
  
  
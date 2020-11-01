class UriBuilder {
    constructor(uri) {
        this.root = uri;
        this.url = this.root.split("?");
        this.params = {};
        UriBuilder.populate.apply(this);
    };
    
    static populate() {
        if (!this.url.length < 2) {
            return this.url[1]
                .split("&")
                .map(i => i.split("="))
                .forEach(([key, value]) => this.params[key] = value);
        }
    };
  
    build() {
        const params = Object.entries(this.params);
            if (!params.length) {
                return this.root;
            }
        const x = [];
        params.forEach(([key, value], index) => {
            if (value) { 
                x.push(`${index > 0 ? "&" : ""}${key}=${String(value).split(" ").join("%20")}`);
            }
        });
        return `${this.url[0]}?${x.join("")}`;
    }
};

/* 
    Prompt 

    "Create a basic UriBuilder object that will be used specifically to build query params on an existing URI. 
    It should support a params property and a build method. It will handle the URL having pre-existing params that need to be managed. 
    The URL must be properly encoded (i.e. "a b" should be encoded as "a%20b")"

    Bonus: Cannot use *any* of the built-in `uri` methods.

*/
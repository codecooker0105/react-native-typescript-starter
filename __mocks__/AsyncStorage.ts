export class AsyncStorageMock {
    private items = {};
    setItem = jest.fn(async (item, value) => {
        this.items[item] = value;
    });

    getItem = jest.fn(async (item) => {
        return this.items[item];
    });

    removeItem = jest.fn(async (key) => {
        if (this.items.hasOwnProperty(key)) {
            delete this.items[key];
        }
    });

    __clearAll() {
        this.items = {};
    }
}
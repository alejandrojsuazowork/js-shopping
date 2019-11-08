import ItemModel from "../item/item.model";


let items = [
    new ItemModel('OtherThing', 11),
    new ItemModel('FinalThing', 1200, true)
];

let item = new ItemModel('SingularThing', 123);

function getPromise(data) {
    return new Promise((resolve, reject) => resolve(data));
}

export default {
    getPromise,
    getItems: jest.fn(() => {
        return getPromise(items);
    }),
    getItemById: jest.fn((id) => {
        item.id=id;
        return getPromise(item);
    }),
    addItem: jest.fn((item) => {
        return getPromise("200 OK");
    }),
    deleteItemById: jest.fn((id) => {
        return getPromise("200 OK");
    })
}
import ItemModel from "../item/item.model";

// export const getItems = () => {
//     return new Promise((resolve) => {
//         resolve([
//             new ItemModel('OtherThing', 11),
//             new ItemModel('FinalThing', 1200, true)
//         ]);
//     });
// };


let items = [
    new ItemModel('OtherThing', 11),
    new ItemModel('FinalThing', 1200, true)
];

let item = new ItemModel('SingularThing', 123);

function getPromise(data) {
    return new Promise((resolve, reject) => resolve(data));
}

// export const getItemById = (id) => {
//     return new Promise((resolve) => {
//
//         resolve(
//             new ItemModel('OneThing', 12000, true, id)
//         );
//     });
// }

// export const deleteItem = () => {
//     return new Promise((resolve, ))
// }

export default {
    getPromise,
    getItems: jest.fn(() => {
        return getPromise(items);
    }),
    getItemById: jest.fn((id) => {
        item.id=id;
        return getPromise(item);
    }),
    deleteItemById: jest.fn((id) => {
        return getPromise("200 OK");
    })
}
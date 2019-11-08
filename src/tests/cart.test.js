import React from 'react';
import { shallow } from 'enzyme';
import Cart from "../cart/cart";
import ItemModel from '../item/item.model';
// import {getItems} from "../api";
import api from '../api';

describe('<Cart> test suite', () => {

    describe('Initialization tests', () => {
        it('should not fail my tests', () => {
            expect(true).toBe(true);
        });

        it('cart should be empty when first created', done => {
            api.getItems.mockReturnValueOnce(Promise.resolve([]));
            const shallowCart = shallow(<Cart />);

            setImmediate(() => {
                expect(shallowCart.state().items).not.toBe(null);
                expect(shallowCart.state().items.length).toBe(0);
                done();
            });
        });

    });

    describe('Mocking Tests', () => {

        let shallowCart = null;

        beforeEach(() => {
            shallowCart = shallow(<Cart />);
        });

        afterEach(() => {
            shallowCart = null;
        });

        it('should not fail my tests', () => {
            expect(true).toBe(true);
        });

        it('cart should have one more item when user adds an item', done => {
            expect(shallowCart.state().items).not.toBe(null);
            expect(shallowCart.state().items.length).toBe(2);

            let allItems = [
                new ItemModel('First', 50),
                new ItemModel('Second', 100),
                new ItemModel('Third', 200)
            ];
            api.getItems.mockReturnValueOnce(Promise.resolve(allItems));

            setImmediate(() => {
                shallowCart.instance().addSpecificItem(allItems[2]);

                setImmediate(() => {
                    expect(shallowCart.state().items).not.toBe(null);
                    expect(shallowCart.state().items.length).toBe(3);
                    done();
                });
            });
        });

        it('cart should be able to request item by id', done => {
            let fetchedItem = shallowCart.instance().getSpecificItem(shallowCart.state().items[0].id);

            setImmediate(() => {
                expect(fetchedItem.id).toBe(shallowCart.state().items[0].id);
                expect(fetchedItem.name).toBe(shallowCart.state().items[0].name);

                done();
            });
        });

        it('cart should be able to delete an item by id', done => {
            setImmediate(() => {
                expect(shallowCart.state().items).not.toBe(null);
                expect(shallowCart.state().items.length).toBe(2);

                api.getItems.mockReturnValueOnce(Promise.resolve([shallowCart.state().items[1]]));

                let idForTest = shallowCart.state().items[0].id;
                shallowCart.instance().deleteSpecificItem(idForTest);

                setImmediate(() => {
                    expect(shallowCart.state().items).not.toBe(null);
                    expect(shallowCart.state().items.length).toBe(1);
                    expect(shallowCart.state().items[0]).not.toBe(idForTest);
                    done();
                });
            });
        });
    });

    // describe('CRUD tests', () => {
    //
    //     let shallowCart = null;
    //
    //     beforeEach(() => {
    //         shallowCart = shallow(<Cart useApi={false} />);
    //     });
    //
    //     afterEach(() => {
    //         shallowCart = null;
    //     });
    //
    //     it('should accurately setup for tests', done => {
    //         setImmediate(() => {
    //             expect(shallowCart).not.toBe(null);
    //             expect(shallowCart.state().items).not.toBe(null);
    //             expect(shallowCart.state().items.length).toBe(0);
    //             done();
    //         });
    //     });
    //
    //     it('should create', done => {
    //         const item = new ItemModel('myName', 20, true);
    //         shallowCart.instance().addItem(item);
    //
    //         setImmediate(() => {
    //             expect(shallowCart.state().items.length).toBe(1);
    //             done();
    //         });
    //     });
    //
    //     it('should read', done => {
    //         const item = new ItemModel('myName', 20, true);
    //         shallowCart.instance().addItem(item);
    //
    //         setImmediate(() => {
    //             expect(shallowCart.state().items.length).toBe(1);
    //             const firstItem = shallowCart.state().items[0];
    //             expect(firstItem).not.toBe(null);
    //             expect(firstItem.id).not.toBe(undefined);
    //             expect(firstItem.name).toBe('myName');
    //             expect(firstItem.price).toBe(20);
    //             expect(firstItem.onSale).toBe(true);
    //             done();
    //         });
    //     });
    //
    //     it('should update', done => {
    //         shallowCart.instance().addItem(new ItemModel('item1', 10, true));
    //         shallowCart.instance().addItem(new ItemModel('item2', 20, true));
    //
    //         let firstItem = shallowCart.state().items[0];
    //
    //         setImmediate(() => {
    //             expect(firstItem.name).toBe('item1');
    //             firstItem.name = 'new item';
    //
    //             shallowCart.instance().updateItem(firstItem);
    //
    //             setImmediate(() => {
    //                 expect(shallowCart.state().items.length).toBe(2);
    //                 expect(shallowCart.state().items[0].name).toBe('new item');
    //                 done();
    //             });
    //
    //         });
    //     });
    //
    //     it('should delete', done => {
    //         shallowCart.instance().addItem(new ItemModel('item1', 10, true));
    //         shallowCart.instance().addItem(new ItemModel('item2', 20, true));
    //
    //         setImmediate(() => {
    //
    //             expect(shallowCart.state().items.length).toBe(2);
    //
    //             shallowCart.instance().deleteItem(shallowCart.state().items[0]);
    //
    //             setImmediate(() => {
    //                 expect(shallowCart.state().items.length).toBe(1);
    //                 done();
    //             });
    //         });
    //     });
    // });
});
const url='http://localhost:8080';

const defaultAndThen = resp => resp.json();
const defaultOops = error => console.log(`error! ${error}`);

const baseHandler = (hldrUrl) => {
    return new Promise((resolve => {
        let r = new XMLHttpRequest();
        r.open("GET", hldrUrl, true);
        r.setRequestHeader("Content-Type", "application/json");
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                resolve(JSON.parse(r.response));
            }
        };
        r.send();
    }));
};

const deleteHandler = (hldrUrl) => {
    return new Promise((resolve => {
        let r = new XMLHttpRequest();
        r.open("DELETE", hldrUrl, true);
        r.setRequestHeader("Content-Type", "application/json");
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                resolve(r.response);
            }
        };
        r.send();
    }));
};

export default {
    getItems() { return baseHandler(`${url}/getItems`) },
    getItemById: id => baseHandler(`${url}/items/{id}`),
    deleteItemById: id => deleteHandler(`${url}/deleteItem/${id}`)
}


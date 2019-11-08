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

const putHandler = (hldrUrl, item) => {
    return new Promise((resolve => {
        let r = new XMLHttpRequest();
        r.open("PUT", hldrUrl, true);
        r.setRequestHeader("Content-Type", "application/json");
        r.onreadystatechange = function () {
            if (r.readyState == 4 && r.status == 200) {
                resolve(r.response);
            }
        };
        var myJSON = JSON.stringify(item);
        r.send(myJSON);
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
    addItem(item) { return putHandler(`${url}/putItem`, item) },
    deleteItemById: id => deleteHandler(`${url}/deleteItem/${id}`)
}


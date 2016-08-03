function Controller(model, view) {
    this._model = model;
    this._view = view;

    //combine model and view via events

    var firstLoadEventHand = function () {
        this._view.buildContent(this.getModelData());
    }
    this._model.onFirstLoad.addListener(firstLoadEventHand.bind(this));

    var tableClickEventHand = function (mySender, myArgs) {
        var hshCode = myArgs.stringForHash.hashCode();
        var personFromModel = this._model.getPerson(hshCode); //Hash sended to Model!!!
        this._view.displayPerson(personFromModel);
    }
    this._view.onTableClick.addListener(tableClickEventHand.bind(this));

    var createBtnEventHand = function (mySender, myArgs) {
        var tempArr = [];
        tempArr.push(myArgs);
        var persons = this.createPersons(tempArr);              //Add IF's HERE to check on undefined fields!!!!
        this._model.addPerson(persons[0]);
        this._view.displayPersonInTable(persons[0]);
    }
    this._view.onCreateButtonClick.addListener(createBtnEventHand.bind(this));

    var updateBtnEventHand = function (mySender, myArgs) {

        var personToChange = this._model.getPerson(myArgs.stringForHash.hashCode());
        var tempArr = [];
        tempArr.push(myArgs);
        var persons = this.createPersons(tempArr);              //Add IF's HERE to check on undefined fields!!!!
        if (persons[0].getHashCode() !== personToChange.getHashCode()) {
            this._model.updatePerson(personToChange, persons[0]);
            this._view.updateTableRow(persons[0]);
        }
    }
    this._view.onUpdateButtonClick.addListener(updateBtnEventHand.bind(this));

    var deleteBtnEventHand = function (mySender, myArgs) {
        var hshString = myArgs.stringForHash.hashCode();
        var result = this._model.removePerson(hshString);
        if (result) {
            console.log('Person removed');
        }
        else {
            console.log('Cannot remove person');
        }
    }
    this._view.onDeleteButtonClick.addListener(deleteBtnEventHand.bind(this));

}
Controller.prototype = {
    createPersons: function (arrayOfGSON) {
        var arrOfPersons = [];
        for (var i = 0; i < arrayOfGSON.length; i++) {
            var person = new Person();
            
            var nameArr = arrayOfGSON[i].name.split(' ');
            var result = nameArr[0].split('', 1) + nameArr[1].split('', 5).join('');
            person.ID = result.toLowerCase();
            person.name = arrayOfGSON[i].name;
            person.company = arrayOfGSON[i].company;
            person.generateHash();
            arrOfPersons.push(person);
            //arrayOfGSON[i].ID = result.toLowerCase();
        }
        return arrOfPersons;
    },
    addItems: function () {
        var url = 'http://beta.json-generator.com/api/json/get/V1DIqsgOZ';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        var self = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                self._model.firstLoad(self.createPersons(JSON.parse(xhr.responseText)));
            }
        }
        xhr.send();
    },
    getModelData: function () {
        return this._model.getItems();
    },
}
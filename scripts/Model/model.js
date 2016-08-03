function Model() {
    this._items = null;
    //this._selectedIndex = -1;

    this.onFirstLoad = new Event(this);
    //this.onTableClick = new Event(this);
}

Model.prototype = {

    getItems: function () {
        if (this._items !== null) {
            return this._items;
        }
    },

    firstLoad: function (jsonItems) {
        this._items = jsonItems;
        this.onFirstLoad.notifyListeners({ jsonItems: jsonItems });  //what is this?
    },

    getPerson: function (hash) {
        var lngs = this._items.length;
        for (var i = 0; i < lngs; i++) {
            if (this._items[i].getHashCode() === hash) {
                return this._items[i];
            }
        }
        return console.log('Hash not found. Cannot Find Person');
        //this.onTableClick.notifyListeners({ modelObject: this._items[index] })
    },
    addPerson: function (person) {
        this._items.push(person);
    },
    updatePerson: function (personInitial, dataToChangePerson) {
        personInitial.ID = dataToChangePerson.ID;
        personInitial.name = dataToChangePerson.name;
        personInitial.company = dataToChangePerson.company;
        personInitial.hash = dataToChangePerson.hash;
    },
    removePerson: function (hash) {
        var lngth = this._items.length;
        for (var i = 0; i < lngth; i++) {
            if (this._items[i].getHashCode() === hash) {
                this._items.splice(i, 1);
                return true;
            }
            else {
                continue;
            }
        }
        return false;
    }
}
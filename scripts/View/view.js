function View(elements) {
    this._elements = elements;
    this.ELEMENTSOFHEADER = ["Login", "Name", "Department"];
    this.selectedPerson = null;
    this.selectedPersonInTable = null;
    this.onTableClick = new Event(this);
    this.onCreateButtonClick = new Event(this);
    this.onUpdateButtonClick = new Event(this);
    this.onDeleteButtonClick = new Event(this);
    _this = this;

    //combine listeners to html controls -----------------  DO NOT DELETE
    //$('#data').delegate('tr', 'click', this.tableClick.bind(this))
    //$('btnDelete').delegate('tr', 'click', this.deleteButtonClick.bind(this));

    (this._elements.create).click(function (e) {
        _this.createButtonClick(e);
    });
    (this._elements.update).click(function (e) {
        _this.updateButtonClick(e);
    });
    (this._elements.delete).click(function (e) {
        _this.deleteButtonClick(e);

    });
}
View.prototype = {
    buildContent: function (response) {
        var tbl;
        tbl = this._elements.tbl;
        if (response.length && response.length > 0) {
            var table = tbl;
            var fragment = document.createDocumentFragment();
            var dataSize = response.length;

            var keysFromJSON = Object.keys(response[0]);
            var lengthOfKeysArray = keysFromJSON.length;
            var tBody = document.createElement('tbody');
            var tHead = document.createElement('thead');
            tHead.className = 'thead';
            for (var i = 0; i < this.ELEMENTSOFHEADER.length; i++) {
                var tdFortHead = document.createElement('td');
                var divFortHead = document.createElement('div');
                divFortHead.innerText = this.ELEMENTSOFHEADER[i];
                tdFortHead.appendChild(divFortHead);
                tHead.appendChild(tdFortHead);
            }
            fragment.appendChild(tHead);
            for (var i = 0; i < dataSize; i++) {
                var tr = document.createElement('tr');
                var tdArr = [document.createElement('td'), document.createElement('td'), document.createElement('td'), document.createElement('td')];

                tdArr[0].innerText = response[i].ID;
                tdArr[1].innerText = response[i].name;
                tdArr[2].innerText = response[i].company;

                tr.appendChild(tdArr[0]);
                tr.appendChild(tdArr[1]);
                tr.appendChild(tdArr[2]);
                tBody.appendChild(tr);
            }
            fragment.appendChild(tBody);
            table.appendChild(fragment);
            $('#data').delegate('tr', 'click', this.tableClick.bind(this));

        }
    },
    displayPersonInTable: function (person) {
        $('#data tr:last').after('<tr>' + '<td>' + person.ID + '</td>' + '<td>' + person.name + '</td>' + '<td>' + person.company + '</td>' + '</tr>')
    },
    displayPerson: function (person) {
        $('#fullName').val(person.name);
        $('#department').val(person.company);
    },

    tableClick: function (event) {
        var strintgOfTableRow = $(event.target).closest('tr').text();
        this.selectedPersonInTable = event;                         //save selected in table element to future work
        this.selectedPerson = strintgOfTableRow;
        this.onTableClick.notifyListeners({ stringForHash: strintgOfTableRow });
    },
    createButtonClick: function (event) {
        var _name = $('#fullName').val();
        var _company = $('#department').val();
        this.onCreateButtonClick.notifyListeners({
            name: _name,
            company: _company,
        })
        $('#fullName').val('');
        $('#department').val('');
    },
    updateButtonClick: function (event) {
        var _name = $('#fullName').val();
        var _company = $('#department').val();
        if (this.selectedPerson != null) {
            var tempVar = $(this.selectedPersonInTable.target).closest('tr').text();
            this.onUpdateButtonClick.notifyListeners({
                stringForHash: tempVar,
                name: _name,
                company: _company,
            });
        }
    },
    deleteButtonClick: function (event) {
        var tempVar = $(this.selectedPersonInTable.target).closest('tr').text();
        if (this.selectedPerson != null) {
            this.onDeleteButtonClick.notifyListeners({ stringForHash: tempVar });
            $(this.selectedPersonInTable.target).closest('tr').remove();                                       //govnokod, nuzhno razobratsa kak sdelat' luchshe
        }
        else {
            console.log('select table row');
        }
        this.selectedPerson = null;
    },
    updateTableRow: function (person) {
        var a = $(this.selectedPersonInTable.target).closest('tr').children('td');
        a[0].innerText = person.ID;
        a[1].innerText = person.name;
        a[2].innerText = person.company;
    }

}



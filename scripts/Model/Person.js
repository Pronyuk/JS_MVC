function Person(_id, _name, _department) {
    this.ID = _id;
    this.name = _name;
    this.company = _department;
    this.hash = null;
}
Person.prototype = {
    generateHash: function () {
        var comparedDataOfPerson = this.ID + this.name + this.company;
        this.hash = comparedDataOfPerson.hashCode();
    },
    getHashCode: function () {
        return this.hash;
    }
}


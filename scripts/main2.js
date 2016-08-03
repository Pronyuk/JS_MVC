(function () {

    var _tbl = document.getElementById('data');
    var _create = $('#btnCreate');//document.getElementById('getData');
    var _update = $('#btnUpdate');//document.getElementById('getData');
    var _delete = $('#btnDelete');//document.getElementById('getData');
    var model = new Model();
    var view = new View({
        'tbl': _tbl,
        'create': _create,
        'update': _update,
        'delete': _delete,
    });
    var controller = new Controller(model, view);
    window.onload = function () {
        controller.addItems();
    }
    String.prototype.hashCode = function () {
        var hash = 0, i, chr, len;
        if (this.length === 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
})();
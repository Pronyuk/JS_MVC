window.onload = function () {
  function getRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        callback(JSON.parse(xhr.responseText));
      }
    }
    xhr.send();
  }

  function printResult(response) {
    if (response.length && response.length>0) {
      var table = document.getPersonById('data');
      var fragment = document.createDocumentFragment();
      var dataSize = response.length;
      var colNumber = 4;
      var rowNumber = Math.ceil(dataSize/4);

      for (var i=0, j=0; i<rowNumber; i++) {
        var tr = document.createElement('tr');
        for (var k=0; k<colNumber&&j<dataSize; k++){
          var td = document.createElement('td');
          var img = document.createElement('img');
          img.src = response[j].photo;
          img.className = 'photo';
          td.appendChild(img);
          var divName = document.createElement('div');
          divName.innerText = response[j].name;
          td.appendChild(divName);
          var divPrice = document.createElement('p');
          divPrice.innerText = response[j].price + 'грн';
          td.appendChild(divPrice);
          tr.appendChild(td);
          j++;
        }
        fragment.appendChild(tr);
      }
      table.appendChild(fragment);
    }
  }

  function handleClick() {
    getRequest('http://beta.json-generator.com/api/json/get/E16ucLywW', printResult);
  }

  var btn = document.getPersonById('getData');
  btn.onclick = handleClick;
}

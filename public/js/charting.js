(function() {
  'use strict';
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  //var socket = io.connect('http://localhost:8080');
  function drawChart() {
    var options = {
      title: 'Voltage Level',
      curveType: 'function',
      legend: { position: 'bottom' },
      pointSize: 3
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    var dataArray = [['Time', 'Voltage level (V)'], [new Date(), 0]];
    var data = google.visualization.arrayToDataTable(
      dataArray
    );
    chart.draw(data, options);

    socket.on('mqtt', function (mqtt_data) {
      dataArray.push([new Date(), mqtt_data.message]);
      data = google.visualization.arrayToDataTable(
        dataArray
      );
      chart.draw(data, options);
    });
  }
})();

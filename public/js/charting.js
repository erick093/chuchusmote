
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart1);
  google.charts.setOnLoadCallback(drawChart2);
  //var socket = io.connect('http://localhost:8080');
  function drawChart1() {
    var options = {
      title: 'Voltage Level',
      curveType: 'function',
      legend: { position: 'bottom' },
      pointSize: 3
    };

    var chart = new google.visualization.LineChart(document.getElementById('V1_chart'));
    var dataArray = [['Time', 'Voltage level (V)'], [new Date(), 0]];
    var data = google.visualization.arrayToDataTable(
      dataArray
    );
    chart.draw(data, options);

    socket.on('panel1/voltage', function (mqtt_data1) {
      dataArray.push([new Date(), mqtt_data1.message]);
      data = google.visualization.arrayToDataTable(
        dataArray
      );
      chart.draw(data, options);
    });
  }

  function drawChart2() {
    var options = {
      title: 'Amp Level',
      curveType: 'function',
      legend: { position: 'bottom' },
      pointSize: 3
    };

    var chart = new google.visualization.LineChart(document.getElementById('A1_chart'));
    var dataArray = [['Time', 'Amp level (A)'], [new Date(), 0]];
    var data = google.visualization.arrayToDataTable(
      dataArray
    );
    chart.draw(data, options);

    socket.on('panel1/amp', function (mqtt_data2) {
      dataArray.push([new Date(), mqtt_data2.message]);
      data = google.visualization.arrayToDataTable(
        dataArray
      );
      chart.draw(data, options);
    });
  }

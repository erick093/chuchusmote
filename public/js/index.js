var socket = io();
socket.on('connect', () =>{
  console.log('Connected to server');
});
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

// socket.on('panel1/voltage', (mqtt_data1)  =>{
//
//   console.log(mqtt_data1.topic);
//   console.log(mqtt_data1.message );
// });

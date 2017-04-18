var socket = io();
socket.on('connect', () =>{
  console.log('Connected to server');
});
socket.on('disconnect', () =>{
  console.log('Disconnected from server');
});

socket.on('mqtt', (mqtt_data)  =>{

  console.log(mqtt_data.topic);
  console.log(mqtt_data.message );
});

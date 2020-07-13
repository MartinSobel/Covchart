$.ajax({
  url: 'https://api.thevirustracker.com/free-api?countryTimeline=US',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});

$(function() {
    $(".draggable").draggable();
});

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    options: {}
});
const apiUrl = 'https://api.covid19api.com/dayone/country/south-africa';
async function getData(){
  const response = await fetch(apiUrl);
  const data = await response.json();
  const arr = data.reduce((acc, cur) => cur.Confirmed ? [...acc, cur.Confirmed] : acc, []);
  return arr;
}

var res = [];
getData().then( val => {
  res.push(val);
})  

console.log(res);


// reemplazar val por los valores del array de la api
const val = [0, 10, 5, 2, 20, 30, 45];
console.log(val);
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: ['', '', '', '', '', '', ''],
      datasets: [{
          label: '',
          backgroundColor: 'rgb(255, 255, 255)',
          borderColor: 'rgb(0, 0, 0)',
          data: val
      }]
  },
  options: {
    elements: {
      point:{
          radius: 0
      }
    },
    scales: {
      xAxes: [{
        gridLines: {
            display:false
        }
      }],
      yAxes: [{
          ticks: {
              display: false
          },
          gridLines: {
            display:false
        }   
      }]
    },
    legend: {
      display: false
    },
    tooltips: {
        callbacks: {
          label: function(tooltipItem) {
                  return tooltipItem.yLabel;
          }
        }
    }
  }
});

chart.canvas.parentNode.style.width = '500px';
chart.canvas.parentNode.style.height = '300px';

//jQuery
$(function() {
  $(".draggable").draggable();
});
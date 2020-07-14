const frequentCountrys = ["argentina", "italy", "spain"];

drawCurve("argentina");

function drawCurve(inputCountry){
  const country = inputCountry;
  const values = [];
  const newLabels = [];

  chartIt();

  async function getData(){

    const apiUrl = 'https://api.covid19api.com/dayone/country/' + country;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const arr = data.reduce((acc, cur) => cur.Confirmed ? [...acc, cur.Confirmed] : acc, []);

    for (let i = 1 ; i < arr.length ; i++){
        values.push(arr[i] - arr[i-1]);
    }

    for (let i = 0 ; i < values.length ; i++){
      newLabels.push('');
    }
  }

  async function chartIt(){
    await getData();
    const  ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: newLabels,
          datasets: [{
              label: '',
              fill: false,
              borderColor: 'rgb(0, 0, 0)',
              data: values
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
                display:false,
                drawBorder: false
            }
          }],
          yAxes: [{
              ticks: {
                  display: false
              },
              gridLines: {
                display:false,
                drawBorder: false
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
    chart.canvas.parentNode.style.width = '200px';
    chart.canvas.parentNode.style.height = '100px';
  }
}
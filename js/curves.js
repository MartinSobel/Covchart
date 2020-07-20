const frequentCountrys = ["Argentina", "italy", "cuba", "india", "kazakhstan", "paraguay"];
const america = [];
const africa = [];
const europe = [];
const asia = [];
const oceania = [];

drawCurves(frequentCountrys);

function deleteCurves(){
  let aside = document.getElementById('curves');
  let canvas = document.getElementById('argentina');
  aside.removeChild(canvas);
}

function drawCurves(inputAarray){
  for (let i = 0 ; i < inputAarray.length ; i++){
    drawCurve(inputAarray[i]);
  }
}

function drawCurve(inputCountry){
  let cName = document.createElement("p");
  let node = document.createTextNode(inputCountry + ":");
  cName.appendChild(node);

  let text = document.getElementById('curves');
  text.appendChild(cName);

  let canvas = document.createElement('canvas');
  canvas.id = inputCountry;
  canvas.classList.add("deletable");

  let pos = document.getElementById('curves');
  pos.appendChild(canvas);

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
    const  ctx = document.getElementById(inputCountry).getContext('2d');
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
          enabled: false,
        },
        hover: {
          mode: null
        }
      }
    });
    chart.canvas.parentNode.style.width = '350px';
    chart.canvas.parentNode.style.height = '600px';
  }
}

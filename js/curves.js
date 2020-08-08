// getCountrysAviable();
// async function getCountrysAviable(){
//   let apiUrl = 'https://api.covid19api.com/countries';
//   let response = await fetch(apiUrl);
//   let data = await response.json();
//   let arr = data.reduce((acc, cur) => cur.Country ? [...acc, cur.Country] : acc, []);
//   console.log(arr);
// }

drawCurves(allCountrys);

function deleteCurves(){
  let pos = document.getElementById('curves');
  let canvas = pos.getElementsByTagName("canvas");
  let text = document.getElementsByTagName("p");
  while (canvas.length > 0){
    for (let i = 0 ; i < canvas.length ; i++){
          pos.removeChild(canvas[i]);
          pos.removeChild(text[i]);
    }
  }
}


function drawCurves(inputAarray){
  deleteCurves();
  for (let i = 0 ; i < inputAarray.length ; i++){
    drawCurve(inputAarray[i], 'curves', true, true);
  }
}

function drawCurve(inputCountry, position, textBool, onSidebar){
  if (textBool){
    let cName = document.createElement("p");
    let node = document.createTextNode(inputCountry + ":");
    cName.appendChild(node);
  
    let text = document.getElementById('curves');
    text.appendChild(cName);
  }

  let canvas = document.createElement('canvas');
  
  if (onSidebar){
    canvas.id = inputCountry;
  } else {
    canvas.id = "_" + inputCountry;
  }

  let pos = document.getElementById(position);
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
    if (onSidebar == false){
      inputCountry = "_" + inputCountry;
    }
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

    chart.canvas.addEventListener('click', e => {
      lastCurve = e.target.id;
      document.body.style.cursor = 'pointer';
      console.log(lastCurve);
      drawCurve(lastCurve, 'canvas', false, false);
    });
  }
}

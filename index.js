
chartIt()

async function getData() {
  const xs = [];
  const ys = [];
  const response = await fetch('ZonAnn.Ts+dSST.csv');
  const data = await response.text();
  const table = data.split('\n').slice(1);

  table.forEach(row => {
    const cols = row.split(',')
    const year = cols[0]
    const temp = cols[1]
    xs.push(year)
    ys.push(parseFloat(temp) + 14)
    console.log(year, temp)
  })
  return { xs, ys }
}
async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs,
      datasets: [{
        label: '# of Votes',
        data: data.ys,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value, index, values) {
              return value + '°';
            }
          }
        }
      }
    }
  });
}




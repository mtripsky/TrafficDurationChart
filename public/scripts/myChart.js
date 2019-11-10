function renderChart(data) {
    var ctx = document.getElementById("myChart").getContext('2d');

    datasetData = processData(data);

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasetData
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 70
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Duration in Traffic [min]'
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: 'HH:mm',
                        min: '06:00',
                        max: '09:00',
                        unit: 'minute',
                        unitStepSize: 10,
                    }
                }]
            },
        },
    });
}

function processData(data){
    data.sort(compare);

    let dateTime;
    let datasetData = [];
    let i = 0;
    let k = 0;
    while(i < data.length)
    {
        const dateTime = data[i].x;
        let rows = [];
        let j = 0;
        while(dateTime.format('ll') == data[i].x.format('ll'))
        {
            const time = moment({
                hour: data[i].x.hour(),
                minute: data[i].x.minute()
            });
            rows[j] = {x: time, y: data[i].y};
            ++j;
            ++i;
            if(i >= data.length)
            {
                break;
            }
        }

        datasetData[k] = {
            label: dateTime.format('dddd') + ", " + dateTime.format('ll'),
            data: rows,
            fill: false,
            borderWidth: 2,

            pointBackgroundColor: 'rgb(255,255,255)'
        }
        ++k;
    }

    let colorArray = getColors(datasetData.length);

    for(let i = 0; i < datasetData.length; ++i)
    {
        console.log(datasetData[i].label);
        datasetData[i].borderColor = colorArray[i];
        datasetData[i].backgroundColor = colorArray[i];
    }

    return datasetData;
}

function compare(a, b) {
    if(a.x < b.x){
        return -1;
    }
    return 1;
}

function getColors(n)
{
    const a = 255;
    let array = [];
    array.push('rgb(255,0,0)');

    if(n > 1) {
        const step = a * Math.sqrt(3)/ (n - 1);
        for(let i = 1; i < n; ++i)
        {
            const r = Math.ceil(a - Math.sin(35 * Math.PI / 180) * step * i);
            const b = Math.floor(Math.cos(35 * Math.PI / 180) * step * i * Math.cos(45 * Math.PI / 180));
            const g = Math.floor(Math.cos(35 * Math.PI / 180) * step * i * Math.cos(45 * Math.PI / 180));
            array.push("rgb(" + r + ", " + g + ", " + b + ")");
        }
    }

    return array;
}

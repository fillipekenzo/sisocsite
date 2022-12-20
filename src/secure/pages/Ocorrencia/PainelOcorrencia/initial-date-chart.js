const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
let i = 0;
let j = 100;
export const data1 = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map((a, index) => 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map((a, index) => 0),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data = {
    labels: ['Green'],
    datasets: [
        {
            label: '',
            data: [12],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
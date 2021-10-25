import React from 'react'
import { Chart } from 'react-charts'


const Analytics = (props) => {
    const { transactions } = props;
    const chartTransactionsObj1 = [...transactions];
    const chartTransactionsObj = [];
    const currentDate = new Date()
    const transactionDate = new Date(props.date);
    const diffTime = Math.abs(currentDate - transactionDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const diffMin = Math.ceil(diffTime / (60 * 1000));
    chartTransactionsObj1.sort((a, b) => b.date - a.date)
    chartTransactionsObj1.forEach((value, i) => {
        chartTransactionsObj.push([i, parseFloat(value.amount)]);
    });
    console.log(chartTransactionsObj);
    const data = React.useMemo(
        () => [
          {
            label: 'Last Tips',
            data: [...chartTransactionsObj]
          }
        ],
        []
    )
    const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
    )
    return (
            <div style={{ marginLeft: '60%', width: '30%', height: '300px', color: 'white', display: 'inline-block', marginTop: '-40%', marginBottom: '12%' }}>
                <Chart data={data} axes={axes} dark />
            </div>
    )
}

export default Analytics

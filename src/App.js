import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
// import {Line} from 'react-chartjs-2';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList } from 'recharts';

// 1. Get the look and feel of the Stock name and BUY and SELL buttons going
// 2. Work on the Table UI

// Next Session

// 1. Add database to the backend server
// 2. Add api router to the backend server
// 3. Define the models in the system
// 4. Test out the API in a REST client like postman

// Next Session

// 1. Set up an initial value for the wallet/ Seed the wallet with a certain amount
// 2. Search a stock from the React APP front end and show the results
// 3. Ability to buy a stock
// 4. Ability to sell a stock

// HW
// 1. Stop showing the boxes below on the second search
// 2. Make the cash value show up as an actual number - fetch the wallet value from the backend on page load HINT: use useEffect
// 3. Show the portfolio items in the table on the right hand side

// Next Session
// 1. Make sure we update the cash/wallet when we buy stock
// 2. Cleaning up the UI
// 3. Host the app on heroku

// Latest HW
// 1. Figure out a way to not buy a stock unless the wallet can cover the transaction. If not show an error
// 2. Show only update two decimal places in the wallet value on the UI
// 3. Host the app on heroku

// For submission
// 1. Show the portfolio items on the right hand side box. List out the stocks bought
// 2. Add a sell button Besides each stock, once i click on the sell button for a stock, it should delete the stock from the portfolio table and update the wallet
// 3. Host the app on heroku


// Latest HW:

// 1. USe a nice element to show the error box.


function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState();
    const [buyQuantity, setBuyQuantity] = useState();
    const [wallet, setWallet] = useState();

    // http://localhost:3000/api/v1/portfolio

    console.log(process.env.REACT_APP_API_URL);
    let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000'



    const searchStock = async () => {
        console.log('searching for the stock')
        console.log(searchTerm);
        let res = await fetch(`${apiUrl}/api/v1/search/${searchTerm}`);
        let json = await res.json();
        console.log(json);
        setActiveSearch(json.data);
    };

    const fetchWallet = async () => {
        console.log('fetches the wallet from the backend')
        let res = await fetch(`${apiUrl}/api/v1/wallet`);
        let json = await res.json();
        console.log(json);
        setWallet(json.value);
    };

    useEffect(() => {
        fetchWallet();
    }, [])

    const buyStock = async () => {
        console.log('buy the stock!')
        let cashRequired = buyQuantity * activeSearch.price;
        console.log(cashRequired)
        if(cashRequired <= wallet){
            let res = await fetch(`${apiUrl}/api/v1/portfolio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    symbol: searchTerm,
                    quantity: buyQuantity,
                    price: activeSearch.price
                })
            });
            let json = await res.json();
            console.log(json);
            // at this point the transaction has been successful, you need to show the updated wallet information now.
            fetchWallet()
            setBuyQuantity(null)
            setSearchTerm(null)
            setActiveSearch(null)

        } else {
            alert('Not enough cash to cover the transaction.');
        }



    };



    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //         {
    //             label: 'My First dataset',
    //             fill: false,
    //             lineTension: 0.1,
    //             backgroundColor: 'rgba(75,192,192,0.4)',
    //             borderColor: 'rgba(75,192,192,1)',
    //             borderCapStyle: 'butt',
    //             borderDash: [],
    //             borderDashOffset: 0.0,
    //             borderJoinStyle: 'miter',
    //             pointBorderColor: 'rgba(75,192,192,1)',
    //             pointBackgroundColor: '#fff',
    //             pointBorderWidth: 1,
    //             pointHoverRadius: 5,
    //             pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    //             pointHoverBorderColor: 'rgba(220,220,220,1)',
    //             pointHoverBorderWidth: 2,
    //             pointRadius: 1,
    //             pointHitRadius: 10,
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         }
    //     ]
    // };

    const data = [
        { date: 'Mon', price: 105.35 },
        { date: 'Tue', price: 102.71 },
        { date: 'Wed', price: 100.7 },
        { date: 'Thu', price: 96.45 },
        { date: 'Fri', price: 96.96 },
        // { date: 'Sa', price: 98.53 },
        // { date: 'Jan 12 2016', price: 99.96 },
        // { date: 'Jan 13 2016', price: 97.39 },
        // { date: 'Jan 14 2016', price: 99.52 },
        // { date: 'Jan 15 2016', price: 97.13 },
        // { date: 'Jan 19 2016', price: 96.66 },
        // { date: 'Jan 20 2016', price: 96.79 },
        // { date: 'Jan 21 2016', price: 96.3 },
        // { date: 'Jan 22 2016', price: 101.42 },
        // { date: 'Jan 25 2016', price: 99.44 },
        // { date: 'Jan 26 2016', price: 99.99 },
        // { date: 'Jan 27 2016', price: 93.42 },
        // { date: 'Jan 28 2016', price: 94.09 },
        // { date: 'Jan 29 2016', price: 97.34 },
        // { date: 'Feb 01 2016', price: 96.43 },
        // { date: 'Feb 02 2016', price: 94.48 },
        // { date: 'Feb 03 2016', price: 96.35 },
        // { date: 'Feb 04 2016', price: 96.6 },
        // { date: 'Feb 05 2016', price: 94.02 },
        // { date: 'Feb 08 2016', price: 95.01 },
        // { date: 'Feb 09 2016', price: 94.99 },
        // { date: 'Feb 10 2016', price: 94.27 },
        // { date: 'Feb 11 2016', price: 93.7 },
        // { date: 'Feb 12 2016', price: 93.99 },
        // { date: 'Feb 16 2016', price: 96.64 },
        // { date: 'Feb 17 2016', price: 98.12 },
        // { date: 'Feb 18 2016', price: 96.26 },
        // { date: 'Feb 19 2016', price: 96.04 },
        // { date: 'Feb 22 2016', price: 96.88 },
        // { date: 'Feb 23 2016', price: 94.69 },
        // { date: 'Feb 24 2016', price: 96.1 },
        // { date: 'Feb 25 2016', price: 96.76 },
        // { date: 'Feb 26 2016', price: 96.91 },
        // { date: 'Feb 29 2016', price: 96.69 },
        // { date: 'Mar 01 2016', price: 100.53 },
        // { date: 'Mar 02 2016', price: 100.75 },
        // { date: 'Mar 03 2016', price: 101.5 },
        // { date: 'Mar 04 2016', price: 103.01 },
        // { date: 'Mar 07 2016', price: 101.87 },
        // { date: 'Mar 08 2016', price: 101.03 },
        // { date: 'Mar 09 2016', price: 101.12 },
        // { date: 'Mar 10 2016', price: 101.17 },
        // { date: 'Mar 11 2016', price: 102.26 },
        // { date: 'Mar 14 2016', price: 102.52 },
        // { date: 'Mar 15 2016', price: 104.58 },
        // { date: 'Mar 16 2016', price: 105.97 },
        // { date: 'Mar 17 2016', price: 105.8 },
        // { date: 'Mar 18 2016', price: 105.92 },
        // { date: 'Mar 21 2016', price: 105.91 },
        // { date: 'Mar 22 2016', price: 106.72 },
        // { date: 'Mar 23 2016', price: 106.13 },
        // { date: 'Mar 24 2016', price: 105.67 },
        // { date: 'Mar 28 2016', price: 105.19 },
        // { date: 'Mar 29 2016', price: 107.68 },
        // { date: 'Mar 30 2016', price: 109.56 },
        // { date: 'Mar 31 2016', price: 108.99 },
        // { date: 'Apr 01 2016', price: 109.99 },
        // { date: 'Apr 04 2016', price: 111.12 },
        // { date: 'Apr 05 2016', price: 109.81 },
        // { date: 'Apr 06 2016', price: 110.96 },
        // { date: 'Apr 07 2016', price: 108.54 },
        // { date: 'Apr 08 2016', price: 108.66 },
        // { date: 'Apr 11 2016', price: 109.02 },
        // { date: 'Apr 12 2016', price: 110.44 },
        // { date: 'Apr 13 2016', price: 112.04 },
        // { date: 'Apr 14 2016', price: 112.1 },
        // { date: 'Apr 15 2016', price: 109.85 },
        // { date: 'Apr 18 2016', price: 107.48 },
        // { date: 'Apr 19 2016', price: 106.91 },
        // { date: 'Apr 20 2016', price: 107.13 },
        // { date: 'Apr 21 2016', price: 105.97 },
        // { date: 'Apr 22 2016', price: 105.68 },
        // { date: 'Apr 25 2016', price: 105.08 },
        // { date: 'Apr 26 2016', price: 104.35 },
        // { date: 'Apr 27 2016', price: 97.82 },
        // { date: 'Apr 28 2016', price: 94.83 },
        // { date: 'Apr 29 2016', price: 93.74 },
        // { date: 'May 02 2016', price: 93.64 },
        // { date: 'May 03 2016', price: 95.18 },
        // { date: 'May 04 2016', price: 94.19 },
        // { date: 'May 05 2016', price: 93.24 },
        // { date: 'May 06 2016', price: 92.72 },
        // { date: 'May 09 2016', price: 92.79 },
        // { date: 'May 10 2016', price: 93.42 },
        // { date: 'May 11 2016', price: 92.51 },
        // { date: 'May 12 2016', price: 90.34 },
        // { date: 'May 13 2016', price: 90.52 },
        // { date: 'May 16 2016', price: 93.88 },
        // { date: 'May 17 2016', price: 93.49 },
        // { date: 'May 18 2016', price: 94.56 },
        // { date: 'May 19 2016', price: 94.2 },
        // { date: 'May 20 2016', price: 95.22 },
        // { date: 'May 23 2016', price: 96.43 },
        // { date: 'May 24 2016', price: 97.9 },
        // { date: 'May 25 2016', price: 99.62 },
        // { date: 'May 26 2016', price: 100.41 },
        // { date: 'May 27 2016', price: 100.35 },
        // { date: 'May 31 2016', price: 99.86 },
        // { date: 'Jun 01 2016', price: 98.46 },
        // { date: 'Jun 02 2016', price: 97.72 },
        // { date: 'Jun 03 2016', price: 97.92 },
        // { date: 'Jun 06 2016', price: 98.63 },
        // { date: 'Jun 07 2016', price: 99.03 },
        // { date: 'Jun 08 2016', price: 98.94 },
        // { date: 'Jun 09 2016', price: 99.65 },
        // { date: 'Jun 10 2016', price: 98.83 },
        // { date: 'Jun 13 2016', price: 97.34 },
        // { date: 'Jun 14 2016', price: 97.46 },
        // { date: 'Jun 15 2016', price: 97.14 },
        // { date: 'Jun 16 2016', price: 97.55 },
        // { date: 'Jun 17 2016', price: 95.33 },
        // { date: 'Jun 20 2016', price: 95.1 },
        // { date: 'Jun 21 2016', price: 95.91 },
        // { date: 'Jun 22 2016', price: 95.55 },
        // { date: 'Jun 23 2016', price: 96.1 },
        // { date: 'Jun 24 2016', price: 93.4 },
        // { date: 'Jun 27 2016', price: 92.04 },
        // { date: 'Jun 28 2016', price: 93.59 },
        // { date: 'Jun 29 2016', price: 94.4 },
        // { date: 'Jun 30 2016', price: 95.6 },
        // { date: 'Jul 01 2016', price: 95.89 },
        // { date: 'Jul 05 2016', price: 94.99 },
        // { date: 'Jul 06 2016', price: 95.53 },
        // { date: 'Jul 07 2016', price: 95.94 },
        // { date: 'Jul 08 2016', price: 96.68 },
        // { date: 'Jul 11 2016', price: 96.98 },
        // { date: 'Jul 12 2016', price: 97.42 },
        // { date: 'Jul 13 2016', price: 96.87 },
        // { date: 'Jul 14 2016', price: 98.79 },
        // { date: 'Jul 15 2016', price: 98.78 },
        // { date: 'Jul 18 2016', price: 99.83 },
        // { date: 'Jul 19 2016', price: 99.87 },
        // { date: 'Jul 20 2016', price: 99.96 },
        // { date: 'Jul 21 2016', price: 99.43 },
        // { date: 'Jul 22 2016', price: 98.66 },
        // { date: 'Jul 25 2016', price: 97.34 },
        // { date: 'Jul 26 2016', price: 96.67 },
        // { date: 'Jul 27 2016', price: 102.95 },
        // { date: 'Jul 28 2016', price: 104.34 },
        // { date: 'Jul 29 2016', price: 104.21 },
        // { date: 'Aug 01 2016', price: 106.05 },
        // { date: 'Aug 02 2016', price: 104.48 },
        // { date: 'Aug 03 2016', price: 105.79 },
        // { date: 'Aug 04 2016', price: 105.87 },
        // { date: 'Aug 05 2016', price: 107.48 },
        // { date: 'Aug 08 2016', price: 108.37 },
        // { date: 'Aug 09 2016', price: 108.81 },
        // { date: 'Aug 10 2016', price: 108 },
        // { date: 'Aug 11 2016', price: 107.93 },
        // { date: 'Aug 12 2016', price: 108.18 },
        // { date: 'Aug 15 2016', price: 109.48 },
        // { date: 'Aug 16 2016', price: 109.38 },
        // { date: 'Aug 17 2016', price: 109.22 },
        // { date: 'Aug 18 2016', price: 109.08 },
        // { date: 'Aug 19 2016', price: 109.36 },
        // { date: 'Aug 22 2016', price: 108.51 },
        // { date: 'Aug 23 2016', price: 108.85 },
        // { date: 'Aug 24 2016', price: 108.03 },
        // { date: 'Aug 25 2016', price: 107.57 },
        // { date: 'Aug 26 2016', price: 106.94 },
        // { date: 'Aug 29 2016', price: 106.82 },
        // { date: 'Aug 30 2016', price: 106 },
        // { date: 'Aug 31 2016', price: 106.1 },
        // { date: 'Sept 01 2016', price: 106.73 },
        // { date: 'Sept 02 2016', price: 107.73 },
        // { date: 'Sept 06 2016', price: 107.7 },
        // { date: 'Sept 07 2016', price: 108.36 },
        // { date: 'Sept 08 2016', price: 105.52 },
        // { date: 'Sept 09 2016', price: 103.13 },
        // { date: 'Sept 12 2016', price: 105.44 },
        // { date: 'Sept 13 2016', price: 107.95 },
        // { date: 'Sept 14 2016', price: 111.77 },
        // { date: 'Sept 15 2016', price: 115.57 },
        // { date: 'Sept 16 2016', price: 114.92 },
        // { date: 'Sept 19 2016', price: 113.58 },
        // { date: 'Sept 20 2016', price: 113.57 },
        // { date: 'Sept 21 2016', price: 113.55 },
        // { date: 'Sept 22 2016', price: 114.62 },
        // { date: 'Sept 23 2016', price: 112.71 },
        // { date: 'Sept 26 2016', price: 112.88 },
        // { date: 'Sept 27 2016', price: 113.09 },
        // { date: 'Sept 28 2016', price: 113.95 },
        // { date: 'Sept 29 2016', price: 112.18 },
        // { date: 'Sept 30 2016', price: 113.05 },
        // { date: 'Oct 03 2016', price: 112.52 },
        // { date: 'Oct 04 2016', price: 113 },
        // { date: 'Oct 05 2016', price: 113.05 },
        // { date: 'Oct 06 2016', price: 113.89 },
        // { date: 'Oct 07 2016', price: 114.06 },
        // { date: 'Oct 10 2016', price: 116.05 },
        // { date: 'Oct 11 2016', price: 116.3 },
        // { date: 'Oct 12 2016', price: 117.34 },
        // { date: 'Oct 13 2016', price: 116.98 },
        // { date: 'Oct 14 2016', price: 117.63 },
        // { date: 'Oct 17 2016', price: 117.55 },
        // { date: 'Oct 18 2016', price: 117.47 },
        // { date: 'Oct 19 2016', price: 117.12 },
        // { date: 'Oct 20 2016', price: 117.06 },
        // { date: 'Oct 21 2016', price: 116.6 },
        // { date: 'Oct 24 2016', price: 117.65 },
        // { date: 'Oct 25 2016', price: 118.25 },
        // { date: 'Oct 26 2016', price: 115.59 },
        // { date: 'Oct 27 2016', price: 114.48 },
        // { date: 'Oct 28 2016', price: 113.72 },
        // { date: 'Oct 31 2016', price: 113.54 },
        // { date: 'Nov 01 2016', price: 111.49 },
        // { date: 'Nov 02 2016', price: 111.59 },
        // { date: 'Nov 03 2016', price: 109.83 },
        // { date: 'Nov 04 2016', price: 108.84 },
        // { date: 'Nov 07 2016', price: 110.41 },
        // { date: 'Nov 08 2016', price: 111.06 },
        // { date: 'Nov 09 2016', price: 110.88 },
        // { date: 'Nov 10 2016', price: 107.79 },
        // { date: 'Nov 11 2016', price: 108.43 },
        // { date: 'Nov 14 2016', price: 105.71 },
        // { date: 'Nov 15 2016', price: 107.11 },
        // { date: 'Nov 16 2016', price: 109.99 },
        // { date: 'Nov 17 2016', price: 109.95 },
        // { date: 'Nov 18 2016', price: 110.06 },
        // { date: 'Nov 21 2016', price: 111.73 },
        // { date: 'Nov 22 2016', price: 111.8 },
        // { date: 'Nov 23 2016', price: 111.23 },
        // { date: 'Nov 25 2016', price: 111.79 },
        // { date: 'Nov 28 2016', price: 111.57 },
        // { date: 'Nov 29 2016', price: 111.46 },
        // { date: 'Nov 30 2016', price: 110.52 },
        // { date: 'Dec 01 2016', price: 109.49 },
        // { date: 'Dec 02 2016', price: 109.9 },
        // { date: 'Dec 05 2016', price: 109.11 },
        // { date: 'Dec 06 2016', price: 109.95 },
        // { date: 'Dec 07 2016', price: 111.03 },
        // { date: 'Dec 08 2016', price: 112.12 },
        // { date: 'Dec 09 2016', price: 113.95 },
        // { date: 'Dec 12 2016', price: 113.3 },
        // { date: 'Dec 13 2016', price: 115.19 },
        // { date: 'Dec 14 2016', price: 115.19 },
        // { date: 'Dec 15 2016', price: 115.82 },
        // { date: 'Dec 16 2016', price: 115.97 },
        // { date: 'Dec 19 2016', price: 116.64 },
        // { date: 'Dec 20 2016', price: 116.95 },
        // { date: 'Dec 21 2016', price: 117.06 },
        // { date: 'Dec 22 2016', price: 116.29 },
        // { date: 'Dec 23 2016', price: 116.52 },
        // { date: 'Dec 27 2016', price: 117.26 },
        // { date: 'Dec 28 2016', price: 116.76 },
        // { date: 'Dec 29 2016', price: 116.73 },
        // { date: 'Dec 30 2016', price: 115.82 },
    ]

  return (
    <>
      <div className={'grid grid-cols-12'}>
          <div className={'col-span-12 border p-3'}>
              <h1 className={'text-2xl text-center font-bold'}>Paper Trader</h1>
          </div>

          <div className={'col-span-12 md:col-span-6 border p-5'}>
              {/*<h1 className={'text-3xl font-bold'}>Box 1</h1>*/}

              <div className={'grid grid-cols-12'}>
                  <div className={'col-span-12 md:col-span-6 mb-4'}>




                      {/*<Line data={data} />*/}

                      {/*<StockChart />*/}

                      <input onChange={(ev) => setSearchTerm(ev.currentTarget.value)} type={'search'} className={'border p-2 w-2/3 border-gray-300 rounded mr-2'} />
                      <button className={'p-2 bg-blue-600 rounded text-white cursor-pointer'} onClick={searchStock}>Search</button>


                  </div>
                  <div className={'col-span-12 md:col-span-6 hidden md:block p-3'}>
                      <h1 className={'text-3xl font-bold text-right text-green-600'}>${parseFloat(wallet).toFixed(2)}</h1>
                  </div>
                  {activeSearch && <div className={'col-span-12 md:col-span-6 p-3 bg-gray-200'}>
                      <h1 className={'text-2xl font-bold text-gray-600'}>
                          {searchTerm}
                          <p className={'text-xs text-gray-400'}>{activeSearch.currency} {activeSearch.price}</p>
                      </h1>
                  </div>}
                  {activeSearch && <div className={'col-span-12 md:col-span-6 p-3'}>

                  {/*    onChange={(ev) => {*/}
                  {/*    let currentValue = ev.currentTarget.value;*/}
                  {/*    if(currentValue>25){*/}
                  {/*        alert('Show error!')*/}
                  {/*    }*/}
                  {/*}}*/}

                  <input onChange={(ev) => setBuyQuantity(ev.currentTarget.value)}
                             type="number"
                             className={'border p-2 w-20 border-gray-300 rounded mr-2'}/>
                      <button onClick={buyStock} className={'p-2 bg-blue-600 rounded text-white cursor-pointer w-1/3'}>Buy</button>
                  </div>}
                  <div className={'col-span-12  p-3'}>
                      {/*Box 7*/}


                      {/*<LineChart*/}
                      {/*    width={400}*/}
                      {/*    height={400}*/}
                      {/*    data={data}*/}
                      {/*    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
                      {/*>*/}
                      {/*    <XAxis dataKey="name" />*/}
                      {/*    <Tooltip />*/}
                      {/*    <CartesianGrid stroke="#f5f5f5" />*/}
                      {/*    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />*/}
                      {/*    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />*/}
                      {/*</LineChart>*/}

                      {/*Try to cleanup the chart and make it look leaner*/}
                      <LineChart
                          width={800} height={400} data={data}
                          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
                      >
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="date" label="" />
                          <YAxis domain={['auto', 'auto']} label="" />
                          <Tooltip
                              wrapperStyle={{
                                  borderColor: 'white',
                                  boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                              }}
                              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                          />
                          <Line dataKey="price" stroke="#ff7300" dot={false} />
                          <Brush dataKey="date" startIndex={data.length - 40}>
                              <AreaChart>
                                  <CartesianGrid />
                                  <YAxis hide domain={['auto', 'auto']} />
                                  <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false} />
                              </AreaChart>
                          </Brush>
                      </LineChart>




                  </div>
              </div>

          </div>

          <div className={'col-span-12 md:col-span-6 border p-5'}>
              <h1 className={'text-3xl font-bold'}>Box 2</h1>

              <table className={'border w-full'}>
                  <tr className={'border'}>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Age</th>
                  </tr>
                  <tr className={'border'}>
                      <td>Jill</td>
                      <td>Smith</td>
                      <td>50</td>
                  </tr>
                  <tr className={'border'}>
                      <td>Eve</td>
                      <td>Jackson</td>
                      <td>94</td>
                  </tr>
              </table>



          </div>

      </div>
    </>
  );
}

export default App;

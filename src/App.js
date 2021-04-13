import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

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

// Latest HW
// 1. Stop showing the boxes below on the second search
// 2. Make the cash value show up as an actual number - fetch the wallet value from the backend on page load HINT: use useEffect
// 3. Show the portfolio items in the table on the right hand side

// Next Session
// 1. Make sure we update the cash/wallet when we buy stock
// 2. Cleaning up the UI
// 3. Host the app on heroku

function App() {

    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState();
    const [buyQuantity, setBuyQuantity] = useState();

    // http://localhost:3000/api/v1/portfolio


    const searchStock = async () => {
        console.log('searching for the stock')
        console.log(searchTerm);
        let res = await fetch(`http://localhost:3000/api/v1/search/${searchTerm}`);
        let json = await res.json();
        console.log(json);
        setActiveSearch(json.data);
    };

    const buyStock = async () => {
        console.log('buy the stock!')

        let res = await fetch(`http://localhost:3000/api/v1/portfolio`, {
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

    };

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

                      <input onChange={(ev) => setSearchTerm(ev.currentTarget.value)} type={'search'} className={'border p-2 w-2/3 border-gray-300 rounded mr-2'} />
                      <button className={'p-2 bg-blue-600 rounded text-white cursor-pointer'} onClick={searchStock}>Search</button>


                  </div>
                  <div className={'col-span-12 md:col-span-6 hidden md:block p-3'}>
                      <h1 className={'text-3xl font-bold text-right text-green-600'}>$100</h1>
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

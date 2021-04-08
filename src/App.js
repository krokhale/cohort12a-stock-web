import logo from './logo.svg';
import './App.css';

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

function App() {
  return (
    <>
      <div className={'grid grid-cols-12'}>
          <div className={'col-span-12 border p-3'}>
              <h1 className={'text-2xl text-center font-bold'}>Paper Trader</h1>
          </div>

          <div className={'col-span-12 md:col-span-6 border p-5'}>
              <h1 className={'text-3xl font-bold'}>Box 1</h1>

              <div className={'grid grid-cols-12'}>
                  <div className={'col-span-12 md:col-span-6 border p-3'}>Box 3</div>
                  <div className={'col-span-12 md:col-span-6 hidden md:block border p-3'}>Box 4</div>
                  <div className={'col-span-12 md:col-span-6 border p-3'}>Box 5</div>
                  <div className={'col-span-12 md:col-span-6 border p-3'}>Box 6</div>
                  <div className={'col-span-12 border p-3'}>Box 7</div>
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

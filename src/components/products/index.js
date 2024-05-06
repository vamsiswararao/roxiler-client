import React, { useState, useEffect } from 'react';
import TransactionStatistics from "../TransactionStatistics";
import "./index.css";
import RenderBarChart from '../BarChart';
import RenderPieChart from '../PieChart';

const Products =()=>{
    const [month, setMonth] = useState("03");
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRanges, setPriceRanges] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [summaryData, setSummaryData] = useState({
        totalAmount: 0,
        totalSoldItems: 0,
        totalUnsoldItems: 0
      });


      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    useEffect(()=>{
        const fetchSummaryData = async () => {
            try {
              const response = await fetch(`https://roxiler-server-tua6.onrender.com/sales-details?month=${month}`);
              const data = await response.json();
              setSummaryData(data[0]);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching summary data:', error);
            }
          };
          const fetchTransactions=async()=>{
            try {
                const responseData = await fetch(`https://roxiler-server-tua6.onrender.com/transaction?month=${month}&search=${searchText}&page=${currentPage}&perPage=10`)
                const data = await responseData.json();
                setTransactions(data);
                setLoading(false);
            } catch (error) {
                
            }
            }
            const fetchPriceRangeData = async () => {
                try {
                  const response = await fetch(`https://roxiler-server-tua6.onrender.com/price-range?month=${month}`);
                  const data = await response.json();
                  setPriceRanges(data)
                } catch (error) {
                  console.error('Error fetching price range data:', error);
                }
              };
              const fetchCategoryData = async () => {
                try {
                  const response = await fetch(`https://roxiler-server-tua6.onrender.com/category?month=${month}`);
                  const data = await response.json();
                  setCategoryData(data);
                } catch (error) {
                  console.error('Error fetching category data:', error);
                }
              };
          fetchTransactions();
          fetchSummaryData();
          fetchPriceRangeData();
          fetchCategoryData();
    },[month,searchText,currentPage])

    
 const onCHangeSearchInput=event=>{
    const value=event.target.value
    setSearchText(value)
 }
   

    
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
      };

      const renderMonthOptions = () => {
        return months.map((monthName, index) =>{
            const monthNumber = (index + 1).toString().padStart(2, '0');
            return(  
                <option key={monthNumber} value={monthNumber}>
                    {monthName}
                </option>
                )
      });
      };
     
      const renderLoader = () => (
        <div className="loading-container">
            <div className="loading-animation"></div>
        </div>
       );

    return(
        <>
        <div className="search-container">
      <div className="controls">
        <div>
            <label>Search Transactions:</label>
            <input
                className="searchInput"
                type="text"
                value={searchText}
                onChange={onCHangeSearchInput}
                placeholder="Search..."
                />
        </div>
        <div className='title-container'>
            <h2 className="title">Transaction Dashboard</h2>
        </div>
        <div>
            <label>Select Month:</label>
            <select className="select" value={month} onChange={(e) => setMonth(e.target.value)}>
                {renderMonthOptions()}
            </select>
        </div>
      </div> 
        </div>
        {loading?renderLoader()
         :(
        <div>

        <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>sold</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sold}</td>
              <td> <img src={transaction.image} alt={transaction.title} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
     )}
      <div className="pagination">
        <button className="paginationButton" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="currentPage">Page {currentPage}</span>
        <button className="paginationButton" onClick={handleNextPage}>Next</button>
      </div> 
      <TransactionStatistics loading={loading} month={month} summaryData={summaryData}/>
      
      <div className='charts-container'>

      <div className="chartContainer">
      <h2>BarChart - {months[parseInt(month-1)]}</h2>
        {priceRanges.length > 0 ? (
            <RenderBarChart priceRanges={priceRanges}/>
        ) : (
            <p>Loading...</p>
        )}
      </div>

      <div className="chartContainer">
      <h2>PieChart - {months[parseInt(month-1)]}</h2>
        {priceRanges.length > 0 ? (
          <RenderPieChart categoryData={categoryData}/>
        ) : (
            <p>Loading...</p>
        )}
      </div>
    </div>
    
    </>
    )
}

export default Products
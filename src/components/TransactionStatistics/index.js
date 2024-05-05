import "./index.css"
const TransactionStatistics=props=>{
    const {summaryData,month,loading}=props
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const selectedMonth=months[parseInt(month-1)]
        const renderLoader = () => (
            <div className="loading-container">
                <div className="loading-animation"></div>
            </div>
      );

    return(
        <div className="transaction-box">
          <h2>Statistics - {selectedMonth}</h2>
        {loading?renderLoader()
         :(
            <div className="summaryBox">
              <h3>Total Amount of Sale: ${summaryData.totalAmountOfSale}</h3>
              <h3>Total Sold Items: {summaryData.totalSoldItems}</h3>
              <h3>Total Unsold Items: {summaryData.totalUnsoldItems}</h3>
            </div>
          )
      }
        </div>
    )
}

export default TransactionStatistics
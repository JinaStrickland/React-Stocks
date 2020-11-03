import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolioStocks: [],
    filterType: "All"
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({ stocks: stocks }))
  }

  clickStock = (stock) => {
    if(!this.state.portfolioStocks.includes(stock)) {
      this.setState({
        portfolioStocks: [...this.state.portfolioStocks, stock] 
      })
    }
  }

  clickToRemove = (stock) => {
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks].filter(pStock => pStock !== stock)
    })
  }

  sortBy = (type) => {
    if(type === "Alphabetically") {
      this.setState({
        stocks: [...this.state.stocks].sort((a, b) => a.name.localeCompare(b.name))
      })
    } else if (type === "Price") {
      this.setState({
        stocks: [...this.state.stocks].sort((a, b) => a.price - b.price)
      })
    }
  }

  filterBy = (type) => {
    this.setState({
      filterType: type 
    }) 
  }

  displayStocks = () => {
    if(this.state.filterType === "All") { 
      return [...this.state.stocks] 
    } else {
      let stocks = [...this.state.stocks].filter(stock => stock.type.includes(this.state.filterType))
      return stocks 
    } 
  }
  
  render() {
    
    return (
      <div>
        <SearchBar  sortBy={ this.sortBy }
                    filterBy={ this.filterBy } 
                    />
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={ this.displayStocks() }
                              clickStock={ this.clickStock }/>
            </div>
            <div className="col-4">
              <PortfolioContainer portfolioStocks={ this.state.portfolioStocks }
                                  clickToRemove={ this.clickToRemove } />

            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;

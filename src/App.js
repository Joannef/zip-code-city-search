import React, { Component } from 'react';
import './App.css';
function City({data}) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        { data.City}
      </div>
      <div className="card-body">
        <ul>
          <li>State: {data.State}</li>
          <li>Location: ({data.Lat}, {data.Long})</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField({item, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Zip Code:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={item}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      item: '',
    }
  }
  itemChanged(event) {
    let item = event.target.value;

    //if the item is a zip code
    if(item.length == 5 && isNaN() == true){
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${item}`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        this.setState({
          cities: body
        })
      })
      .catch((err) => {
        console.log("err")
        this.setState({ //if there is errors make cities null
          cities: []
        })
      })
    } else {
      console.log("err")
        this.setState({ //if there is errors make cities null
          cities: []
        })
    }
    
    fetch(`http://ctp-zip-api.herokuapp.com/city/${item}`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        this.setState({
          cities: body
        })
      })
      .catch((err) => {
        console.log("err")
        this.setState({ //if there is errors make cities null
          cities: []
        })
      })

    this.setState({
      item: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col">
              <ZipSearchField
                item={this.state.item}
                onChange={(e) => this.itemChanged(e)}
              />
            </div>
          </div>
          {
            this.state.cities.length === 0 
              ? <p>No Results</p>
              : this.state.cities.map((c, index) => {
              return (
                <div className="row" key ={index}>
                  <div className="col">
                    <City 
                      data={c}
                      
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
/*
npm install -g npm@latest
TODO:
- Display more data about each city  -DONE
- remove results when extra characters are typed -DONE
- display "no results" if the zip is incorrect instead of empty -DONE
- add checks to prevent multiple requests if we know zip is invalid format -DONE
*/
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

function ZipSearchField({userIn, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Zip Code:</label>
        <input
          type="text"
          className="form-control ml-2"
          value={userIn}
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
      userIn: '',
    }
  }
  userInChanged(event) {
    let userIn = event.target.value;

    //if the userIn is a zip code
    if(userIn.length == 5 && isNaN() == true){
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${userIn}`)
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
        fetch(`http://ctp-zip-api.herokuapp.com/city/${userIn}`)
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
    }
    
    

    console.log("err")
    this.setState({ //if there is errors make cities null
      cities: []
    })
    this.setState({
      userIn: event.target.value
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
                userIn={this.state.userIn}
                onChange={(e) => this.userInChanged(e)}
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
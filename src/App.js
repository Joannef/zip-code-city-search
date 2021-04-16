import React, { Component } from 'react';
import './App.css';


function City({data}) { 
    //do some data stuff
    return (
      <div className="card mb-4">
        <div className="card-header">
          { data.City}
        </div>
        <div className="card-body">
          <ul>
            <li>State: {data.State}</li>
            <li>Location: ({data.Lat}, {data.Long})</li>
            <li>Population (Estimate): {data.EstimatedPopulation} </li>
            <li>Total Wages: ${data.TotalWages} </li>
          </ul>
        </div>
      </div>
    );
  

}

function ZipSearchField({userIn, onChange}) {
  return (
    <div>
      <form className="form-inline my-4">
        <label>Enter Zip-Code or City Name:</label>
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
    if(userIn.length === 5){
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
        fetch(`http://ctp-zip-api.herokuapp.com/city/${userIn.toUpperCase()}`)
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

                let isCity = false; //this checks if cities is a json object or not
                try{
                  isCity = c.City;
                } catch (e){
                  isCity = true;
                }

              
              if(isCity){ //this runs if cities is a json (it is cities)
               
                return (
                  <div className="row" key ={index}>
                    <div className="col">
                      <City 
                        data={c}
                        
                      />
                    </div>
                  </div>
                )
              }
              else{ //this means that a zip was entered isntead
                //maybe add styling here?????
                return(
                  <ul>
                    <li>{c}</li>
                  </ul>

                )
              }
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
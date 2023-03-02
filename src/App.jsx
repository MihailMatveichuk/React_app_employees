import { Component } from "react";
import "./App.css";
import AppInfo from "./components/app-info/AppInfo";
import SearchPanel from "./components/search-panel/SearchPanel";
import AppFilter from "./components/app-filter/AppFilter";
import EmployeesList from "./components/employees-list/EmployeesList";
import EmployeesAdd from "./components/employees-add-form/EmployeesAdd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Mike", salary: 1000, increase: true, rise: true, id: 1 },
        { name: "Jack", salary: 1200, increase: false, rise: false, id: 2 },
        { name: "John", salary: 800, increase: false, rise: false, id: 3 },
      ],
      term: '',
      filter: 'all',
    };
    this.maxId = 4;
  }

  deleteEmployers = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };

    this.setState(({ data }) => {
      const newArr = [...data.concat(newItem)];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [prop]: !item[prop],
          };
        }
        return item;
      }),
    }));
  };

  searchEmp = (items, term) => {
    if(term.length === 0){
      return items;
    }else{
      return items.filter(item => {
        // return item.name.indexOf(term) > -1;
        return item.name.includes(term);
      })
    }
  }

  onUpdateSearch = (term) =>{
    this.setState({term,});
  }


  onFilterPost = (items, filter) =>{
    switch(filter){
      case 'rise': 
        return items.filter(item => item.rise === true);
      case 'overSalary':
        return items.filter(item => item.salary > 1000);
      default: 
      return items;  
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter})
  }

  render() {

    const {data, term, filter} = this.state;
    const visibleData = this.onFilterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo data={visibleData} />
        <div className="search-panel">
          <SearchPanel 
            onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter 
          filter={filter}
          onFilterSelect={this.onFilterSelect}/>
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteEmployers}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAdd onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;

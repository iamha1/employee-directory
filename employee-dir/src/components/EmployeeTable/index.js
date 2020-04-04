import React from "react";
import "../EmployeeTable/style.css"
import API from "../API" 
import Search from "../Search"


// const employees = [
//     {
//         id: 1,
//         name: "dave",
//         image: "",
//         phone: "123-456-789",
//         email: "dave@dave.com",
//         dob: "01/01/1989"
//     },

//     {
//         id: 2,
//         name: "scott",
//         image: "",
//         phone: "123-456-789",
//         email: "scott@dave.com",
//         dob: "01/20/1989"
//     },

//     {
//         id: 3,
//         name: "marlon",
//         image: "",
//         phone: "123-456-789",
//         email: "marlon@dave.com",
//         dob: "10/20/1983"
//     },
// ]
// class EmployeeTable extends React.Component {
//     state = {
//         employees: employees,
//         sortOrder: "ASC"
//     }
//     sortByName = () => {
//         if(this.state.sortOrder === "ASC")
//        let sortedEmployees = this.state.employees.sort(function
//         (a, b) {
//            if(b.name > a.name) {
//             return -1;
//            }
//            if(a.name > b.name) {
//                return 1;
//            }
//            return 0;
       
//        });
  
//     this.setState( {employees: sortedEmployees });
        
//     }

//     render() {
//         return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Image</th>
//                     <th>Name</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>DOB</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {employees.map(person => (
//                     <tr key={person.id}> 
//                         <td>{person.image}</td>
//                         <td> {person.name}</td>
//                         <td> {person.phone}</td>
//                         <td> {person.email}</td>
//                         <td> {person.dob}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
//                 }
// }

// export default EmployeeTable;

//Table class
class EmployeeTable extends React.Component {

    //States
    state = {
      sortOrder: "",
      results: [],
      search: ""
    }
  
    //calling api
    componentDidMount() {
      API.ApiSearch()
        .then(res => {
          this.setState({ results: res.data.results })
          console.log(this.state.results)
        }).catch(err => console.log(err))
    }
  
  
    //Handling input in search bar 
    handleInputChange = event => {
  
      if (event.target.name === "search") {
        const searchTerm = event.target.value.toLowerCase();
        this.setState({
          search: searchTerm
        })
      }
    }
  
    //Sort by first name
    sortByFName = () => {
      const sortedEmployees = this.state.results.sort((a, b) => {
        if (b.name.first > a.name.first) {
          return -1
        }
        if (a.name.first > b.name.first) {
          return 1
        }
        return 0;
      });
  
      if (this.state.sortOrder === "DESC") {
        sortedEmployees.reverse();
        this.setState({ sortOrder: "ASC" });
      } else {
        this.setState({ sortOrder: "DESC" });
      }
      this.setState({ results: sortedEmployees })
    }
  
    //Sort by last name 
    sortByLName = () => {
      const sortedEmployees = this.state.results.sort((a, b) => {
        if (b.name.last > a.name.last) {
          return -1
        }
        if (a.name.last > b.name.last) {
          return 1
        }
        return 0;
      });
      if (this.state.sortOrder === "DESC") {
        sortedEmployees.reverse();
        this.setState({ sortOrder: "ASC" });
      } else {
        this.setState({ sortOrder: "DESC" });
      }
      this.setState({ results: sortedEmployees })
    }
  
    //Render items on the page
    render() {
      return (
        <div>
          <Search handleInputChange={this.handleInputChange}
            search={this.state.search} />
  
          <div className="row tableHeadDiv">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>F-Name <span className="downArrow" onClick={this.sortByFName}></span></th>
                  <th>L-Name <span className="downArrow" onClick={this.sortByLName}></span></th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>DOB </th>
                </tr>
              </thead>
  
              { //Mapping through the results and showing those to be displayed, all if no search term, only those wo include the search if there is
              this.state.results && this.state.results.map(item => 
                item.name.first.toLowerCase().includes(this.state.search) ?
                <tbody key={item.login.uuid}>
                <tr>
                  <td ><img src={item.picture.thumbnail} alt="thumbnail" /></td>
                  <td > {item.name.first} </td>
                  <td > {item.name.last} </td>
                  <td >{item.phone} </td>
                  <td >{item.email}</td>
                  <td >{item.dob.date.split("T")[0]}</td>
                </tr>
              </tbody> 
              
              :  
            // this.state.results && this.state.results.map(item => 
               item.name.last.toLowerCase().includes(this.state.search) ?
                <tbody key={item.login.uuid}>
                <tr>
                  <td ><img src={item.picture.thumbnail} alt="thumbnail" /></td>
                 <td > {item.name.first} </td>
                  <td > {item.name.last} </td>
                 <td >{item.phone} </td>
                  <td >{item.email}</td>
                  <td >{item.dob.date.split("T")[0]}</td>
               </tr>
             </tbody> 
             :
             null
             )}
    
              
            </table>
          </div>
        </div>
      )
    }
  }
  
  export default EmployeeTable;
  
import React, { Component } from 'react';
import Axios from 'axios';

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
            phone:"", 
            add_elem:[],
            Contact:[]
         }
    }
    componentDidMount(){
       Axios.get('http://localhost:4000/find_all').then(res=>this.setState({
           contact:res.data
       }))
    }
    componentDidUpdate(prevprops,prevState){
     if(prevState.Contact.length!==this.state.Contact.length){
        Axios.get('http://localhost:4000/find_all').then(res=>this.setState({
            contact:res.data
        }))
     }else {console.log("not updated")}
    }
    hadelchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    AddContact=()=>{
        Axios.post("http://localhost:4000/add_contact",{name:this.state.name,email:this.state.email,phone:this.state.phone})
        .then(res=>this.setState({add_elem:[...this.state.add_elem,res.data]}))
        .catch(er=>alert(er)) 
    }
    delete_elem=(id)=>{
        Axios.delete('http://localhost:4000/delete/:id'+id)
    }
    render() { 
        return ( <div>
            <input type='text' name="name" placeholder="name" onChange={this.hadelchange}/>
            <input type='text'  name="email" placeholder="email" onChange={this.hadelchange}/>
            <input type='text' name="phone" placeholder="phone" onChange={this.hadelchange}/>
            <button onClick={this.AddContact}>Add Contact</button>
            <div>
                {this.state.contact.map(el=><div style={{border:"1px solid black"}} key={el._id}>
                    <p>name:{el.name}</p>
                    <p>email:{el.email}</p>
                    <p>phone:{el.phone}</p>
                    <Link to={`/Edit/${el._id}`}><button>Edit</button></Link>
                    <button onClick={this.delete_elem(el._id)}>Delete</button>
                    
                </div>)}
            </div>
        </div> );
    }
}
 
export default AddContact;
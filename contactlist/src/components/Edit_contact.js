import React, { Component } from 'react';
import Axios from 'axios';
 class Edit_contact extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
            phone:"", 
         }
    }
    componentDidMount(){
        Axios.get('http://localhost:4000/find_all')
        .then(res=>
            res.data.map(el=>(el._id===this.props.match.params.id)&&this.setState({
                name:el.name,
                email:el.email,
                phone:el.phone,
            })))
            .catch(er=>console.log(er))
    }
    hadelchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    EditContact=()=>{
        Axios.put('http://localhost:4000/edit_contact/'+this.props.match.params.id,{name:this.state.name,email:this.state.email,phone:this.state.phone})
    }
    render() { 
        return (  <div>
            <input type='text' name="name" value={this.state.name} placeholder="name" onChange={this.hadelchange}/>
            <input type='text'  name="email" value={this.state.email} placeholder="email" onChange={this.hadelchange}/>
            <input type='text' name="phone" value={this.state.phone} placeholder="phone" onChange={this.hadelchange}/>
            <button onClick={this.EditContact}>Edit Contact</button>
            </div> );
    }
}
 
export default Edit_contact;
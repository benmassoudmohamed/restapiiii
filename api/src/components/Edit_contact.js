import React, { Component } from 'react';
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
        Axios.get('http://localhost:4000/find_one'+this.props.match.params.id )
        .then(res=>{console.log(res.data)
            this.setState({
            name:res.data.name,
            email:res.data.email,
            phone:res.data.phone 
        })})
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
            <input type='text' name="phone" value={this.state.value} placeholder="phone" onChange={this.hadelchange}/>
            <button onClick={this.EditContact}>Edit Contact</button>
            </div> );
    }
}
 
export default Edit_contact;
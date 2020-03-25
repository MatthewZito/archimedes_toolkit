import React from 'react'

class SelectBox1 extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = { value: 'select'};
    }
    onChange(e) {
      this.setState({
        value: e.target.value
      })
    }
    render() {
      return (
        <div className="form-group">
          <label htmlFor="select1" >Select1</label>
          <select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
            <option value="select">Select an Option</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
          </select>
        </div>
      )
    }
  }

const DropdownWrapper = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 col-sm-push-4">
          <SelectBox1 />
          
        </div>
      </div>
    </div>
  )
}

export default DropdownWrapper

//markdown css lib

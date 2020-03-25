// import styled component lib


const Select = styled.select`
    width: 212px;
    margin-left: 42px;
    margin-right: 40px;
    margin-top: 10px;
`


class DropdownWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = { value: 'Sort By' }
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <Select value={this.state.value} onChange={this.onChange.bind(this)}>
          {this.props.children}
        </Select>
      </div>
    )
  }
}

export default DropdownWrapper

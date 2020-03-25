//import styled components lib

const DropdownContainer = styled.div`
    position: relative;
    float: right;
    display: inline-block;
    padding: 0px 20px;

    :hover .dropdown-content {
        display: block;
        }
`

const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    a:hover {
        background-color: #f1f1f1
    }

`
const Button = styled.select`
    background-color: #007c92;
    color: white;
    padding: 12px;
    font-size: 16px;
    border: none;
    cursor: pointer;
`

class DropdownWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
        value: 'Sort By' 
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    return (
        <DropdownContainer>
            <Button onChange={this.onChange.bind(this)} value={this.state.value} />
            <ContentContainer className='dropdown-content'>
              {this.props.children}
            </ContentContainer>
        </DropdownContainer>
    )
  }
}

export default DropdownWrapper

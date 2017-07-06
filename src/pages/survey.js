import React, {Component} from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'



class Survey extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isHidden: false,
      text: 'this is test data let\'s see what it do'}
    // this.handleChange = this.handleChange.bind(this)
    // this.handeClick = this.handleChange.bind(this)
  }

  // handleChange = (e) => {
  //     this.setState({isHidden: true})
  // }

  handleClick = (e) => {
    this.state = {
      isHidden: false
    }
  }
  //   fetch(`/api/entries_modules/${this.props.entryModule.em_id}`, {
  //     method: 'PATCH',
  //     body: JSON.stringify({content: content}),
  //     credentials: 'same-origin',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({text: `<p>${nextProps.entryModule.content}</p>`})
  }

  render() {
    return (
      <div>
        <div className="survey-content">
            <p> Describe your ideal haunted doll:
            </p>
            <div className="border-outer">
            <div className="border-inner">
              <ContentEditable
                html={this.state.text}
                disabled={false}
                className="texting"
              />
            </div>
            </div>

            <br></br>
            <button type="button" className="btn btn-outline-primary survey-btn"><a href="#land">Submit</a></button>
        </div>
      </div>
    )
  }
}

export default Survey

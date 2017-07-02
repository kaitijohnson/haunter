import React, { Component } from 'react'
import $ from 'jquery'

class Descriptions extends Component {
  constructor(props) {
      super(props)

      this.state = {
        recentDolls: []
      }
      this.selectDoll = this.selectDoll.bind(this)
    }

    selectDoll(e) {
      if (e.target.src) {
        $('#doll').attr('src', e.target.src)
      }
    }

    componentDidMount() {
      console.log('inside the mount')
      // http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=152596593579&IncludeSelector=Description,ItemSpecifics
      $.ajax({
        method: 'get',
        url: 'http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=172733473387&IncludeSelector=Description,ItemSpecifics',
        dataType: 'json',
        success: function(data) {
          console.log("Descriptions data: ", data)

        },
        error: function(err) {
          console.log(err);
        }
      })
      .then((dollArray) => {
        this.setState({
          recentDolls: dollArray
        })
      })
    }
      render() {
        // let recent = this.state.recentDolls
        // let dollsList = recent.map(function(dollsDisplay) {
        //   return <img src={dollsDisplay.searchResult.galleryURL} width="100%" className="doll-pics" alt="doll-pics"/>
        // })
        return (
          <div className='doll-collection'>
            <div className="text-center" onClick={this.selectDoll}>

            </div>
            <br/>
          </div>
        )
      }
  }
export default Descriptions

import React, {Component} from 'react'
import $ from 'jquery'

class Dolls extends Component {
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
    $.ajax({
      method: 'get',
      url: `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=haunted%20doll`,
      dataType: 'json',
      success: function(data) {
        console.log("Dolls data: ", data)
        let dollObject = data.findItemsByKeywordsResponse[0]
        let searchResult = dollObject.searchResult[0]
        let item = searchResult.item
        console.log("search: ", searchResult)

        for (var i = 0; i < item.length; i++) {
          let current = item[i]
          let idNumber = current.itemId[0]
          let title = current.title[0]
          let itemURL = current.viewItemURL[0]
          // console.log('url: ', itemURL)
          // .then(
          $.ajax({
            method: 'get',
            url: `http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=${idNumber}&IncludeSelector=Description,ItemSpecifics`,
            dataType: 'json',
            success: function(data) {
              // console.log("Descriptions data: ", data)
              let description = data.Item.Description
              // console.log('description: ', description)
              $.ajax('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-06-01&tones=emotion', {
                method: 'POST',
                headers: {
                  'Authorization': 'Basic OWYxMDM5YTItYTVjZS00NjNkLTk2YzgtMDcyZmNhMTEyN2FhOlBrbEFqTzhTcUlwWg==',
                  'Content-Type': 'text/plain'
                },
                data: {
                  text: description
                },
                success: function(result) {
                  console.log("Watson emotions data: ", result);
                }
              })
            }
          })
        }

      },
      error: function(err) {
        console.log(err);
      }
    })
  }
  render() {
    // let recent = this.state.recentDolls
    // let dollsList = recent.map(function(dollsDisplay) {
    //   return <img src={dollsDisplay.searchResult.galleryURL} width="100%" className="doll-pics" alt="doll-pics"/>
    // })
    return (
      <div className='doll-collection'>
        <div className="text-center" onClick={this.selectDoll}></div>
        <br/>
      </div>
    )
  }
}
export default Dolls

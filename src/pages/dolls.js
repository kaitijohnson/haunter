import React, {Component} from 'react'
import $ from 'jquery'

class Dolls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDolls: []
    }
    // this.selectDoll = this.selectDoll.bind(this)
  }

  // selectDoll(e) {
  //   if (e.target.src) {
  //     $('#doll').attr('src', e.target.src)
  //   }
  // }

  componentDidMount() {
    let recentDolls = []

    $.ajax({
      method: 'get',
      url: `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=haunted%20doll&paginationInput.entriesPerPage=2&paginationInput.pageNumber=2`,
      dataType: 'json',
      success: function(data) {
        // console.log("Dolls data: ", data)
        let dollObject = data.findItemsByKeywordsResponse[0]
        let searchResult = dollObject.searchResult[0]
        let item = searchResult.item
        // console.log("search: ", searchResult)

        for (var i = 0; i < item.length; i++) {
          let current = item[i]
          let idNumber = current.itemId[0]
          let title = current.title[0]
          let itemURL = current.viewItemURL[0]
          let imgURL = current.galleryURL[0]
          // console.log('image: ', imgURL)
          // pic.push(imgURL)
          // .then(
          $.ajax({
            method: 'get',
            url: `http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=${idNumber}&IncludeSelector=Description,ItemSpecifics`,
            dataType: 'json',
            success: function(data) {
              // console.log("Descriptions data: ", data)
              let description = data.Item.Description
              // console.log('description: ', description)
              // $.ajax('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-06-01&tones=emotion', {
              //   method: 'POST',
              //   headers: {
              //     'Authorization': 'Basic OWYxMDM5YTItYTVjZS00NjNkLTk2YzgtMDcyZmNhMTEyN2FhOlBrbEFqTzhTcUlwWg==',
              //     'Content-Type': 'text/plain'
              //   },
              //   data: {
              //     text: description
              //   },
              //   success: function(result) {
              //     let emotions = result

                  recentDolls.push({
                    name: title,
                    pic: imgURL,
                    source: itemURL,
                    info: description
                    // sentiment: emotions
                  })
                  console.log("return data: ", recentDolls);
                  return recentDolls
                }
              })
            // }
          // })
        }

      },
      error: function(err) {
        console.log(err);
      }
    })
    .then((dollArray) => {
      this.setState({
        currentDolls: recentDolls
      })
    })
  }
  render() {
    let dolls = this.state.currentDolls
  //    function dollsList(){ for(var item in dolls) {
  //     item.map(function(dollsDisplay) {
  //       return <img src={dollsDisplay['pic']} width="100%" className="doll-pics" alt="doll-pics"/>
  //     })
  //   }
  // }
    let dollsList = dolls.map(function(dollsDisplay) {
      return <div> <img src={dollsDisplay['pic']} width="100%" className="doll-pics" alt="doll pics"/> <span>{dollsDisplay['name']}</span> </div>
    })
    return (
      <div className='doll-collection'>
        <div>
        {dollsList}
        </div>
      </div>
    )
  }
}
export default Dolls

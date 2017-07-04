import React, {Component} from 'react'
import $ from 'jquery'

class Dolls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDolls: []
    }
<<<<<<< HEAD
    // this.secondAjax = this.secondAjax.bind(this)
=======
>>>>>>> 4ca980257759796e247257d848c7ff811c5623ac
    // this.selectDoll = this.selectDoll.bind(this)
  }

  // selectDoll(e) {
  //   if (e.target.src) {
  //     $('#doll').attr('src', e.target.src)
  //   }
  // }

<<<<<<< HEAD
  componentWillMount() {
    console.log(this.state);
    var recentDolls = [];
    function secondAjax(allDolls) {
      return Promise.all(allDolls.map(function(doll) {
        var idNumber = doll.itemId[0];
        return $.ajax({
          method: 'get',
          url: `http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=${idNumber}&IncludeSelector=Description`,
          dataType: 'json',
          success: function(data) {},
          error: function(err) {
            console.log(err);
          }
        }).then(function(data) {
          return data.Item.Description;
        })
      }))
    }
    function thirdAjax(descriptions) {
      return Promise.all(descriptions.map(function(desc) {
        return $.ajax('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-06-01&tones=emotion', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic NTIyYjE1MmYtMDBmZS00MmI0LWI1YTctNDQyYzM2MmQ0ZWZlOmNsdUdVOFFEUXJLWQ==',
            'Content-Type': 'text/plain'
          },
          data: {
            text: desc
          },
          success: function(result) {
            // console.log("Watson emotions data: ", result);
          },
          error: function(err) {
            console.log(err);
          }
        }).then(function(result) {
          return result.document_tone.tone_categories[0].tones;
        })
      }))
    }
    function makeTheDolls(dollsArray, descriptions, emotions) {
      // console.log(dollsArray, descriptions, emotions);
      var dasDolls = [];
      return Promise.all(dollsArray.map(function(doll, index) {
        dasDolls.push({name: doll.title[0], description: descriptions[index], pic: doll.galleryURL[0], listing: doll.viewItemURL[0], sentiment: emotions[index]})
      })).then((thing) => {
        return dasDolls;
      })
    }
=======
  componentDidMount() {
    let recentDolls = []

>>>>>>> 4ca980257759796e247257d848c7ff811c5623ac
    $.ajax({
      method: 'get',
      url: `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=haunted%20doll&paginationInput.entriesPerPage=2&paginationInput.pageNumber=2`,
      dataType: 'json',
      success: function(data) {
<<<<<<< HEAD
        let allDolls = data.findItemsByKeywordsResponse[0].searchResult[0].item
=======
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

>>>>>>> 4ca980257759796e247257d848c7ff811c5623ac
      },
      error: function(err) {
        console.log(err);
      }
    }).then((dollsArray) => {
      let allDolls = dollsArray.findItemsByKeywordsResponse[0].searchResult[0].item;
      // console.log('das dolls', allDolls);
      return Promise.all([secondAjax(allDolls)]).then(function(descriptions) {
        // console.log('hella descriptions', descriptions);
        return Promise.all([thirdAjax(descriptions[0])]).then(function(emotions) {
          // console.log('hella analysis', emotions);
          return Promise.all([makeTheDolls(allDolls, descriptions[0], emotions[0])]).then(function(dasDolls) {
            return dasDolls[0];
          })
        })
      })
    }).then((idiot) => {
      this.setState({currentDolls:idiot})
    })
    .then((dollArray) => {
      this.setState({
        currentDolls: recentDolls
      })
    })
  }

  render() {
<<<<<<< HEAD
    let dollsList = this.state.currentDolls.map(function(doll, index){
      console.log(doll)
      return(
        <div key={index}>
          <img src={doll.pic}/>
          <h5>{doll.name}</h5>
          <a href={doll.listing}>ebay listing</a>
        </div>
      )
    })
    return (
      <div className='doll-collection'>
        <div className="text-center"></div>
        {dollsList}
        <br/>
=======
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
>>>>>>> 4ca980257759796e247257d848c7ff811c5623ac
      </div>
    )
  }

}
export default Dolls

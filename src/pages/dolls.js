import React, {Component} from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import ReactBootstrap from 'react-bootstrap'
import Slider from 'react-slick'
import ghost from '../style/Tinder-Ghost.png';
// var Slider = require('react-slick');


class Dolls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDolls: []
    }
    // this.secondAjax = this.secondAjax.bind(this)
    // this.selectDoll = this.selectDoll.bind(this)
  }

  // selectDoll(e) {
  //   if (e.target.src) {
  //     $('#doll').attr('src', e.target.src)
  //   }
  // }

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
    $.ajax({
      method: 'get',
      url: `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=haunted%20doll&paginationInput.entriesPerPage=3&paginationInput.pageNumber=2`,
      dataType: 'json',
      success: function(data) {
        let allDolls = data.findItemsByKeywordsResponse[0].searchResult[0].item
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
  }

  render () {
    // let dolls = this.state.currentDolls
    var settings = {
      dots: false,
      arrows: false,
      swipe: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log('CURRENT', this.state.currentDolls);
    let dollsList = this.state.currentDolls.map(function(doll, index){
      console.log('PIIIIC', doll.pic)
      return(
        <div key={index}>
          <img src={doll.pic} alt="doll" />
        </div>
      )
    // }
    })
    console.log('dollsARR', dollsList);
    return (
      <div>
      <Slider {...settings}>
        <div><p>searching the other side...
        <img src={ghost} className="ghost2" />
        </p></div>
        {dollsList}
      </Slider>
      </div>
    )
  }
}
export default Dolls

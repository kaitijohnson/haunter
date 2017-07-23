import React, {Component} from 'react'
import $ from 'jquery'
import Slider from 'react-slick'
import ghost from '../style/Tinder-Ghost.png';


class Dolls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDolls: []
    }
  }

  componentWillMount() {
    console.log(this.state);
    var recentDolls = [];
    function secondAjax(allDolls) {
      return Promise.all(allDolls.map(function(doll) {
        var idNumber = doll.itemId[0];
        return $.ajax({
          method: 'get',
          crossDomain: true,
          url: `https://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSONP&appid=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&siteid=0&version=967&ItemID=${idNumber}&IncludeSelector=Description`,
          dataType: 'jsonp',
          success: function(data) {},
          error: function(err) {
            console.log(err);
          }
        }).then(function(data) {
          console.log("ebay2: ", data)
          return {pic: data.Item.PictureURL[0], description: data.Item.Description}
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
      return Promise.all(dollsArray.map(function(doll, index){
        dasDolls.push({name: doll.title[0], description: descriptions[index].description, pic: descriptions[index].pic, listing: doll.viewItemURL[0], sentiment: emotions[index]})
      })).then((thing) => {
        return dasDolls;
      })
    }
    $.ajax({
      method: 'get',
      url: `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY-APPNAME=KaitiJoh-Haunter-PRD-cb7edec1b-16a9a9e8&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=haunted%20doll&paginationInput.entriesPerPage=3&paginationInput.pageNumber=1`,
      dataType: 'jsonp',
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
        console.log('hella descriptions', descriptions);
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
    console.log("doll data: ", this.state.currentDolls)
    var settings = {
      dots: false,
      arrows: false,
      swipe: true,
      useCSS: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let dollsList = this.state.currentDolls.map(function(doll, index){
      let matchScore;
       if(Math.round(doll.sentiment[3].score/0.000095) > 99) {
         matchScore = 100
       } else {
         matchScore = Math.round(doll.sentiment[3].score/0.000095)
       }
      return(
        <div key={index + 3}>
        <h2>{matchScore}% match</h2>
          <p>{doll.name}<img src={doll.pic} alt="doll" className="slide"/></p>
          <button type="button" className="btn btn-outline-primary survey-btn"><a href={doll.listing}>Buy</a></button>
          <div>{doll.description}</div>
        </div>
      )
    // }
    })
    console.log('dollsARR', dollsList);
    return (
      <div>
      <Slider {...settings}>
        <div id="load"><p className="large-p">searching the other side...</p>
        <img src={ghost} alt="floating ghost" className="ghost2" /><br /><br />
        <p className="see-results">Swipe left to see matches!
        </p></div>
        <div key='1'>
        <h2>57% match</h2>
          <p>JEDEL soul vessel, haunted doll, MALEVOLENT ΑΤΤΑCKING spirit<img src="http://i.ebayimg.com/images/g/A3cAAOSwAANY5Bbj/s-l1600.jpg" alt="doll" className="slide"/></p>
          <button type="button" className="btn btn-outline-primary survey-btn"><a href="http://www.ebay.com/itm/JEDEL-soul-vessel-haunted-doll-MALEVOLENT-CKING-spirit-/172633114219?hash=item2831bc466b:g:JHgAAOSwTM5Y5Bbp">Buy</a></button>
          <div>Jedel is one of the pieces of my collection that I would rate with a "red flag". The spirit residing this doll actually enjoys tormenting the living. A combination of envy and a will to take -what he thinks is- revenge for suffering an unfair and traumatizing death, urge him/her (the spirit's sex is not clear to me) to interact with our world.<br /><br />

          I believe that he/she is strong, because it is not common or easy at all, to gather the energy required to move objects in the material world when you are deceased, and that is why this does not happen so often. He is not attacking everyone, but there are some visitors he REALLY doesn't like. And we know that the lowest of the spiritual beings are attracted by light, but when there is too much for them, they can also react violently.<br /><br />

          He/she has been so hostile to one specific friend of mine, that she doesn't come to visit me in the house anymore and she prefers me to meet her outside. She described the feeling mostly like a headache, but it was like a strong pressure coming from the outside, pushing her forehead. I knew it was the spirit inside Jedel, as he had slightly turned his head towards the room where we were sitting with my friend. That was when I removed the doll's shirt, in order to observe these movements and allow him/her to do it easier.<br /><br />

          At least, he/she respects me and never caused me any harm, but in any case this doll is dangerous to have in the house if you are not experienced, so please take him only if you know how to handle him. If you are a particularly empathic individual, please think this through as this spirit might be hostile.<br /><br />


          I decided to create this account, with the help of my beloved niece who has also helped me with the photos and the translation, in order to let some of my precious dolls carry on and meet their destiny. As I have a vast collection of soul carrying objects, it is hard for me to provide my undivided attention to some of the pieces that require it most. Although it is hurtful to see them go, as I aquired them one by one through years of experience, it feels like the right thing to do.<br /><br />

          It feels so strange to have to evaluate my special dolls for money, so I decided to put this symbolic price in order to make sure that they end up in the hands of serious collectors only, and not someone who makes fun of such things. Please bid only if you are serious.<br /><br />

          (I am obliged to mention that this object is for entertaining purposes only)</div>
        </div>
        <div key='2'>
        <h2>74% match</h2>
          <p>Active Psychic Paranormal Metaphysical Spirits Haunted EVP Porcelain Spirit Doll<img src="http://i.ebayimg.com/images/g/Qq0AAOSwceNZTAuu/s-l1600.jpg" alt="doll" className="slide"/></p>
          <button type="button" className="btn btn-outline-primary survey-btn"><a href="http://www.ebay.com/itm/JEDEL-soul-vessel-haunted-doll-MALEVOLENT-CKING-spirit-/172633114219?hash=item2831bc466b:g:JHgAAOSwTM5Y5Bbp">Buy</a></button>
          <div>This vessel carries the spirit of Emma. Emma communicated to me that she suddenly passed away in an auto accident at the tender age of 8. While her journey here on Earth was cut short, she continues to impact the lives of others from the other side.<br /><br />

          She radiates peace and love and provides solace to those she comes in contact with. She likes to communicate during meditation and dream-time, but has also responded to pendulum and EVP. Her ability to communicate has grown stronger since welcoming her into our home. <br /><br />

          While Emma has been a valuable member of our family, she's told me that it's time for her to move on. She would love to be welcomed into a loving family, who treats her with the love and attention she deserves. Thank you and blessed be!<br /><br />

          NOTE: eBay's policy states I am not allowed to sell intangible items, so I am selling this strictly as a doll and the story is for entertainment purposes only. Buyer is completely responsible for any activity that may or may not happen as a result of owning this doll.
        </div>
        </div>
        {dollsList}
      </Slider>
      </div>
    )
  }
}
export default Dolls

import React, {Component} from 'react'
import $ from 'jquery'

var sampleDescription = "I am required as per eBays policy on the paranormal to indicate that eBay forbids the sale of intangible items and this listing is for ONLY A TANGIBLE DOLL with NO promise of spirit attached. eBay me to say that this is all for ENTERTAINMENT PURPOSES ONLY. I have aquired lots of very special and active dolls from the estate of a VERY POWERFUL witch.She was a dear friend of mine who left them to me because she knows I will send them to their homes.Oh my what can I say about him..So much and so hard to put into words.Let me see if I can sum it all up... Joshuas parents knew at a very young age that he was different from the other kids. In school Josh was very recluse and to himself. When any kid tried to befriend him they got scared and never went near him again.  One time a teacher told a kid he had to be science partners with Josh and the kid urinated in his pants and ran. The teachers really started noticing things too. When it was time to dissect a frog Joshua was very interested.  As they said ... That was the only thing that he had ever been interested in. Two days later his parents came home to find their dog and two cats dissected! He was 12 years old. They tried to forget about it and act like nothing happened. .. They continued for 3 years to try to forget about things that he continued to do and act like nothing happened. That was a very bad mistake..One night when Joshua was 15 he dissected his parents.Then walked away proud of himself.He walked for 8 hours until he saw a carnivel.Josh was so amazed at everything he saw.You see what I failed to mention earlier is that Joshua was born without a nose.He got picked on for years until finally he couldnt take it. The kids were scared of him because he cut off a cats nose in front of them and told them they were next. Anyway when he got to the carnival he saw people stranger then him.The owner asked him to join and he gladly accepted.Joshua found peacefor about 5 years before the cravings started.He couldnt control them and at every few stops found someone with the perfect nose. He would start there and continue as he was taught in science class. Josh continued like this for 52 years before he died from cancer. Nobody has ever found the bodies.He still in the afterlife won 't tell of what he did with them. Joshua is Evil.I can 't have him around my home. He is very disturbed and causes too much chaos! Buyer beware. .. I dont know what will happen...He said to tell the new owner Welcome To The Dark Carnival he said that they will know";

class Personality extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sample: sampleDescription
    }
  }

  componentDidMount() {
    $.ajax('https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-06-01&tones=emotion',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic OWYxMDM5YTItYTVjZS00NjNkLTk2YzgtMDcyZmNhMTEyN2FhOlBrbEFqTzhTcUlwWg==',
        'Content-Type': 'text/plain'
      },
      data: {
        text: sampleDescription
      },
      success: function(result) {
        console.log("Watson emotions data: ", result);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }

    render() {
      return (
        <div className="collection">
          <div className="text-center"></div>
          <br/>
        </div>
      )
    }

}

export default Personality

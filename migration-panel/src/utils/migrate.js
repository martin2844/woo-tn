import axios from 'axios';

const migrate = async (items, user, setProgress) => {
    try {
        if(!items.length) {
            throw "cant start migration without items"
        }
        let promises = []
        let progressFraction = 100 / items.length
        items.forEach((item) => {
                //Do the promises stuff
                promises.push(axios.get("/api/woo/panel/delay"))
        })

        promises.forEach(async (p, i) => {
               await p.then(() => {
                    console.log("resolving promises")
                    let newProgress = Math.ceil(progressFraction * (i + 1))
                    if(newProgress > 100) newProgress = 100;
                    setProgress(newProgress);
                })
                if((i + 1) === items.length) {
                    console.log("done")
                }
        })
         
       
    } catch (error) {
        console.log(error);
    }
  
}


export default migrate
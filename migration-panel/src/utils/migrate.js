import axios from 'axios';
import tnItem from './tnItem';

const migrate = async (items, user, progress, setProgress) => {
    try {
        if(!items.length) {
            throw "cant start migration without items"
        }
        let promises = []
        let counter = 0;
        let progressFraction = 100 / items.length
        items.forEach((item) => {
                //Do the promises stuff
                console.log(item);
                let TiendaNubeItem = tnItem(item);
                console.log(TiendaNubeItem);
                promises.push(axios.post(`/api/woo/panel/migrate?user_id=${user.user_id}`, TiendaNubeItem))
                //promises.push(axios.get("/api/woo/panel/delay"))
        })

        promises.forEach(async (p, i) => {
            try {
                await p.then(() => {
                    let newProgress = Math.ceil(progressFraction * (counter + 1));
                    if(newProgress > 100) {
                        newProgress = 100;  
                    } 
                    setProgress(newProgress);
                })
                counter++;
            } catch (error) {
                console.log(error);
            }
 
        })

        Promise.allSettled(promises).then(() => {
            setTimeout(() => {
                setProgress(100);
            }, 1000)
        })
         
       
    } catch (error) {
        console.log(error);
    }
  
}


export default migrate
import React,{useState,useEffect} from 'react'
import axios from 'axios'






function Livestock() {

    const[fno,setfno] = useState([]);

    let options = {
        method: 'GET',
        url: 'https://latest-stock-price.p.rapidapi.com/any',
        headers: {
          'x-rapidapi-key': '9fed4c07d4msh86b0119a0d59401p16dcc5jsnfddafeb10df8',
          'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com'
        }
      };


    useEffect(()=>{
        //console.log(monthval.monthVal);
        axios.request(options).then(response=>{

            console.log(response.data)
            setfno(response.data);
            console.log(fno);
        }) 
            //
            //
            //console.log(response.data);
            //
            //console.log(monthval.monthVal);
            
        })

    

    return (
        <div>
        <div>
        <table striped bordered hover variant="dark">
                <th>Stock</th>
                <th>Change</th>
                <th>Percent Change</th>
                <th>High</th>
                <th>Low</th>
                <th>LTP</th>
                {fno.map(x=><tr>
                       <td>{x.symbol}</td>
                       <td>{x.change}</td>
                       <td>{x.pChange}</td>
                       <td>{x.dayHigh}</td>
                       <td>{x.dayLow}</td>
                       <td>{x.lastPrice}</td>
                       </tr>)}
                
            </table>
            </div>
     </div>
    )
}

export default Livestock

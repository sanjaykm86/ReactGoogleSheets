import React,{useState} from 'react'
import axios from 'axios'
import {GoogleSpreadsheet} from 'google-spreadsheet'
import Table from 'react-bootstrap/Table'


const creds = require('./client_secret.json')


 
async function Spreadsheet() {
    const [NR7, setNR7] = useState([
        {
          'stock':'',
          'pdayHigh':0,
          'pdayLow':0,
          'ltp':0,
          'high':0,
          'low':0
        }  
      ])

      let nr7bucket = [
        {
          'stock':'',
          'pdayHigh':0,
          'pdayLow':0,
          'ltp':0,
          'high':0,
          'low':0
        }  
      ]

      

    const doc = new GoogleSpreadsheet('1-s0On7zt7eTrXXOsKqHOJdm2sPzY0gy8L0mVH-EgA4Q');
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
      client_id : creds.client_id,
      access_type : creds.access_type
    }).catch(err=>{console.log(err)})

    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id]
  
    (await sheet.getRows()).forEach(row=>{
      if(row['NR7']=='NR7')
      {
        
        if(row.TRIGGERED =="NOT TRIGGERED")
        {
          let stock = row.STOCK
          let pdayHigh = row['T-1 HIGH']
          let pdayLow = row['T-1 LOW']
          let ltp = 0
          let high = 0
          let low = 0
         
          var options = {
            method: 'GET',
            url: 'https://latest-stock-price.p.rapidapi.com/any',
            headers: {
              'x-rapidapi-key': '9fed4c07d4msh86b0119a0d59401p16dcc5jsnfddafeb10df8',
              'x-rapidapi-host': 'latest-stock-price.p.rapidapi.com'
            }
          };

          axios.request(options).then(function (response) {
            //console.log("Stock is :"+stock)
            var result = response.data.find(a=>a.symbol == stock)
            //console.log(result)
            ltp = result.lastPrice
            high = result.dayHigh 
            low = result.dayLow
            //console.log(ltp)

            let nr7 = {
                'stock':stock,
                'pdayHigh':pdayHigh,
                'pdayLow':pdayLow,
                'ltp':ltp,
                'high':high,
                'low':low
              }
            

           

            //console.log(nr7)
  
            nr7bucket.push(nr7)
            NR7.push(nr7)

            //console.log(nr7bucket)
            
            //console.log(NR7)
          //console.log(response.data.any(a=>a.symbol=="INFY"));
        }).catch(function (error) {
          console.error(error);
        });

        
    }
    
        
}

//console.log(nr7bucket)
// this.setState({
//     NR7: nr7bucket
//   });

console.log(NR7)
  
})
//console.log(nr7bucket)



    return (
        <div>
            <div>
            <Table striped bordered hover variant="dark">
                   <th>Stock</th>
                   <th>PDayHigh</th>
                   <th>PDayLow</th>
                   <th>High</th>
                   <th>Low</th>
                   <th>LTP</th>
                   {NR7.map(x=><tr>
                       <td key={x.stock}>{x.stock}</td>
                       <td key={x.stock}>{x.pdayHigh}</td>
                       <td key={x.stock}>{x.pdayLow}</td>
                       <td key={x.stock}>{x.high}</td>
                       <td key={x.stock}>{x.low}</td>
                       <td key={x.stock}>{x.ltp}</td>
                       </tr>)}
                   
               </Table>
               </div>
            
            
        </div>
    )
}

export default Spreadsheet

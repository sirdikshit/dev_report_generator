import PDFDocument from 'pdfkit';
// import bitcoinCommitsChart from '../Chart Generation/bitcoinCommitsChart.js';
import commitData from '../Chart Generation/commitData.js';
import cryptoChart from '../Chart Generation/cryptoChart.js';
import devChart from '../Chart Generation/devChart.js';

const page6 = async (doc,ethereumActiveDev) => {
    doc
    .addPage()
    .font('Helvetica')
    .fontSize(20)
    .text('Ethereum Weekly Active Developers', {
        align:'left'
    });

    // const buff = await bitcoinCommitsChart(bitcoinRaw);
    const buff = await devChart(ethereumActiveDev,"Ethereum","Active Developers Trends","#Active Developers");
    doc
    .moveDown(3)
    .image(buff, {
        width:500, // 500
        height:300, // 300
        align: 'left',
        valign: 'center'
      });
    
      var maxDev = 0,minDev = Number.MAX_VALUE;
      var maxDevWeek,minDevWeek;
      var week;
      var avDev = 0;

      for(var i = 0;i < Object.keys(ethereumActiveDev).length-1;i++){
        week = Object.keys(ethereumActiveDev)[i];
        // if(new Date(week*1000).getM == new Date()) continue;
        avDev += ethereumActiveDev[week];
        if(ethereumActiveDev[week] > maxDev){
            maxDevWeek = week;
            maxDev = ethereumActiveDev[week];
        }
        if(ethereumActiveDev[week] < minDev){
            minDevWeek = week;
            minDev = ethereumActiveDev[week];
        }
    }

    avDev /= 51;
    avDev = avDev.toFixed(1);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      const points = [];
      points.push(`${maxDev} developers were active in the week of ${new Date(maxDevWeek*1000).toLocaleDateString("en-US", options)} which is the maximum of all weeks`);
      points.push(`${minDev} developers were active in the week of ${new Date(minDevWeek*1000).toLocaleDateString("en-US", options)} which is the least among all weeks`);
      points.push(`The Average weekly active depelopers for the last year was ${avDev}`);
      doc
      .fontSize(18)
      .moveDown(1)
      .text("Key Points from Bitcoin Active Developers count for the last 12 months")
      .moveDown(1)
      .fontSize(15)
      .list(points);
}

export default page6;
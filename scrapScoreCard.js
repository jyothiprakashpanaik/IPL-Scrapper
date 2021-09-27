const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const xlsx = require('xlsx');

// let teamName = {
//     ""
// }

function scrapScoreCard (url,match) {
	request(url,scrap);
	function scrap(err,res,html) {
		if(err){
			console.log(err);
		}
		else{
			const $ = cheerio.load(html);
			let inningArr = $('.card.content-block.match-scorecard-table>.Collapsible');
            match = match.split('-').splice(-2).join('-');
            console.log(match);
            let newWB = xlsx.utils.book_new();
			for(let i=0;i<inningArr.length;i++){
				 let tableBody = $(inningArr[i]).find("table");
                 let tableFooter = tableBody.find('tfoot>tr>td');
                 let Data = [$(tableFooter[0]).text().trim(),$(tableFooter[1]).text().trim(),$(tableFooter[2]).text().trim()];
                 // scrap batsman	
				 let batsmanTable = $(tableBody[0]).find("tbody");
				 let batsmanData = scrapBatsmanTable(batsmanTable,$);
                 let newWSBt = xlsx.utils.json_to_sheet(batsmanData);
                 xlsx.utils.book_append_sheet(newWB,newWSBt,match+'-i-'+(i+1)+'-bat');
				 // scrap bowlers
				 let bowlersTable = $(tableBody[1]).find("tbody");
				 let bowlersData = scrapBowlersTable(bowlersTable,$);
                 let newWSBo = xlsx.utils.json_to_sheet(bowlersData);
                 xlsx.utils.book_append_sheet(newWB,newWSBo,match+'-i-'+(i+1)+'-bowl');
			}
            if(fs.existsSync('./result')==false){
                fs.mkdirSync('result');
            }
            let path = "./result/"+match+".xlsx";
            xlsx.writeFile(newWB,path);
	    }
	}
}


function scrapBatsmanTable(batsmanTable,$) {
	let allplayers = $(batsmanTable).find('tr');
	let playerData = [];
    for (let i = 0; i < allplayers.length-1; i++) {
        let allColsofPlayer = $(allplayers[i]).find("td");
        let Name = $(allColsofPlayer[0]).text().trim();
        let Status = $(allColsofPlayer[1]).text().trim();
        let Runs =  $(allColsofPlayer[2]).text().trim();
        let Balls =  $(allColsofPlayer[3]).text().trim();
        let s4 =  $(allColsofPlayer[4]).text().trim();
        let s6 =  $(allColsofPlayer[5]).text().trim();
        let Sr =  $(allColsofPlayer[6]).text().trim();
        if (Name != "") {
            playerData.push({ 
                "name": Name,
                "status":Status,
                "runs":Runs,
                "balls":Balls,
                "4's":s4,
                "6's":s6,
                "SR":Sr
            });
        }
    }
    // console.log(playerData);
    return playerData;
}

function scrapBowlersTable(bowlersTable,$) {
	let allplayers = $(bowlersTable).find('tr');
	let playerData = [];
    for (let i = 0; i < allplayers.length-1; i++) {
        let allColsofPlayer = $(allplayers[i]).find("td");
        let Name = $(allColsofPlayer[0]).text().trim();
        let Overs = $(allColsofPlayer[1]).text().trim();
        let Madein =  $(allColsofPlayer[2]).text().trim();
        let Runs =  $(allColsofPlayer[3]).text().trim();
        let Wickets =  $(allColsofPlayer[4]).text().trim();
        let Econ =  $(allColsofPlayer[5]).text().trim();
        let s0 =  $(allColsofPlayer[6]).text().trim();
        let s4 = $(allColsofPlayer[7]).text().trim();
        let s6 = $(allColsofPlayer[8]).text().trim();
        let WD = $(allColsofPlayer[9]).text().trim();
        let NB = $(allColsofPlayer[10]).text().trim(); 
        if (Name != "") {
            playerData.push({ 
                "name": Name,
                "over": Overs,
                "maiden": Madein,
                "econ": Econ,
                "0's": s0,
                "4's": s4,
                "6's": s6,
                "WD": WD,
                "NB": NB
            });
        }
    }
    // console.log(playerData);
    return playerData;
}

module.exports = {
	ScoreCardFn: scrapScoreCard
}
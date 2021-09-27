const request = require('request');
const cheerio = require('cheerio');
const scrapScoreCardObj = require('./scrapScoreCard');
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,scrap);

function scrap(err,res,html){
	if(err){
		console.log(err);
	}
	else{
		const $ = cheerio.load(html);
		let contestHtml = $('.card.content-block.league-scores-container');
		let scoreCard = contestHtml.find('.card.content-block.league-scores-container .match-cta-container>[data-hover="Scorecard"]');
		for(let i=0;i<scoreCard.length;i++){
			let href = $(scoreCard[i]).attr('href');
			let match  = href.split('/')[3];
			let scoreCardLink = `https://www.espncricinfo.com${href}`;
			scrapScoreCardObj.ScoreCardFn(scoreCardLink,match);
		}
	}
}
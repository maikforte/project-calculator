const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://monstersuperleague.fandom.com/wiki/Gems#1_Star";

const gems = {
    "HP_FLAT": {},
    "ATTK_FLAT": {},
    "DEF_FLAT": {},
    "REC_FLAT": {},
    "HP_PERCENT": {},
    "ATTK_PERCENT": {},
    "DEF_PERCENT": {},
    "REC_PERCENT": {},
    "CD_PERCENT": {},
    "RES_PERCENT": {},
    "CR_PERCENT": {},
};

const fetchData = async (url) => {
    console.log(`Crawling ${url}`);
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }

    return response;
}

fetchData(url).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);

    const tabs = $(".tabber.wds-tabber > .wds-tab__content");

    tabs.each(function(star) {
        star += 1;

        const tableRows = $(this).find(".wds-tab__content > .wikitable > tbody > tr");

        tableRows.each(function(plusIndex) {
            if (plusIndex === 0) {
                return;
            }
    
            const content = $(this).find("td");
    
            content.each(function(attributeIndex) {
                const value = $(this).text().replace("\n", "");

                if (attributeIndex === 1) {
                    if (!gems.HP_FLAT[star]) {
                        gems.HP_FLAT[star] = {}
                    }

                    gems.HP_FLAT[star][plusIndex - 1] = parseInt(value);

                } else if (attributeIndex === 2) {
                    if (!gems.ATTK_FLAT[star]
                        && !gems.DEF_FLAT[star]
                        && !gems.REC_FLAT[star]) {

                        gems.ATTK_FLAT[star] = {};
                        gems.DEF_FLAT[star] = {};
                        gems.REC_FLAT[star] = {};
                    }

                    gems.ATTK_FLAT[star][plusIndex - 1] = parseInt(value);
                    gems.DEF_FLAT[star][plusIndex - 1] = parseInt(value);
                    gems.REC_FLAT[star][plusIndex - 1] = parseInt(value);
                }

                if (star === 6) {
                    if (attributeIndex === 3) {

                        if (!gems.CD_PERCENT[star]) {
                            gems.CD_PERCENT[star] = {};
                        }

                        gems.CD_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));

                    } else if (attributeIndex === 4) {
                        if (!gems.HP_PERCENT[star]
                            && !gems.ATTK_PERCENT[star]
                            && !gems.DEF_PERCENT[star]
                            && !gems.REC_PERCENT[star]) {

                            gems.HP_PERCENT[star] = {};
                            gems.ATTK_PERCENT[star] = {};
                            gems.DEF_PERCENT[star] = {};
                            gems.REC_PERCENT[star] = {};
                        }

                        gems.HP_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.ATTK_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.DEF_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.REC_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                    } else if (attributeIndex === 5) {

                        if (!gems.RES_PERCENT[star]) {
                            gems.RES_PERCENT[star] = {};
                        }
    
                        gems.RES_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));

                    } else if (attributeIndex === 6) {

                        if (!gems.CR_PERCENT[star]) {
                            gems.CR_PERCENT[star] = {};
                        }
    
                        gems.CR_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));

                    }
                } else {
                    if (attributeIndex === 3) {
                        
                            if (!gems.HP_PERCENT[star]
                                && !gems.ATTK_PERCENT[star]
                                && !gems.DEF_PERCENT[star]
                                && !gems.REC_PERCENT[star]
                                && !gems.CD_PERCENT[star]) {
    
                                gems.HP_PERCENT[star] = {};
                                gems.ATTK_PERCENT[star] = {};
                                gems.DEF_PERCENT[star] = {};
                                gems.REC_PERCENT[star] = {};
                                gems.CD_PERCENT[star] = {};
                            }
    
                        gems.HP_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.ATTK_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.DEF_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.REC_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                        gems.CD_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
    
                    } else if (attributeIndex === 4) {
                        
                        if (!gems.RES_PERCENT[star]) {
                            gems.RES_PERCENT[star] = {};
                        }
    
                        gems.RES_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));

                    } else if (attributeIndex === 5) {
                        
                        if (!gems.CR_PERCENT[star]) {
                            gems.CR_PERCENT[star] = {};
                        }
    
                        gems.CR_PERCENT[star][plusIndex - 1] = parseFloat(value.replace("%", ""));
                    }
                }
            });
        });
    });

    var jsonData = JSON.stringify(gems);

    var fs = require('fs');
    fs.writeFile("gems.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });

    console.log('Charan!');

})
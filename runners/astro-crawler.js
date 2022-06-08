const CONSTANTS = require('../src/config/constants.json');
const DEFAULT_STATS = require('./default_stats.json');
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://monstersuperleague.fandom.com/wiki/Category:Astromons";
const baseUrl = "https://monstersuperleague.fandom.com";
const IS_TEST = true;
const MAX_TEST_ASTROMON = 10;

let monsterUrls = [];
const astromons = [];
const ASTROMON_ELEMENTS = [
    CONSTANTS.ELEMENTS.FIRE,
    CONSTANTS.ELEMENTS.WATER,
    CONSTANTS.ELEMENTS.WOOD,
    CONSTANTS.ELEMENTS.LIGHT,
    CONSTANTS.ELEMENTS.DARK,
]

let test = {
    "Fire": {}
}

const fetchData = async (url) => {
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }

    return response;
}

const crawlData = async (url) => {
    const astromonUrl = `${baseUrl}${url}`;
    res = await fetchData(astromonUrl);

    html = res.data;
    $ = cheerio.load(html);

    const astromon = {
        name: null,
        leader_skill: null
    };

    let astromonElements = [];

    astromon["name"] = $("#firstHeading").text().trim();
    const leaderSkillContainer = $('span:contains("Leader Skill")').next().find("> div > div > span");

    leaderSkillContainer.each(function() {
        !astromon["leader_skill"] ? astromon["leader_skill"] = $(this).text().trim() : null;
    });

    const tabContainer = $("table > tbody > tr > td > .tabber.wds-tabber");

    tabContainer.each(function() {
        const parentTab = $(this);
        const tabs = $(this).find("> div.wds-tabs__wrapper > ul.wds-tabs > li");

        tabs.each(function(elementIndex) {
            const element = $(this).find("div > a").text().trim().toString();
            if (ASTROMON_ELEMENTS.includes(element)) {
                astromon[element] = {
                    skills: {}
                };
                astromonElements.push(element);
            }

            const contents = parentTab.find("> div.wds-tab__content");

            contents.each(function(contentIndex) {
                const innerContent = $(this).find("> div.wds-tabber > div.wds-tab__content");

                innerContent.each(function(innerContentIndex) {
                    // Trivial Info Comes Here

                    const type = $(this).find("> div#summarytop > div > div").text().trim();

                    const namesContainer = $(this).find("> div#summarytop > div > p > b");

                    namesContainer.each(function(nameIndex) {
                        const evoName = $(this).text().trim();
                        nameIndex === 0 ? astromon["evo_1_name"] = evoName : null;
                        nameIndex === 1 ? astromon["evo_2_name"] = evoName : null;
                        nameIndex === 2 ? astromon["evo_3_name"] = evoName : null;
                    });

                    if (type && contentIndex === elementIndex) {
                        astromon[astromonElements[elementIndex]]["type"] = type;
                    }

                    // Skills Comes Here

                    if (innerContentIndex === 0) {
                        const normalSkillContainer = $(this).find("> div#skillcontainer > div#normalskill > div");

                        normalSkillContainer.each(function(normalSkillIndex) {
                            const skillName = $(this).find("> div > div > span").text().trim();

                            if (type && contentIndex === elementIndex) {
                                if (normalSkillIndex === 0) {
                                    astromon[astromonElements[elementIndex]]["skills"]["normal_skill"] = skillName;
                                } else if (normalSkillIndex === 1) {
                                    astromon[astromonElements[elementIndex]]["skills"]["normal_passive"] = skillName;
                                }
                            }
                        });

                        const activeSkillContainer = $(this).find("> div#skillcontainer > div#activeskill > div");

                        activeSkillContainer.each(function(activeSkillIndex) {
                            const skillName = $(this).find("> div > div > span").text().trim();

                            if (type && contentIndex === elementIndex) {
                                if (activeSkillIndex === 0) {
                                    astromon[astromonElements[elementIndex]]["skills"]["active_skill"] = skillName;
                                } else if (activeSkillIndex === 1) {
                                    astromon[astromonElements[elementIndex]]["skills"]["active_passive"] = skillName;
                                }
                            }
                        });
                    }

                    // Stats Comes Here

                    if (innerContentIndex === 1) {
                        const attrs = ["hp", "atk", "def", "rec"];
                        
                        for(let i = 1; i < 4; i ++) {

                            attrs.forEach((attr) => {
                                let attributeContainer = $(this).find(`> div > div.flex-container > div#Evo${i}Stats > div#evo${i}${attr.toUpperCase()} > div , > div > div.flex-container > div#Evo${i}Stats > div#Evo${i}${attr.toUpperCase()} > div`);

                                attributeContainer.each(function(attributeIndex) {
                                    if (contentIndex === elementIndex) {
                                        let val = $(this).text().trim();
                                        val = val === "-" ? 0 : parseInt(val);

                                        astromon[astromonElements[contentIndex]]["stats"] = astromon[astromonElements[contentIndex]]["stats"] || {}
                                        astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`] = astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`] || {}
                                        astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1] = astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1] || {}
                                        astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1][attr] = val;
                                    }
                                });
                            })
                            // let attributeContainer = $(this).find(`> div > div.flex-container > div#Evo${i}Stats > div#evo${i}HP > div`, `> div > div.flex-container > div#Evo${i}Stats > div#Evo${i}HP > div`);

                            // attributeContainer.each(function(attributeIndex) {
                            //     if (contentIndex === elementIndex) {
                            //         let val = $(this).text().trim();
                            //         val = val === "-" ? 0 : parseInt(val);
                            //         astromon[astromonElements[contentIndex]]["stats"] = astromon[astromonElements[contentIndex]]["stats"] || {}
                            //         astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`] = astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`] || {}
                            //         astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1] = astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1] || {}
                            //         astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["hp"] = val;
                            //     }
                            // });
                        }
                    }
                })
            });

        });
    });

    astromons.push(astromon);

    save();
}

const save = () => {
    if (astromons.length == monsterUrls.length) {
        console.log(astromons);

        const jsonData = JSON.stringify(astromons);

        const fs = require('fs');
        fs.writeFile("astromons.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
}

const run = async () => {
    let res = await fetchData(url);
    let html = res.data;
    let $ = cheerio.load(html);

    const astromonTable = $("#astromons-table > tbody > tr");
    const uniqueNames = [];

    astromonTable.each(function() {
        const astromonContent = $(this).find("td");

        astromonContent.each(function(index) {
            if (index === 2) {
                const name = $(this).find("a").text();
                
                const isDuplicate = uniqueNames.includes(name);

                const link = $(this).find("a").attr("href");
                if (link && !link.includes("Special") && !isDuplicate) {
                    uniqueNames.push(name);
                    monsterUrls.push(link);
                }
            }
        });
    });

    if (IS_TEST) {
        monsterUrls = monsterUrls.slice(0, MAX_TEST_ASTROMON + 1);
    }

    monsterUrls.every(async (url) => {
        crawlData(url);
    });
}

run();
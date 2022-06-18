const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const fs = require('fs');
const path = require('path');

const CONSTANTS = require('../src/config/constants.json');
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://monstersuperleague.fandom.com/wiki/Category:Astromons";
const baseUrl = "https://monstersuperleague.fandom.com";
const IS_TEST = false;
const MAX_TEST_ASTROMON = 1;
const STORE_TO_DB = true;
const IS_PURGE = true;
const IS_DOWNLOAD_IMAGES = true;
const ASTROMON_IMAGE_FOLDER = "test";

let monsterUrls = [];
const astromons = [];
const ASTROMON_ELEMENTS = [
    CONSTANTS.ELEMENTS.FIRE,
    CONSTANTS.ELEMENTS.WATER,
    CONSTANTS.ELEMENTS.WOOD,
    CONSTANTS.ELEMENTS.LIGHT,
    CONSTANTS.ELEMENTS.DARK,
]

const fetchData = async (url) => {
    let response = await axios(url).catch((err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }

    return response;
}

// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, downloadFolder, fileName) => {
    // Get the file name
    // const fileName = fileUrl + ".webp";
  
    // The path of the downloaded file on our machine
    const localFilePath = path.resolve(__dirname, downloadFolder, fileName);
    try {
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream',
      });
  
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', () => {
        // console.log('Successfully downloaded file!');
      });
    } catch (err) { 
      throw new Error(err);
    }
};

const crawlData = async (url, index) => {
    const astromonUrl = `${baseUrl}${url}`;
    res = await fetchData(astromonUrl);

    html = res.data;
    $ = cheerio.load(html);

    const astromon = {
        name: null,
        leader_skill: null
    };

    let astromonElements = [];

    astromon["_id"] = index;
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
            const element = $(this).find("div > a").text().trim().toString().toLowerCase();
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

                    const portraitsContainer = $(this).find("> div#summarytop > div[id*='portrait']");

                    portraitsContainer.each(function(index) {
                        const portrait = $(this).find("> a").attr("href");

                        if (type && contentIndex === elementIndex) {
                            astromon[astromonElements[elementIndex]]["type"] = type;

                            if (portrait && IS_DOWNLOAD_IMAGES && !portrait.includes("Special")) {
                                const filename = `${astromon["name"]}_portrait${index + 1}_${astromonElements[elementIndex]}`;
                                astromon[astromonElements[elementIndex]][`evo_${index + 1}_portrait`] = filename;
                                downloadFile(portrait, ASTROMON_IMAGE_FOLDER, `${filename}.webp`);
                            }
                        }

                    });

                    // Skills Comes Here

                    if (innerContentIndex === 0) {
                        const normalSkillContainer = $(this).find("> div#skillcontainer > div#normalskill > div");

                        normalSkillContainer.each(function(normalSkillIndex) {
                            const skillName = $(this).find("> div > div > span").text().trim();
                            const skillDesc = $(this).find("> div > div > p").text().trim();

                            if (type && contentIndex === elementIndex) {
                                if (normalSkillIndex === 0) {
                                    astromon[astromonElements[elementIndex]]["skills"]["normal_skill"] = skillName;
                                    astromon[astromonElements[elementIndex]]["skills"]["normal_skill_desc"] = skillDesc;
                                } else if (normalSkillIndex === 1) {
                                    astromon[astromonElements[elementIndex]]["skills"]["normal_passive"] = skillName;
                                }
                            }
                        });

                        const activeSkillContainer = $(this).find("> div#skillcontainer > div#activeskill > div");

                        activeSkillContainer.each(function(activeSkillIndex) {
                            const skillName = $(this).find("> div > div > span").text().trim();
                            const skillDesc = $(this).find("> div > div > p").text().trim();

                            if (type && contentIndex === elementIndex) {
                                if (activeSkillIndex === 0) {
                                    astromon[astromonElements[elementIndex]]["skills"]["active_skill"] = skillName;
                                    astromon[astromonElements[elementIndex]]["skills"]["active_skill_desc"] = skillDesc;
                                    if (skillDesc.toUpperCase().includes("HEAL")) {
                                        astromon[astromonElements[elementIndex]]["is_healer"] = true;
                                    } else {
                                        astromon[astromonElements[elementIndex]]["is_healer"] = false;
                                    }
                                } else if (activeSkillIndex === 1) {
                                    astromon[astromonElements[elementIndex]]["skills"]["active_passive"] = skillName;
                                    astromon[astromonElements[elementIndex]]["skills"]["active_skill_desc"] = skillDesc;
                                }
                            }
                        });
                    }

                    // Stats Comes Here

                    if (innerContentIndex === 1) {
                        const attrs = ["hp", "atk", "def", "rec"];
                        const RGB = [CONSTANTS.ELEMENTS.FIRE, CONSTANTS.ELEMENTS.WATER, CONSTANTS.ELEMENTS.WOOD];
                        const LD = [CONSTANTS.ELEMENTS.LIGHT, CONSTANTS.ELEMENTS.DARK];

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

                                        if (RGB.includes(astromonElements[contentIndex])) {
                                            astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_rate"] = 10.0;
                                            astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_dmg"] = 50.0;
                                            astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_res"] = 0.0;
                                            astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["res"] = 20.0;
                                        } else if (LD.includes(astromonElements[contentIndex])) {
                                            if (isHealer(astromon[astromonElements[contentIndex]])) {
                                                astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_rate"] = 10.0;
                                                astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_dmg"] = 50.0;
                                                astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_res"] = 0.0;
                                                astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["res"] = 30.0;
                                            } else {
                                                if (astromonElements[contentIndex] === CONSTANTS.ELEMENTS.LIGHT) {
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_rate"] = 20.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_dmg"] = 50.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_res"] = 0.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["res"] = 0.0;
                                                } else if (astromonElements[contentIndex] === CONSTANTS.ELEMENTS.DARK) {
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_rate"] = 10.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_dmg"] = 100.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["crit_res"] = 0.0;
                                                    astromon[astromonElements[contentIndex]]["stats"][`evo_${i}`][attributeIndex + 1]["res"] = 0.0;
                                                }
                                            }
                                        }
                                    }
                                });
                            });
                        }

                    }
                })
            });

        });
    });

    astromons.push(astromon);

    save();
}

const isHealer = (astromon) => {
    return astromon["is_healer"]; 
};

const save = async () => {
    if (astromons.length == monsterUrls.length) {
        console.log(astromons);

        const jsonData = JSON.stringify(astromons);

        const fs = require('fs');
        fs.writeFile("astromons.json", jsonData, function(err) {
            if (err) {
                console.log(err);
            }
        });

        if (STORE_TO_DB) {
            await bulkInsert(astromons);
        }
    }
}

const purge = async () => {
    await client.connect(async () => {
        const collection = client.db("Emesel").collection("Astromons");

        await collection.remove();

        client.close();
    })
}

const bulkInsert = async (astromons) => {
    await client.connect(async (err) => {
        const collection = client.db("Emesel").collection("Astromons");
        // perform actions on the collection object

        if (IS_PURGE) {
            await collection.remove();
        }

        const bulk = collection.initializeUnorderedBulkOp();

        astromons.forEach((astromon) => {
            bulk.insert(astromon);
        });

        await bulk.execute();

        client.close();
    });
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
        monsterUrls = monsterUrls.slice(0, MAX_TEST_ASTROMON);
    }

    monsterUrls.forEach(async (url, index) => {
        crawlData(url, index + 1);
        // if (index % 20) {
        //     await sleep(1000);
        // }
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }  

run();

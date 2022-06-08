const CONSTANTS = require('../src/config/constants.json');
const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://monstersuperleague.fandom.com/wiki/Category:Astromons";
const baseUrl = "https://monstersuperleague.fandom.com";
const isLoopTest = false;

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

fetchData(url).then((res) => {
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
}).then(() => {
    monsterUrls.every((url) => {
        const astromonUrl = `${baseUrl}${url}`;

        fetchData(astromonUrl).then((res) => {
            html = res.data;
            $ = cheerio.load(html);

            const astromon = {};
            let astromonElements = [];

            astromon["name"] = $("#firstHeading").text().trim();

            const tabContainer = $("table > tbody > tr > td > .tabber.wds-tabber");

            tabContainer.each(function() {
                const parentTab = $(this);
                const tabs = $(this).find("> div.wds-tabs__wrapper > ul.wds-tabs > li");

                tabs.each(function(elementIndex) {
                    const element = $(this).find("div > a").text().trim().toString();
                    if (ASTROMON_ELEMENTS.includes(element)) {
                        astromon[element] = {};
                        astromonElements.push(element);
                    }

                    const contents = parentTab.find("> div.wds-tab__content");

                    contents.each(function(contentIndex) {
                        const innerContent = $(this).find("> div.wds-tabber > div.wds-tab__content");

                        innerContent.each(function() {
                            const type = $(this).find("> div#summarytop > div > div").text().trim();

                            if (type && contentIndex === elementIndex) {
                                astromon[astromonElements[elementIndex]]["type"] = type;
                            }
                        })
                    });

                });
            });

            astromons.push(astromon);
        }).then(() => {
            const jsonData = JSON.stringify(astromons);

            const fs = require('fs');
            fs.writeFile("astromons.json", jsonData, function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });

        // fetchData(astromonUrl).then((res) => {
        //     html = res.data;
        //     $ = cheerio.load(html);

        //     const astromon = {};
        //     let astromonElements = [];

        //     astromon["name"] = $("#firstHeading").text().trim();

        //     const tabContainer = $("table > tbody > tr > td > .tabber.wds-tabber");

        //     tabContainer.each(function() {
        //         const parentTab = $(this);
        //         const tabs = $(this).find("> div.wds-tabs__wrapper > ul.wds-tabs > li");

        //         tabs.each(function(elementIndex) {
        //             const element = $(this).find("div > a").text().trim().toString();
        //             if (ASTROMON_ELEMENTS.includes(element)) {
        //                 astromon[element] = {};
        //                 astromonElements.push(element);
        //             }

        //             const contents = parentTab.find("> div.wds-tab__content");

        //             contents.each(function(contentIndex) {
        //                 const innerContent = $(this).find("> div.wds-tabber > div.wds-tab__content");

        //                 innerContent.each(function() {
        //                     const type = $(this).find("> div#summarytop > div > div").text().trim();

        //                     if (type && contentIndex === elementIndex) {
        //                         astromon[astromonElements[elementIndex]]["type"] = type;
        //                     }
        //                 })
        //             });

        //         });
        //     });

        //     astromons.push(astromon);
        // }).then(() => {
        //     const jsonData = JSON.stringify(astromons);

        //     const fs = require('fs');
        //     fs.writeFile("astromons.json", jsonData, function(err) {
        //         if (err) {
        //             console.log(err);
        //         }
        //     });
        // });

        return !isLoopTest;
    });
}).then(() => {
    // const jsonData = JSON.stringify(astromons);

    // const fs = require('fs');
    // fs.writeFile("astromons.json", jsonData, function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    // console.log('Charan!');
});
"use strict";
// Task: mCreat a game where you can buy deferent buildings for diff rescourses.
//Pseodo code:
// 1. Create html/css
// 2. Display in html Array recourses
// 3. Display in html houses from array homes =
// 4. create div for "all bought buildings to appear"
// 5. js logics: check recourses on home click to check price and verify with your rescourses
// 6. If yes  - appears on the right, substract from recourses the price
// 7. each home (bought) - generates some income (recourses), have one set timeout function to generate.
//8. Have array for recourses (gained) each second.
const goldResource = document.querySelector('#gold');
const woodResource = document.querySelector('#wood');
const stoneResource = document.querySelector('#stone');
const foodResource = document.querySelector('#food');
const populationResource = document.querySelector('#population');
const buildingsToBuy = document.querySelector('.buildingsToBuy');
const boughtBuildings = document.querySelector('.boughtBuildings');
// const resources:typeAmount[] = [
//     {
//         type: 'GOLD',
//         amount: 100
//     },
//     {
//         type: 'WOOD',
//         amount: 20
//     },
//     {
//         type: 'STONE',
//         amount: 20
//     },
//     {
//         type: 'FOOD',
//         amount: 20
//     },
//     {
//         type: 'POPULATION',
//         amount: 10
//     },
//
// ]
const resources = {
    gold: 100,
    wood: 20,
    stone: 20,
    food: 20,
    population: 10
};
const resourcesToAdd = {
    gold: 0,
    wood: 0,
    stone: 0,
    food: 0,
    population: 0
};
const homes = [
    {
        type: 'tent',
        cost: [
            {
                type: 'gold',
                amount: 10
            },
            {
                type: 'stone',
                amount: 5
            },
            {
                type: 'wood',
                amount: 10
            },
            {
                type: 'food',
                amount: 0
            },
            {
                type: 'population',
                amount: 0
            }
        ],
        foodCostPerSec: 0,
        givesPopulation: 2,
        givesPerSec: [
            {
                type: 'gold',
                amount: 0
            },
            {
                type: 'stone',
                amount: 1
            },
            {
                type: 'wood',
                amount: 1
            },
            {
                type: 'food',
                amount: 0
            },
        ],
        neededToBuild: [
            {
                type: 'tent',
                amount: 0
            },
            {
                type: 'hut',
                amount: 0
            },
            {
                type: 'simple house',
                amount: 0
            },
        ],
        photo: 'https://cdn1.iconfinder.com/data/icons/camping-and-adventure-hexagonal/135/3-512.png'
    },
    {
        type: 'hut',
        cost: [
            {
                type: 'gold',
                amount: 20
            },
            {
                type: 'stone',
                amount: 20
            },
            {
                type: 'wood',
                amount: 20
            },
            {
                type: 'food',
                amount: 10
            },
            {
                type: 'population',
                amount: 5
            }
        ],
        foodCostPerSec: 0,
        givesPopulation: 0,
        givesPerSec: [
            {
                type: 'gold',
                amount: 0
            },
            {
                type: 'stone',
                amount: 0
            },
            {
                type: 'wood',
                amount: 0
            },
            {
                type: 'food',
                amount: 3
            },
        ],
        neededToBuild: [
            {
                type: 'tent',
                amount: 1
            },
            {
                type: 'hut',
                amount: 0
            },
            {
                type: 'simple house',
                amount: 0
            },
        ],
        photo: 'https://png.pngtree.com/png-clipart/20220124/original/pngtree-forest-in-autumn-and-autumn-png-image_7173989.png'
    },
    {
        type: 'simple house',
        cost: [
            {
                type: 'gold',
                amount: 50
            },
            {
                type: 'stone',
                amount: 70
            },
            {
                type: 'wood',
                amount: 80
            },
            {
                type: 'food',
                amount: 0
            },
            {
                type: 'population',
                amount: 0
            }
        ],
        foodCostPerSec: 4,
        givesPopulation: 10,
        givesPerSec: [
            {
                type: 'gold',
                amount: 1
            },
            {
                type: 'stone',
                amount: 0
            },
            {
                type: 'wood',
                amount: 0
            },
            {
                type: 'food',
                amount: 3
            }
        ],
        neededToBuild: [
            {
                type: 'tent',
                amount: 1
            },
            {
                type: 'hut',
                amount: 1
            },
            {
                type: 'simple house',
                amount: 0
            },
        ],
        photo: 'https://lightbulbservice.org/wp-content/uploads/2020/10/New-House-2.png'
    },
    {
        type: 'city hall',
        cost: [
            {
                type: 'gold',
                amount: 150
            },
            {
                type: 'stone',
                amount: 300
            },
            {
                type: 'wood',
                amount: 200
            },
            {
                type: 'food',
                amount: 200
            },
            {
                type: 'population',
                amount: 100
            }
        ],
        foodCostPerSec: 0,
        givesPopulation: 0,
        givesPerSec: [
            {
                type: 'gold',
                amount: 3
            },
            {
                type: 'stone',
                amount: 2
            },
            {
                type: 'wood',
                amount: 2
            },
            {
                type: 'food',
                amount: 1
            }
        ],
        neededToBuild: [
            {
                type: 'tent',
                amount: 3
            },
            {
                type: 'hut',
                amount: 4
            },
            {
                type: 'simple house',
                amount: 5
            },
        ],
        photo: 'https://toppng.com/uploads/thumbnail/overnment-action-council-cartoon-city-hall-buildi-11562991663vif7qbfa23.png'
    },
];
homes.forEach((home) => {
    const homeDiv = document.createElement('div');
    homeDiv.className = home.type;
    const homePhoto = document.createElement('img');
    homePhoto.src = home.photo;
    const costAndGainDiv = document.createElement('div');
    costAndGainDiv.style.display = 'flex';
    const costDiv = document.createElement('div');
    costDiv.style.flex = '1';
    const gainDiv = document.createElement('div');
    gainDiv.style.flex = '1';
    const cost = document.createElement('h4');
    cost.textContent = 'COST';
    costDiv.append(cost);
    home.cost.forEach((priceObj) => {
        const resourceCostDiv = document.createElement('div');
        resourceCostDiv.style.display = 'flex';
        const resourceType = document.createElement('p');
        resourceType.textContent = priceObj.type + ': ';
        const resourceAmount = document.createElement('p');
        resourceAmount.textContent = ` ${priceObj.amount}`;
        resourceCostDiv.append(resourceType, resourceAmount);
        costDiv.append(resourceCostDiv);
    });
    const foodCostPerSec = document.createElement('h6');
    foodCostPerSec.textContent = `Food/s: ${home.foodCostPerSec}`;
    costDiv.append(foodCostPerSec);
    const gain = document.createElement('h4');
    gain.textContent = 'GAIN';
    gainDiv.append(gain);
    home.givesPerSec.forEach((giveObj) => {
        const resourceGainDiv = document.createElement('div');
        resourceGainDiv.style.display = 'flex';
        const resourceType = document.createElement('p');
        resourceType.textContent = giveObj.type + '/s: ';
        const resourceAmount = document.createElement('p');
        resourceAmount.textContent = ` ${giveObj.amount}`;
        resourceGainDiv.append(resourceType, resourceAmount);
        gainDiv.append(resourceGainDiv);
    });
    const givesPopulation = document.createElement('h6');
    givesPopulation.textContent = `Population: ${home.givesPopulation}`;
    gainDiv.append(givesPopulation);
    costAndGainDiv.append(costDiv, gainDiv);
    const hr = document.createElement('hr');
    const neededToBuildDiv = document.createElement('b');
    neededToBuildDiv.textContent = 'NEEDED TO BUILD';
    home.neededToBuild.forEach((build) => {
        const neededtoBuild = document.createElement('div');
        neededtoBuild.style.display = 'flex';
        const resourceType = document.createElement('p');
        resourceType.textContent = build.type + ': ';
        const resourceAmount = document.createElement('p');
        resourceAmount.textContent = ` ${build.amount}`;
        neededtoBuild.append(resourceType, resourceAmount);
        neededToBuildDiv.append(neededtoBuild);
    });
    homeDiv.append(homePhoto, costAndGainDiv, hr, neededToBuildDiv);
    buildingsToBuy.append(homeDiv);
});
const homesDivs = document.querySelectorAll('.buildingsToBuy >div');
let boughtBuildings_divs = null;
homesDivs.forEach((homeDiv) => {
    homeDiv.onclick = () => {
        let clickedBuilding = homeDiv.className;
        if (clickedBuilding) {
            let homeToBuy = homes.find((home) => home.type === clickedBuilding);
            if (resources.gold >= homeToBuy.cost[0].amount && resources.stone >= homeToBuy.cost[1].amount && resources.wood >= homeToBuy.cost[2].amount && resources.food >= homeToBuy.cost[3].amount && resources.population >= homeToBuy.cost[4].amount) {
                resources.gold -= homeToBuy.cost[0].amount;
                resources.stone -= homeToBuy.cost[1].amount;
                resources.wood -= homeToBuy.cost[2].amount;
                resources.food -= homeToBuy.cost[3].amount;
                resources.population -= homeToBuy.cost[4].amount;
                resourcesToAdd.population += homeToBuy.givesPopulation;
                const boughtHouse = document.createElement('div');
                const boughtHouseImg = document.createElement('img');
                boughtHouseImg.src = homeToBuy.photo;
                boughtHouse.append(boughtHouseImg);
                boughtBuildings.append(boughtHouse);
                if (homeToBuy) {
                    setInterval(addResources, 1000, homeToBuy);
                }
                displayResources();
                console.log('enough resources');
            }
            else {
                console.log('not enough resources');
            }
            console.log(homeToBuy);
        }
    };
});
function displayResources() {
    resources.gold += resourcesToAdd.gold;
    resources.wood += resourcesToAdd.wood;
    resources.stone += resourcesToAdd.stone;
    resources.food += resourcesToAdd.food;
    resources.population += resourcesToAdd.population;
    goldResource.textContent = 'GOLD: ' + resources.gold;
    woodResource.textContent = 'WOOD: ' + resources.wood;
    stoneResource.textContent = 'STONE: ' + resources.stone;
    foodResource.textContent = 'FOOD: ' + resources.food;
    populationResource.textContent = 'POPULATION: ' + resources.population;
}
function addResources(homeToBuy) {
    resourcesToAdd.gold += homeToBuy.givesPerSec[0].amount;
    resourcesToAdd.stone += homeToBuy.givesPerSec[1].amount;
    resourcesToAdd.wood += homeToBuy.givesPerSec[2].amount;
    resourcesToAdd.food += homeToBuy.givesPerSec[3].amount;
    displayResources();
}
displayResources();
// setInterval(addResources, 1000);

import axios from 'axios';
import config from '../config/config';

// Just for initial testing

const indexArrayToMap = (array) => {
    let table = {};
    array.forEach((element) => {
        table[element.id] = element;
    });

    return table;
}

const recalculateStats = (userData, itemTable) => {
    userData.totalAC = 0;
    Object.keys(userData.equipment).forEach((slot) => {
        let item = userData.equipment[slot];
        if (item.type === "armor") {
            userData.totalAC += item.ac;
        }
    });

    return userData;
}

const createBot = async (twitchAuthCode) => {
    let url = `${config.EXT_BASE_URL}/bots`;

    let res = await axios.post(url, {
        twitchAuthCode
    })

    return res.data;
}

const checkToken = async (channel) => {
    let url = `${config.BASE_URL}/bots/${channel}/token`;

    let res = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return res.data;
}

const updateToken = async (channel, twitchAuthCode) => {
    let url = `${config.BASE_URL}/bots/${channel}/token`;

    let res = await axios.put(url, {
        twitchAuthCode
    },{
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return res.data;
}

const getBot = async (channel) => {
    let url = `${config.BASE_URL}/bots/${channel}`;

    let res = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return res.data;
}

const getBotState = async (channel) => {
    let url = `${config.BASE_URL}/bots/${channel}/state`;

    let res = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return res.data;
}

const changeBotState = async (channel, newState) => {
    let res = await axios.put(`${config.BASE_URL}/bots/${channel}/state`, {
        newState
    }, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    })

    return res.data;
}

const getItems = async (channel) => {
    let url = `${config.BASE_URL}/items`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let items = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return items.data;
}

const getItemTable = async () => {
    let items = await getItems();

    return indexArrayToMap(items);
}

const getJobs = async (channel) => {
    let url = `${config.BASE_URL}/jobs`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let jobs = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return jobs.data;
}

const getJobTable = async () => {
    let jobs = await getJobs();

    return indexArrayToMap(jobs);
}

const getAbilityTable = async () => {
    let abilities = await getAbilities();

    return indexArrayToMap(abilities);
}

const expandUser = (userData, context) => {
    userData.totalAC = 0;
    userData.abilities = [];
    userData.currentJob = context.jobTable[userData.currentJob.id];
    userData.str = userData.currentJob.str;
    userData.dex = userData.currentJob.dex;
    userData.int = userData.currentJob.int;
    userData.hit = userData.currentJob.hit;
    userData.maxHp = userData.currentJob.hp;
    Object.keys(userData.equipment).forEach((slot) => {
        let item = userData.equipment[slot];
        let itemData = context.itemTable[item.id];
        if (itemData.type === "armor") {
            userData.totalAC += itemData.ac;
        }
        userData.totalAC += itemData.mods.ac;
        userData.maxHp += itemData.mods.hp;
        userData.str += itemData.mods.str;
        userData.dex += itemData.mods.dex;
        userData.int += itemData.mods.int;
        userData.hit += itemData.mods.hit;
        itemData.abilities.forEach((ability) => {
            if (userData.abilities.find((element) => {
                return ability === element.id
            })) {
                return;
            }
            userData.abilities.push(context.abilityTable[ability]);
        });
        userData.equipment[slot] = itemData;
    });
    let newInventoryList = [];
    let condensedItemMap = {};
    userData.inventory.forEach((item) => {
        newInventoryList.push(context.itemTable[item]);
        if (!condensedItemMap[item]) {
            condensedItemMap[item] = {
                item: context.itemTable[item],
                count: 1
            }

            return;
        }
        condensedItemMap[item].count++;
    });

    if (userData.maxHp < 0) {
        userData.maxHp = 1;
    }

    if (userData.hp > userData.maxHp) {
        userData.hp = userData.maxHp;
    }

    userData.inventory = newInventoryList;
    userData.condensedInventory = condensedItemMap;
    userData.actionCooldown = Math.min(11, 6 - Math.min(5, userData.dex));

    return userData;
}

const getUser = async (username) => {
    let user = await axios.get(`${config.BASE_URL}/users/${username}`,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return user.data;
}

const getUsers = async () => {
    let users = await axios.get(`${config.BASE_URL}/users`,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return users.data;
}

const getMonster = async (id) => {
    let monster = await axios.get(`${config.BASE_URL}/monsters/${id}`,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return monster.data;
}

const getMonsters = async (channel) => {
    let url = `${config.BASE_URL}/monsters`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let monsters = await axios.get(url,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return monsters.data;
}

const getStatuses = async (channel) => {
    let url = `${config.BASE_URL}/statuses`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let statuses = await axios.get(url,
    {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

return statuses.data;
}

const getStatus = async (id) => {
    let status = await axios.get(`${config.BASE_URL}/statuses/${id}`,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return status.data;
}

const createStatus = async (statusData) => {
    let created = await axios.post(`${config.BASE_URL}/statuses`, statusData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return created.data;
}

const updateStatus = async (statusData) => {
    let updated = await axios.put(`${config.BASE_URL}/statuses/${statusData.id}`, statusData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const createMonster = async (monsterData) => {
    let created = await axios.post(`${config.BASE_URL}/monsters`, monsterData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return created.data;
}

const updateMonster = async (monsterData) => {
    let updated = await axios.put(`${config.BASE_URL}/monsters/${monsterData.id}`, monsterData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const getAbilities = async (channel) => {
    let url = `${config.BASE_URL}/abilities`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let abilities = await axios.get(url,
        {
            headers: {
                "X-Access-Token": localStorage.getItem("accessToken")
            }
        });

    return abilities.data;
}

const getAbility = async (id) => {
    try {
        let ability = await axios.get(`${config.BASE_URL}/abilities/${id}`,
            {
                headers: {
                    "X-Access-Token": localStorage.getItem("accessToken")
                }
            });
        
        return ability.data;
    } catch (error) {
        return null;
    }
}

const createAbility = async (abilityData) => {
    let created = await axios.post(`${config.BASE_URL}/abilities`, abilityData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return created.data;
}

const updateAbility = async (abilityData) => {
    let updated = await axios.put(`${config.BASE_URL}/abilities/${abilityData.id}`, abilityData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const getItem = async (id) => {
    let item = await axios.get(`${config.BASE_URL}/items/${id}`, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return item.data;
}

const createItem = async (itemData) => {
    let created = await axios.post(`${config.BASE_URL}/items`, itemData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return created.data;
}

const updateItem = async (itemData) => {
    let updated = await axios.put(`${config.BASE_URL}/items/${itemData.id}`, itemData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const getSealedItems = async (channel) => {
    let url = `${config.BASE_URL}/sealed-items`;
    if (channel) {
        url += `?owningChannel=${channel}`;
    }

    let items = await axios.get(url, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return items.data;
}

const getSealedItem = async (id) => {
    let item = await axios.get(`${config.BASE_URL}/sealed-items/${id}`, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return item.data;
}

const createSealedItem = async (itemData) => {
    let created = await axios.post(`${config.BASE_URL}/sealed-items`, itemData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return created.data;
}

const updateSealedItem = async (itemData) => {
    let updated = await axios.put(`${config.BASE_URL}/sealed-items/${itemData.id}`, itemData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const updateUser = async (userData) => {
    let updated = await axios.put(`${config.BASE_URL}/users/${userData.name}`, userData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

const updateBotConfig = async (configData) => {
    let updated = await axios.put(`${config.BASE_URL}/bots/${userData.name}/config`, configData, {
        headers: {
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

export default {
    expandUser,
    recalculateStats,
    getItemTable,
    getAbilityTable,
    getJobTable,
    getJobs,
    getUser,
    getUsers,
    updateUser,
    getMonster,
    getMonsters,
    getStatus,
    getStatuses,
    createStatus,
    updateStatus,
    createMonster,
    updateMonster,
    getAbility,
    getAbilities,
    createAbility,
    updateAbility,
    getItem,
    getItems,
    createItem,
    updateItem,
    getSealedItems,
    getSealedItem,
    createSealedItem,
    updateSealedItem,
    createBot,
    checkToken,
    updateToken,
    getBot,
    getBotState,
    changeBotState,
    updateBotConfig
}
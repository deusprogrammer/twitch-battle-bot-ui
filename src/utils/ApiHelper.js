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

const getItems = async () => {
  let items = await axios.get(`${config.BASE_URL}/items`, {
    headers: {
      //Authorization: `Bearer ${BATTLE_BOT_JWT}`
      "X-Access-Token": localStorage.getItem("accessToken")
    }
  });

  return items.data;
}

const getItemTable = async () => {
  let items = await getItems();

  return indexArrayToMap(items);
}

const getJobs = async () => {
  let jobs = await axios.get(`${config.BASE_URL}/jobs`, {
    headers: {
      //Authorization: `Bearer ${BATTLE_BOT_JWT}`
      "X-Access-Token": localStorage.getItem("accessToken")
    }
  });

  return jobs.data;
}

const getJobTable = async () => {
  let jobs = await getJobs();

  return indexArrayToMap(jobs);  
}

const expandUser = (userData, itemTable, jobTable ) => {
  Object.keys(userData.equipment).forEach((slot) => {
    let item = userData.equipment[slot];
    let itemData = itemTable[item.id];
    userData.equipment[slot] = itemData;
  });
  let newInventoryList = [];
  userData.inventory.forEach((item) => {
    newInventoryList.push(itemTable[item]);
  });

  userData.inventory = newInventoryList;
  userData.currentJob = jobTable[userData.currentJob.id];

  return userData;
}

const getUser = async (username) => {
    let user = await axios.get(`${config.BASE_URL}/users/${username}`,
    {
        headers: {
            //Authorization: `Bearer ${BATTLE_BOT_JWT}`
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return user.data;
}

const getMonsters = async () => {
  let monsters = await axios.get(`${config.BASE_URL}/monsters`,
  {
      headers: {
          //Authorization: `Bearer ${BATTLE_BOT_JWT}`
          "X-Access-Token": localStorage.getItem("accessToken")
      }
  });

  return monsters.data;
}

const getAbilities = async () => {
  let abilities = await axios.get(`${config.BASE_URL}/abilities`,
  {
      headers: {
          //Authorization: `Bearer ${BATTLE_BOT_JWT}`
          "X-Access-Token": localStorage.getItem("accessToken")
      }
  });

  return abilities.data;
}

const updateUser = async (userData) => {
    let updated = await axios.put(`${config.BASE_URL}/users/${userData.name}`, userData, {
        headers: {
            //Authorization: `Bearer ${BATTLE_BOT_JWT}`
            "X-Access-Token": localStorage.getItem("accessToken")
        }
    });

    return updated.data;
}

export default {
    expandUser, getItemTable, getItems, getJobTable, getJobs, getUser, updateUser, recalculateStats, getMonsters, getAbilities
}
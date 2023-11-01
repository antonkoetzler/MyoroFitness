import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("meals.db");

export function updateMealRow(foods, date, meal) {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE meals SET foods = ?, date = ? WHERE name = ?`,
      [ foods, date, meal ]
    );
  });
}

export function getMealRow(meal) {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM meals WHERE name = ?`,
        [ meal ], (_, result) => resolve(result.rows._array[0])
      );
    });
  });
}

function createMealsTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS meals(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name  TEXT,
        foods TEXT,
        date  TEXT
      );`,
      [],
      () => {
        tx.executeSql(
          `INSERT INTO meals(name, foods, date) VALUES("Breakfast", NULL, NULL);`,
          [],
          () => {
            tx.executeSql(
              `INSERT INTO meals(name, foods, date) VALUES("Lunch", NULL, NULL);`,
              [],
              () => {
                tx.executeSql(
                  `INSERT INTO meals(name, foods, date) VALUES("Dinner", NULL, NULL);`,
                  [],
                  () => tx.executeSql(`INSERT INTO meals(name, foods, date) VALUES("Snacks", NULL, NULL);`)
                );
              }
            );
          }
        );
      }
    );
  });
}

function createWorkoutsTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS workouts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT,
        exercises TEXT
      );`,
    );
  });
}

export function insertWorkout(name, exercises) {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO workouts(name, exercises) VALUES(?,?);`,
      [ name, JSON.stringify(exercises) ]
    );
  });
}

export function updateWorkout(name, exercises, modifyWorkout) {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE workouts SET name = ?, exercises = ? WHERE name = ? AND exercises = ? LIMIT 1;`,
      [ name, JSON.stringify(exercises), modifyWorkout.name, JSON.stringify(modifyWorkout.exercises) ],
    );
  });
}

export function getWorkouts() {
  return new Promise((resolve) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM workouts;`,
        [],
        (_, { rows }) => {
          const result       = rows._array;
          const resultToJSON = [];
          for(let i = 0; i < result.length; i++)
            resultToJSON.push({ name: result[i].name, exercises: JSON.parse(result[i].exercises) });
          resolve(resultToJSON);
       }
      );
    });
  });
}

export function deleteWorkout(workout) {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM workouts WHERE name = ? AND exercises = ? LIMIT 1;`,
      [ workout.name, JSON.stringify(workout.exercises) ]
    );
  });
}

function createLogsTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS logs(
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        weight    TEXT,
        exercised TEXT,
        calories  TEXT,
        date      TEXT
      )`
    );
  });
}

export function logData(weight, exercised, calories, date) {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM logs WHERE date = ?;`,
      [ date ],
      (_, results) => {
        if(results.rows._array.length === 0) {
          tx.executeSql(
            `INSERT INTO logs(weight, exercised, calories, date) VALUES(?, ?, ?, ?);`,
            [ weight, exercised ? '1' : '0', calories, date ]
          );
        } else {
          tx.executeSql(
            `UPDATE logs SET weight = ?, exercised = ?, calories = ? WHERE date = ?;`,
            [ weight, exercised ? '1' : '0', calories, date ]
          );
        }
      }
    );
  });
}

export function getLogData() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM logs;`,
        [],
        (_, { rows }) => {
          const data         = rows._array;
          const labels       = [];
          const weightData   = [];
          const calorieData  = [];
          const exerciseData = [];
          for(let i = 0; i < data.length; i++) {
            const dateSplit = data[i].date.split(':');
            labels.push(dateSplit[1] + '/' + dateSplit[2]);
            weightData.push(data[i].weight);
            calorieData.push(data[i].calories);
            if(data[i].exercised === '1') exerciseData.push(true);
            else                          exerciseData.push(false);
          }

          const result = {
            labels:       labels,
            weightData:   weightData,
            calorieData:  calorieData,
            exerciseData: exerciseData 
          }; resolve(result);
        }
      );
    });
  });
}

export function checkStreak() {
  return new Promise(resolve => {
    const currentDate = new Date();
    const date = currentDate.getFullYear() + ':' + String(currentDate.getMonth() + 1).padStart(2, '0') + ':' + String(currentDate.getDate()).padStart(2, '0');
    db.transaction(tx => {
      tx.executeSql(
        `SELECT date FROM logs;`,
        [],
        (_, { rows }) => {
          const data = rows._array;
          var streak = 0;
          for(let i = (data.length - 1); i >= 0; i--) {
            const split       = data[i].date.split(':');
            const current     = new Date(split[0], split[1] - 1, split[2]);

            if(i == (data.length - 1)) {
              const currentCopy       = current;
              current.setDate(current.getDate() + 1);
              const formattedToday    = currentCopy.getFullYear() + ':' + String(currentCopy.getMonth() + 1).padStart(2, '0') + ':' + String(currentCopy.getDate()).padStart(2, '0');
              const formattedTomorrow = current.getFullYear() + ':' + String(current.getMonth() + 1).padStart(2, '0') + ':' + String(current.getDate()).padStart(2, '0');
              if(formattedToday === date || formattedTomorrow === date) streak = streak + 1;
              else                                                      break;
            }
            else {
              current.setDate(current.getDate() + 1);
              const formattedCurrent = current.getFullYear() + ':' + String(current.getMonth() + 1).padStart(2, '0') + ':' + String(current.getDate()).padStart(2, '0');
              if(formattedCurrent === data[i + 1].date) streak = streak + 1;
              else                                      break;
            }
          }

          resolve(streak);
        }
      );
    });
  });
}

function createEnablePushNotificationsTable() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_preferences(
        id                      INTEGER PRIMARY KEY AUTOINCREMENT,
	darkMode                TEXT,
        enablePushNotifications TEXT
      );`,
      [],
      () => { tx.executeSql(`INSERT INTO user_preferences(darkMode, enablePushNotifications) VALUES('1');`); }
    );
  });
}

export function getEnablePushNotifications() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT enablePushNotifications FROM user_preferences;`,
        [],
        (_, { rows }) => {
          const enablePushNotifications = rows._array[0].enablePushNotifications;
          if(enablePushNotifications === '1') resolve(true);
          else                                resolve(false);
        }
      );
    });
  });
}

export function toggleEnablePushNotifications() {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT enablePushNotifications FROM user_preferences;`,
      [],
      (_, { rows }) => {
        const enablePushNotifications = rows._array[0].enablePushNotifications;
        var newValue;
        if(enablePushNotifications === '1') newValue = '0';
        else                                newValue = '1';
        tx.executeSql(
          `UPDATE user_preferences SET enablePushNotifications = ?;`,
          [ newValue ]
        );
      }
    );
  });
}

export function getDarkMode() {
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT darkMode FROM user_preferences;`,
        [],
        (_, { rows }) => {
          const darkMode = rows._array[0].darkMode;
          if(darkMode === '1') resolve(true);
          else                 resolve(false);
        }
      );
    });
  });
}

export function toggleDarkMode() {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT darkMode FROM user_preferences;`,
      [],
      (_, { rows }) => {
        const darkMode = rows._array[0].darkMode;
        var newValue;
        if(darkMode === '1') newValue = '0';
        else                 newValue = '1';
        tx.executeSql(
          `UPDATE user_preferences SET darkMode = ?;`,
          [ newValue ]
        );
      }
    );
  });
}


export function init() {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT 1 FROM meals LIMIT 1;`,
      [],
      () => {},
      () => createMealsTable()
    );
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type="table" AND name="workouts";`,
      [],
      (_, result) => { if(result.rows.length === 0) createWorkoutsTable(); }
    );
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type="table" AND name="logs";`,
      [],
      (_, result) => { if(result.rows.length === 0) createLogsTable(); }
    );
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type="table" AND name="user_preferences";`,
      [],
      (_, result) => { if(result.rows.length === 0) createEnablePushNotificationsTable(); }
    );
  });
}

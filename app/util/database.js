// Import the SQLite library and the Pet model
import * as SQLite from 'expo-sqlite';
import { Pet } from '../models/pet';

// Open a connection to the pets database
const database = SQLite.openDatabase('pets.db');

// Define a function to initialize the database
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // Execute an SQL statement to create the pets table if it doesn't exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS pets (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

// Define a function to insert a new pet into the database
export function insertPlace(pet) {
  const promise = new Promise((resolve, reject) => {
    // Execute an SQL statement to insert the pet into the database
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO pets (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [pet.title, pet.imageUri, pet.address, pet.location.lat, pet.location.lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

// Define a function to fetch all pets from the database
export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      // Execute an SQL statement to select all pets from the database
      tx.executeSql(
        'SELECT * FROM pets',
        [],
        (_, result) => {
          const pets = [];

          for (const dp of result.rows._array) {
            pets.push(
              new Pet(
                dp.title,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(pets);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

// Define a function to fetch details for a specific pet from the database
export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM pets WHERE id = ?',
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0];
          const pet = new Pet(
            dbPlace.title,
            dbPlace.imageUri,
            { lat: dbPlace.lat, lng: dbPlace.lng, address: dbPlace.address },
            dbPlace.id
          );
          resolve(pet);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

export const environment = {
  production: false,
  firebase: {
    projectId: 'ticket-app-crud',
    appId: '1:793830439736:web:5b895f66318acaa1641fcd',
    databaseURL: 'https://ticket-app-crud-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'ticket-app-crud.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyCwBX54HbAutLY7vod8I6HPeXRbSkc_Jz4',
    authDomain: 'ticket-app-crud.firebaseapp.com',
    messagingSenderId: '793830439736',
    measurementId: 'G-GM6D2Q39G3',
  },
};

// Get a list of cities from your database
// async function getCities(db: any) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map((doc) => doc.data());
//   return cityList;
// }

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

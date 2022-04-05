/* eslint-disable prettier/prettier */

import React, { useRef, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import Livemap from '@wemap/react-native-wemap-livemap';

const INITIAL_MAP_CONFIG = {
  emmid: 9432,
  token: null,
  // maxbounds: {
  //   northEast: {
  //     latitude: 52.526714,
  //     longitude: 13.37477,
  //   },
  //   southWest: {
  //     latitude: 52.522667,
  //     longitude: 13.364878,
  //   },
  // },
  // introcard: {
  //   active: false,
  // },
};

// const pinpoints = [
//   {
//     id: 1,
//     name: 'Wemap Office',
//     latitude: 43.609138,
//     longitude: 3.884193,
//     description: 'Where magic happens',
//   },
//   {
//     id: 2,
//     name: 'Effeil Tower',
//     latitude: 48.85837,
//     longitude: 2.294481,
//     description: 'What is that ?',
//   },
// ];

// const polyline = [
//   {
//     latitude: 43.609138,
//     longitude: 3.884193,
//   },
//   {
//     latitude: 48.85837,
//     longitude: 2.294481,
//   },
// ];

export default () => {
  const livemap = useRef();

  const onMapReady = () => {
    console.info('Livemap ready');
    //livemap.current.setPinpoints(pinpoints);
    // to test a signout after 60s
    //setTimeout(() => { livemap.current.signOut(); }, 60000)
    // ceci fait apparaître le pinpoint (à chercher) Clermont Auvergne Tourisme
    //livemap.current.setSourceLists([74878]);
    //livemap.current.aroundMe();
    // var filters = [
    //   '2017-02-01',
    //   '2017-02-05',
    //   'arts décoratifs',
    //   ['monument-historique', 'musee-de-france'],
    // ];
    // livemap.current.setFilters(...filters);
    // livemap.current.setCenter({ latitude: 60.609138, longitude: 10.884193 });

    // livemap.current.drawPolyline(polyline, { color: '#222222' }).then((id) => {
    //   console.log('Polyline drawn: ' + id);
    //   setTimeout(() => {
    //     console.log('Polyline removed: ' + id);
    //     livemap.current.removePolyline(id);
    //   }, 8000);
    // });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Livemap
        ref={livemap}
        mapConfig={INITIAL_MAP_CONFIG}
        onMapReady={onMapReady}
        onPinpointOpen={(pp) => console.log(`pinpoint open: ${pp.id}`)}
        onPinpointClose={() => console.log('pinpoint close')}
        onUserLogin={() => console.log('user login')}
        onUserLogout={() => console.log('user logout')}
        onEventOpen={({ id }) => console.log(`event open: ${id}`)}
        onEventClose={() => console.log('event close')}
        onGuidingStarted={() => console.log('guiding started')}
        onMapMoved={(json) => console.log('map moved', json)}
        onMapClick={(json) => console.log('map click', json)}
        onMapLongClick={(json) => console.log('map long click', json)}
        // onContentUpdated={(contentUpdated) => {
        //   console.log(contentUpdated.type);
        //   console.log(contentUpdated.query);
        //   console.log(contentUpdated.items);
        // }}
        onActionButtonClick={({ actionType, itemType, item }) => {
          console.log(`action button click`);
          console.log(itemType);
          console.log(actionType);
          console.log(item.id);
        }}
      />
    </SafeAreaView>
  );
};

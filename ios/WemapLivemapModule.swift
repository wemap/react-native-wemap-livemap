//
//  WemapLivemapModule.swift
//  react-native-wemap-livemap
//
//  Created by Thibault Capelli on 07/04/2022.
//

import Foundation
import livemap_ios_sdk

@objc(WemapLivemapModule)
class WemapLivemapModule: NSObject {
    var livemapView: WemapLivemap? = nil
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    internal func setLivemapView(livemapView: WemapLivemap) {
        self.livemapView = livemapView
    }
    
    @available(iOS 14.0, *)
    @objc func drawPolylineViaModule(
        _ coordinatesList: NSArray,
        options: NSDictionary? = nil,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: RCTPromiseRejectBlock
    ) -> Void {
        DispatchQueue.main.async {
            self.livemapView?.wemap.drawPolyline(
                coordinatesList: coordinatesList.map( { Coordinates.fromDictionary($0 as! NSDictionary) } ),
                options: options != nil ? PolylineOptions.fromDictionary(options!) : nil,
                completion: { id in resolve(id) }
            )
        }
    }
    
    @available(iOS 14.0, *)
    @objc func getUserLocationModule(_ resolve: @escaping RCTPromiseResolveBlock,
                                     reject: RCTPromiseRejectBlock
    ) -> Void {
        func resolveLocationDict(coords: Coordinates){
            let dict = NSDictionary(dictionary:
                [
                    "latitude": coords.latitude,
                    "longitude": coords.longitude,
                    "altitude": coords.altitude,
                    "accuracy": coords.accuracy
                ]
            )
            resolve(dict)
        }
        self.livemapView?.wemap.getUserLocation(
            completionHandler: { coordinates in
                resolveLocationDict(coords: coordinates)
            }
        )

    }

    
}

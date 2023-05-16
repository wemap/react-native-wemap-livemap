//
//  WemapLivemapModule.m
//  react-native-wemap-livemap
//
//  Created by Thibault Capelli on 07/04/2022.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WemapLivemapModule, NSObject)
RCT_EXTERN_METHOD(
                  drawPolylineViaModule: (NSArray *)coordinatesList
                  options: (NSDictionary *)options
                  resolve: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject
)
RCT_EXTERN_METHOD(
                  getUserLocationModule: (RCTPromiseResolveBlock)resolve
                  reject: (RCTPromiseRejectBlock)reject
)
@end

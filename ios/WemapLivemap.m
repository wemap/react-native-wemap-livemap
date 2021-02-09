#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(WemapLivemapManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(mapId, NSNumber)
  RCT_EXPORT_VIEW_PROPERTY(token, NSString)

  RCT_EXTERN_METHOD(openEventViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(closeEventViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(openPinpointViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(closePinpointViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(setFiltersViaManager: (nonnull NSNumber *)node startDate: (nonnull NSString *)startDate endDate: (nonnull NSString *)endDate query: (nonnull NSString *)query tags: (nonnull NSArray *)tags)
  RCT_EXTERN_METHOD(startNavigationViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(stopNavigationViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(signInByTokenViaManager: (nonnull NSNumber *)node accessToken: (nonnull NSString *)accessToken refreshToken: (nonnull NSString *)refreshToken)

  RCT_EXPORT_VIEW_PROPERTY(onMapReady, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onEventOpen, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onPinpointOpen, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onEventClose, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onPinpointClose, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onGuidingStarted, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onGuidingStopped, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onBookEventClicked, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onGoToPinpointClicked, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onUserLogin, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onUserLogout, RCTBubblingEventBlock)
@end

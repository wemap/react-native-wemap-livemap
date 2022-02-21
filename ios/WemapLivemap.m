#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(WemapLivemapManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(mapConfig, NSDictionary)

  RCT_EXTERN_METHOD(openEventViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(closeEventViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(openPinpointViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(closePinpointViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(setFiltersViaManager: (nonnull NSNumber *)node startDate: (nonnull NSString *)startDate endDate: (nonnull NSString *)endDate query: (nonnull NSString *)query tags: (nonnull NSArray *)tags)
  RCT_EXTERN_METHOD(startNavigationViaManager: (nonnull NSNumber *)node id: (nonnull NSNumber *)id)
  RCT_EXTERN_METHOD(stopNavigationViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(signInByTokenViaManager: (nonnull NSNumber *)node accessToken: (nonnull NSString *)accessToken refreshToken: (nonnull NSString *)refreshToken)
  RCT_EXTERN_METHOD(enableSidebarViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(disableSidebarViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(loadMapUrlViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(setPinpointsViaManager: (nonnull NSNumber *)node pinpoints: (nonnull NSArray *)pinpoints)
  RCT_EXTERN_METHOD(signOutViaManager: (nonnull NSNumber *)node)
  RCT_EXTERN_METHOD(setSourceListsViaManager: (nonnull NSNumber *)node sourceLists: (nonnull NSArray *)sourceLists)


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
  RCT_EXPORT_VIEW_PROPERTY(onUrlChange, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onMapMoved, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onMapClick, RCTBubblingEventBlock)
  RCT_EXPORT_VIEW_PROPERTY(onMapLongClick, RCTBubblingEventBlock)
@end

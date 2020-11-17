#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(WemapLivemapManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(mapId, NSNumber)
  RCT_EXPORT_VIEW_PROPERTY(token, NSString)
@end

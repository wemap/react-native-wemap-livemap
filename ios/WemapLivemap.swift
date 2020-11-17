import UIKit
import livemap_ios_sdk

class WemapLivemap: UIView {
    let wemap = wemapsdk.sharedInstance
  
    @objc var mapId: NSNumber!
    @objc var token: NSString!
  
    override func didSetProps(_ changedProps: [String]!) {
      wemap.delegate = self
      
      _ = wemap.configure(config: wemapsdk_config(token: self.token! as String , mapId: self.mapId as! Int)).presentIn(view: self)
    }
  
    required init?(coder aDecoder: NSCoder) {
      super.init(coder: aDecoder)
    }
  
    init() {
      super.init(frame: CGRect.zero)
    }
  
    override func layoutSubviews() {
      super.layoutSubviews()
      wemap.frame = self.frame
    }
}

extension WemapLivemap: wemapsdkViewDelegate {
    @objc func waitForReady(_ wemapController: wemapsdk) {
        print("Livemap is Ready")
        wemap.openPinpoint(WemapPinpointId:31604315)
    }
    
    @objc func onEventOpen(_ wemapController: wemapsdk, event: WemapEvent) {
        print("Event opened: \(event.id)")
    }
    
    @objc func onPinpointOpen(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        print("Pinpoint opened: \(pinpoint.id)")
    }
    
    @objc func onEventClose(_ wemapController: wemapsdk) {
        print("Event closed")
    }
    
    @objc func onPinpointClose(_ wemapController: wemapsdk) {
        print("Pinpoint closed")
    }
    
    @objc func onGuidingStarted(_ wemapController: wemapsdk) {
        print("Guiding Started")
    }
    
    @objc func onGuidingStopped(_ wemapController: wemapsdk) {
        print("Guiding Stopped")
    }
    
    @objc func onBookEventClicked(_ wemapController: wemapsdk, event: WemapEvent) {
        print("Book Event Clicked: \(event.id)")
    }
    
    @objc func onGoToPinpointClicked(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        print("Go To Pinpoint Clicked: \(pinpoint.id)")
    }
}

@objc (WemapLivemapManager)
class WemapLivemapManager: RCTViewManager {

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
 
  override func view() -> UIView! {
    return WemapLivemap()
  }
}

import UIKit
import livemap_ios_sdk

@objc(WemapLivemap)
class WemapLivemap: UIView {
    let wemap = wemapsdk.sharedInstance
    
    // RN Config Props
    @objc var mapId: NSNumber!
    @objc var token: NSString!
    
    // RN Event Callback Props
    @objc var onMapReady: RCTBubblingEventBlock?
    @objc var onEventOpen: RCTBubblingEventBlock?
    @objc var onPinpointOpen: RCTBubblingEventBlock?
    @objc var onEventClose: RCTBubblingEventBlock?
    @objc var onPinpointClose: RCTBubblingEventBlock?
    @objc var onGuidingStarted: RCTBubblingEventBlock?
    @objc var onGuidingStopped: RCTBubblingEventBlock?
    @objc var onBookEventClicked: RCTBubblingEventBlock?
    @objc var onGoToPinpointClicked: RCTBubblingEventBlock?
  
    override func didSetProps(_ changedProps: [String]!) {
        wemap.delegate = self
      
        _ = wemap.configure(config: wemapsdk_config(token: self.token! as String, mapId: self.mapId as! Int)).presentIn(view: self)
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
    
    // RN Methods
    @objc func openEvent() {
        wemap.openEvent(WemapEventId: 1)
    }
    
    @objc func closeEvent() {
        wemap.closeEvent()
    }
    
    @objc func openPinpoint(_ params: [String : Any]?) {
        wemap.openPinpoint(WemapPinpointId: params?["id"] as! Int)
    }
    
    @objc func closePinpoint() {
        wemap.closePinpoint()
    }
    
    @objc func setFilters(tags: NSArray, query: NSString, startDate: NSString, endDate: NSString) {
        let filters = WemapFilters(tags: tags as? Array<String>, query: query as String, startDate: startDate as String, endDate: endDate as String)
        wemap.setFilters(WemapFilters: filters)
    }
    
    @objc func navigateToPinpoint(id: NSNumber, startLocation: [NSString: NSNumber]?) {
        let location = WemapLocation(longitude: Double(startLocation!["longitude"] as! Int), latitude: Double(startLocation!["latitude"] as! Int))
        wemap.navigateToPinpoint(WemapPinpointId: id as! Int, location: location)
    }
    
    @objc func stopNavigation() {
        wemap.stopNavigation()
    }
}

extension WemapLivemap: wemapsdkViewDelegate {
    @objc func waitForReady(_ wemapController: wemapsdk) {
        if(self.onMapReady == nil) { return }
        self.onMapReady!(["value": true])
    }
    
    @objc func onEventOpen(_ wemapController: wemapsdk, event: WemapEvent) {
        if(self.onEventOpen == nil) { return }
        self.onEventOpen!(["value": event.id])
    }
    
    @objc func onPinpointOpen(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onPinpointOpen == nil) { return }
        self.onPinpointOpen!(["value": pinpoint.id])
    }
    
    @objc func onEventClose(_ wemapController: wemapsdk) {
        if(self.onEventClose == nil) { return }
        self.onEventClose!(["value": true])
    }
    
    @objc func onPinpointClose(_ wemapController: wemapsdk) {
        if(self.onPinpointClose == nil) { return }
        self.onPinpointClose!(["value": true])
    }
    
    @objc func onGuidingStarted(_ wemapController: wemapsdk) {
        if(self.onGuidingStarted == nil) { return }
        self.onGuidingStarted!(["value": true])
    }
    
    @objc func onGuidingStopped(_ wemapController: wemapsdk) {
        if(self.onGuidingStopped == nil) { return }
        self.onGuidingStopped!(["value": true])
    }
    
    @objc func onBookEventClicked(_ wemapController: wemapsdk, event: WemapEvent) {
        if(self.onBookEventClicked == nil) { return }
        self.onBookEventClicked!(["value": event.id])
    }
    
    @objc func onGoToPinpointClicked(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onGoToPinpointClicked == nil) { return }
        self.onGoToPinpointClicked!(["value": pinpoint.id])
    }
}

@objc (WemapLivemapManager)
class WemapLivemapManager: RCTViewManager {
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc private func callLivemapMethod(_ node: NSNumber, selector: String, params: [String : Any]? = nil) {
        DispatchQueue.main.async {
            let livemap = self.bridge.uiManager.view(forReactTag: node) as! WemapLivemap
            livemap.perform(Selector((selector)), with: (params))
        }
    }
    
    @objc func openEventViaManager(_ node: NSNumber, id: NSNumber) {
        self.callLivemapMethod(node, selector: "openEvent:", params: ["id": id])
    }
    
    @objc func closeEventViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "closeEvent")
    }

    @objc func openPinpointViaManager(_ node: NSNumber, id: NSNumber) {
        self.callLivemapMethod(node, selector: "openPinpoint:", params: ["id": id])
    }
    
    @objc func closePinpointViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "closePinpoint")
    }
    
    @objc func setFiltersViaManager(_ node: NSNumber, tags: NSArray, query: NSString, startDate: NSString, endDate: NSString) {
        self.callLivemapMethod(node, selector: "setFilters:", params:["tags": tags, "query": query, "startDate": startDate, "endDate": endDate])
    }
    
    @objc func navigateToPinpointViaManager(_ node: NSNumber, id: NSNumber, startLocation: [NSString: NSNumber]?) {
        self.callLivemapMethod(node, selector: "navigateToPinpoint:", params: ["id": id, "startLocation": startLocation!])
    }
    
    @objc func stopNavigationViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "stopNavigation")
    }
 
    override func view() -> UIView! {
        return WemapLivemap()
    }
}

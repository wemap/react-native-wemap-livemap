import UIKit
import livemap_ios_sdk

@objc(WemapLivemap)
class WemapLivemap: UIView {
    let wemap = wemapsdk.sharedInstance
    
    // RN Config Props
    @objc var mapConfig: NSDictionary!
    
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
    @objc var onUserLogin: RCTBubblingEventBlock?
    @objc var onUserLogout: RCTBubblingEventBlock?
  
    override func didSetProps(_ changedProps: [String]!) {
        wemap.delegate = self
              
        _ = wemap.configure(config: wemapsdk_config(token: self.mapConfig!["token"] as? String, ufe: self.mapConfig["ufe"] as? Bool, emmid: self.mapConfig!["emmid"] as? Int, webappEndpoint: self.mapConfig!["webappEndpoint"] as? String)).presentIn(view: self)
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
    
    @objc func navigateToPinpoint(id: NSNumber) {
        wemap.navigateToPinpoint(WemapPinpointId: id as! Int)
    }
    
    @objc func stopNavigation() {
        wemap.stopNavigation()
    }
    
    @objc func signInByToken(_ params: [String : Any]) {
        wemap.signInByToken(accessToken: params["accessToken"] as! String, refreshToken: params["refreshToken"]! as! String)
    }
}

extension WemapLivemap: wemapsdkViewDelegate {
    @objc func waitForReady(_ wemapController: wemapsdk) {
        if(self.onMapReady == nil) { return }
        self.onMapReady!(nil)
    }
    
    @objc func onEventOpen(_ wemapController: wemapsdk, event: WemapEvent) {
        if(self.onEventOpen == nil) { return }
        self.onEventOpen!(["id": event.id])
    }
    
    @objc func onPinpointOpen(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onPinpointOpen == nil) { return }
        self.onPinpointOpen!(["id": pinpoint.id])
    }
    
    @objc func onEventClose(_ wemapController: wemapsdk) {
        if(self.onEventClose == nil) { return }
        self.onEventClose!(nil)
    }
    
    @objc func onPinpointClose(_ wemapController: wemapsdk) {
        if(self.onPinpointClose == nil) { return }
        self.onPinpointClose!(nil)
    }
    
    @objc func onGuidingStarted(_ wemapController: wemapsdk) {
        if(self.onGuidingStarted == nil) { return }
        self.onGuidingStarted!(nil)
    }
    
    @objc func onGuidingStopped(_ wemapController: wemapsdk) {
        if(self.onGuidingStopped == nil) { return }
        self.onGuidingStopped!(nil)
    }
    
    @objc func onBookEventClicked(_ wemapController: wemapsdk, event: WemapEvent) {
        if(self.onBookEventClicked == nil) { return }
        self.onBookEventClicked!(["id": event.id])
    }
    
    @objc func onGoToPinpointClicked(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onGoToPinpointClicked == nil) { return }
        self.onGoToPinpointClicked!(["id": pinpoint.id])
    }
    
    @objc func onUserLogin(_ wemapController: wemapsdk) {
        if(self.onUserLogin == nil) { return }
        self.onUserLogin!(nil)
    }
    
    @objc func onUserLogout(_ wemapController: wemapsdk) {
        if(self.onUserLogout == nil) { return }
        self.onUserLogout!(nil)
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
    
    @objc func setFiltersViaManager(_ node: NSNumber, startDate: NSString, endDate: NSString, query: NSString, tags: NSArray) {
        self.callLivemapMethod(node, selector: "setFilters:", params:["tags": tags, "query": query, "startDate": startDate, "endDate": endDate])
    }
    
    @objc func navigateToPinpointViaManager(_ node: NSNumber, id: NSNumber) {
        self.callLivemapMethod(node, selector: "navigateToPinpoint:", params: ["id": id])
    }
    
    @objc func stopNavigationViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "stopNavigation")
    }
    
    @objc func signInByTokenViaManager(_ node: NSNumber, accessToken: NSString, refreshToken: NSString) {
        self.callLivemapMethod(node, selector: "signInByToken:", params: ["accessToken": accessToken, "refreshToken": refreshToken])
    }
 
    override func view() -> UIView! {
        return WemapLivemap()
    }
}

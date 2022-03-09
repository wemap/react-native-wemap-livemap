// IMPORTANT:
// selectors without parameters must not have a column ":"

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
    @objc var onUrlChange: RCTBubblingEventBlock?
    @objc var onMapMoved: RCTBubblingEventBlock?
    @objc var onMapClick: RCTBubblingEventBlock?
    @objc var onMapLongClick: RCTBubblingEventBlock?

    override func didSetProps(_ changedProps: [String]!) {
        wemap.delegate = self

        var bounds: BoundingBox? = nil
        if let boundsDict = self.mapConfig!["maxbounds"] as? NSDictionary {
            if let parsedStruct: BoundingBox = wemapsdk_config.boundingBoxFromNSDictionary(dict: boundsDict) {
                bounds = parsedStruct
            }
        }
        _ = wemap.configure(config: wemapsdk_config(
            token: self.mapConfig!["token"] as? String,
            mapId: self.mapConfig!["emmid"] as? Int,
            livemapRootUrl: self.mapConfig!["webappEndpoint"] as? String,
            maxbounds: bounds
        )).presentIn(view: self)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    init() {
        super.init(frame: CGRect.zero)
    }

    override func layoutSubviews() {
        super.layoutSubviews()

        if #available(iOS 11.0, *) {
            wemap.frame.origin.x = -safeAreaInsets.left
            wemap.frame.origin.y = -safeAreaInsets.top
            wemap.frame.size.height = self.frame.height + safeAreaInsets.top + safeAreaInsets.bottom
            wemap.frame.size.width = self.frame.width + safeAreaInsets.left + safeAreaInsets.right
        } else {
            wemap.frame.origin.x = -layoutMargins.left
            wemap.frame.origin.y = -layoutMargins.top
            wemap.frame.size.height = self.frame.height + layoutMargins.top + layoutMargins.bottom
            wemap.frame.size.width = self.frame.width + layoutMargins.left + layoutMargins.right
        }
    }

    // RN Methods
    @objc func openEvent(_ params: [String : Any]?) {
        wemap.openEvent(WemapEventId: params?["id"] as! Int)
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

    @objc func setFilters(_ params: [String : Any]) {
        let filters = WemapFilters(tags: params["tags"] as? Array<String>, query: params["query"] as? String, startDate: params["startDate"] as? String, endDate: params["endDate"] as? String)
        wemap.setFilters(WemapFilters: filters)
    }

    @objc func navigateToPinpoint(id: NSNumber) {
        wemap.navigateToPinpoint(WemapPinpointId: id as! Int)
    }

    @objc func stopNavigation() {
        wemap.stopNavigation()
    }

    @objc func signInByToken(_ params: [String : Any]) {
        wemap.signInByToken(accessToken: params["accessToken"] as! String)
    }

    @objc func enableSidebar() {
        wemap.enableSidebar()
    }

    @objc func disableSidebar() {
        wemap.disableSidebar()
    }

    @objc func loadMapUrl() {
        wemap.loadMapUrl()
    }

    @objc func setPinpoints(_ params: [String : Any]) {
        wemap.setPinpoints(WemapPinpoints: params["wemapPinpoints"] as! [WemapPinpoint])
    }

    @objc func signOut() {
        wemap.signOut()
    }

    @objc func setSourceLists(_ params: [String : Any]) {
        wemap.setSourceLists(sourceLists: params["sourceLists"] as! [Int])
    }

    @objc func aroundMe() {
        wemap.aroundMe()
    }
}

extension WemapLivemap: wemapsdkViewDelegate {
    private func getLivemapEvent (json: [AnyHashable : Any]) -> [String: [AnyHashable : Any]] {
        return ["value": json]
    }

    @objc func onMapMoved(_ wemapController: wemapsdk, json: NSDictionary) {
        if (self.onMapMoved == nil) { return }
        let livemapEvent = getLivemapEvent(json: (json as? [AnyHashable : Any])!)
        self.onMapMoved!(livemapEvent)
    }

    @objc func onMapClick(_ wemapController: wemapsdk, json: NSDictionary) {
        if (self.onMapClick == nil) { return }
        let livemapEvent = getLivemapEvent(json: (json as? [AnyHashable : Any])!)
        self.onMapClick!(livemapEvent)
    }

    @objc func onMapLongClick(_ wemapController: wemapsdk, json: NSDictionary) {
        if (self.onMapLongClick == nil) { return }
        let livemapEvent = getLivemapEvent(json: (json as? [AnyHashable : Any])!)
        self.onMapLongClick!(livemapEvent)
    }

    @objc func waitForReady(_ wemapController: wemapsdk) {
        if(self.onMapReady == nil) { return }
        self.onMapReady!(nil)
    }

    @objc func onEventOpen(_ wemapController: wemapsdk, event: WemapEvent) {
        if(self.onEventOpen == nil) { return }
        let livemapEvent = getLivemapEvent(json: ["id": event.id])
        self.onEventOpen!(livemapEvent)
    }

    @objc func onPinpointOpen(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onPinpointOpen == nil) { return }
        let livemapEvent = getLivemapEvent(json: (pinpoint.data as? [AnyHashable : Any])!)
        self.onPinpointOpen!(livemapEvent)
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
        let livemapEvent = getLivemapEvent(json: ["id": event.id])
        self.onBookEventClicked!(livemapEvent)
    }

    @objc func onGoToPinpointClicked(_ wemapController: wemapsdk, pinpoint: WemapPinpoint) {
        if(self.onGoToPinpointClicked == nil) { return }
        let livemapEvent = getLivemapEvent(json: ["id": pinpoint.id])
        self.onGoToPinpointClicked!(livemapEvent)
    }

    @objc func onUserLogin(_ wemapController: wemapsdk) {
        if(self.onUserLogin == nil) { return }
        self.onUserLogin!(nil)
    }

    @objc func onUserLogout(_ wemapController: wemapsdk) {
        if(self.onUserLogout == nil) { return }
        self.onUserLogout!(nil)
    }

    @objc func onUrlChange(_ wemapController: wemapsdk, previousUrl: String, nextUrl: String) {
        if(self.onUrlChange == nil) { return }
        let livemapEvent = getLivemapEvent(json: ["previousUrl": previousUrl, "nextUrl": nextUrl])
        self.onUrlChange!(livemapEvent)
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

    @objc func signInByTokenViaManager(_ node: NSNumber, accessToken: NSString) {
        self.callLivemapMethod(node, selector: "signInByToken:", params: ["accessToken": accessToken])
    }

    @objc func enableSidebarViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "enableSidebar")
    }

    @objc func disableSidebarViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "disableSidebar")
    }

    @objc func loadMapUrlViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "loadMapUrl")
    }

    @objc func setPinpointsViaManager(_ node: NSNumber, pinpoints: [NSDictionary]) {
        let wemapPinpoints = pinpoints.map{ WemapPinpoint($0) }
        self.callLivemapMethod(node, selector: "setPinpoints:", params: ["wemapPinpoints": wemapPinpoints])
    }

    @objc func signOutViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "signOut")
    }

    @objc func setSourceListsViaManager(_ node: NSNumber, sourceLists: [NSInteger]) {
        self.callLivemapMethod(node, selector: "setSourceLists:", params: ["sourceLists": sourceLists])
    }

    @objc func aroundMeViaManager(_ node: NSNumber) {
        self.callLivemapMethod(node, selector: "aroundMe")
    }

    override func view() -> UIView! {
        return WemapLivemap()
    }
}

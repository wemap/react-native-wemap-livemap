# Getting started
## Wemap iOS SDK

The Wemap iOS SDK is a library that will handle communication with the Wemap application.

The SDK offers an interface to manage the Livemap Mapview and to subscribe to events that happen on the map.

Please get your `emmid` and `token` from your pro account. You may ask for one if necessary or you can test with our developers credentials if you lack time.

## How to use the IOS SDK

To integrate the Wemap SDK in your mobile application the key steps will be:

- install Wemap SDK (require access to framework)
- instantiate the Wemap application (require access ACCESS_TOKEN)
- register callbacks related to actions in the Wemap application
- handle the map as needed.

### 1. Install the Wemap SDK

Embed framework to your application:

- Copy wemapsdk.framework to your project folder
- In project settings: `General/Linked Frameworks and Libraries` add wemapsdk.framework
- For Objective-C applications - in project settings "Build Settings/Build Options" specify "yes" for option "Always Embed Swift Standard Libraries"

- Into Info.plist add new records:
    - NSLocationWhenInUseUsageDescription
    - NSCameraUsageDescription
    - NSMicrophoneUsageDescription

### 2. Instanciate map

The `WemapViewController` provides an infrastructure for your application to manage Wemap Livemap. You are able to create instances of `WemapViewController` subclasses and use those objects to provide the specific behaviors that you need. You are able to specify these properties in subclass or Interface Builder:

  - emmid: Livemap Id provided to you by wemap team, or get from pro.getwemap.com platform. This id refers to a specific Livemap remote configuration.

  - token: wemap customer token id, provided by wemap team, or get from pro.getwemap.com platform. This token is specific for your customer account.

```swift
import UIKit
import livemap_ios_sdk

class ViewController: UIViewController, wemapsdkViewDelegate {
    let wemap = wemapsdk.sharedInstance

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        wemap.delegate = self
        
        _ = wemap.configure(
            config: wemapsdk_config(
                token: "GUHTU6TYAWWQHUSR5Z5JZNMXX",
                mapId: 19158
            )
        )
        .presentIn(view: self.view)
    }

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()

        wemap.frame = self.view.bounds
    }
}
```

A token is necessary.
There is  here a code sample that works.
https://github.com/wemap/livemap-ios-sdk-sample.git

### 3. Interact with the map

#### Delegate

Use your own `WemapDelegate` implementation. Delegate provides a mechanism for your application to take action on events that occur in the `WemapViewController`.

The `WemapDelegate` protocol provides a mechanism for your application to take action on events that occur in the `WemapViewController`. You can make use of these calls by assigning an object to the `WemapViewController` delegate property directly or connect through Interface Builder.

  - `waitForReady()`

This command will be called as soon as livemap script finish loading and prepare all data.

  - `onEventOpen(WemapEventId: Int)`

Function will be executed when an event is open.

  - `onPinpointOpen(WemapPinpointId: Int)`

Function will be executed when a pinpoint is open.

  - `onEventClose()`

Function will be executed when an event is closed.

  - `onPinpointClose()`

Function will be executed when a pinpoint is closed.

#### WemapViewController

The `WemapViewController` provides a handler property which returns object to control Livemap features, conform to `WemapHandlerProtocol`. The `WemapHandlerProtocol` provides a mechanism for your application to handle features of `WemapViewController`.

  - `openEvent(WemapEventId: Int)`

Open an event on the map.

  - `openPinpoint(WemapPinpointId: Int)`

Open an pinpoint on the map.

  - `closeEvent()`

Close the current opened event. Go to the search view.

  - `closePinpoint()`

Close the current opened pinpoint. Go to the search view.

  - `setFilters(WemapFilters)`

Update search filters (dates, tags, text);
`WemapFilters` is an object of Filters to apply to the search.

  - `navigateToPinpoint(WemapPinpointId: Int)`

Start the navigation to a pinpoint from an absolute navigation based on the internal geolocation system.

  - `stopNavigation()`

Stop the currently running navigation.

For more details, please consult the dedicated section of the documentation.

## Code sample

https://github.com/wemap/livemap-ios-sdk-sample/blob/master/livemap-ios-sdk-sample/ViewController.swift

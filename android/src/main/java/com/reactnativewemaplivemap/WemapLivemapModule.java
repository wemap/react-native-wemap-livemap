package com.reactnativewemaplivemap;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

class WemapLivemapModule extends ReactContextBaseJavaModule {

  public WemapLivemapModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "WemapLivemap";
  }

  // Example method
  // See https://facebook.github.io/react-native/docs/native-modules-android
  @ReactMethod
  public void multiply(int a, int b, Promise promise) {

    promise.resolve(a * b);

  }
}

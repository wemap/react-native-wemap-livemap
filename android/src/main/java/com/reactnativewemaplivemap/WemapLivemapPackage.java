package com.reactnativewemaplivemap;

import androidx.annotation.NonNull;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

class WemapLivemapPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    return Collections.singletonList(new WemapLivemapModule(reactContext));
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return new ArrayList<>();
  }


}

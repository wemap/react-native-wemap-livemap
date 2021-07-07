package com.reactnativewemaplivemap;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = WemapLivemapModule.MODULE_NAME)
public class WemapLivemapModule extends ReactContextBaseJavaModule implements ActivityEventListener {
  public static final String MODULE_NAME = "WemapLivemap";

  private WemapLivemap mLivemapView;

  public WemapLivemapModule(ReactApplicationContext reactContext) {
    super(reactContext);
    reactContext.addActivityEventListener(this);
  }

  @Override
  public String getName() {
    return MODULE_NAME;
  }

  public void setLivemapView(WemapLivemap view) {
    mLivemapView = view;
  }

  @Override
  public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    if (mLivemapView != null) {
      mLivemapView.onActivityResult(requestCode, resultCode, data);
    }
  }

  @Override
  public void onNewIntent(Intent intent) {
  }
}

package com.reactnativewemaplivemap;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.getwemap.livemap.sdk.model.Coordinates;
import com.getwemap.livemap.sdk.options.PolylineOptions;
import com.reactnativewemaplivemap.utils.ReactNativeJson;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

@ReactModule(name = WemapLivemapModule.MODULE_NAME)
public class WemapLivemapModule extends ReactContextBaseJavaModule implements ActivityEventListener {
  public static final String MODULE_NAME = "WemapLivemapModule";

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

  @ReactMethod
  public void drawPolylineViaModule(ReadableArray coordinatesReadableArray, ReadableMap optionsReadableMap, Promise promise) {
    List<Coordinates> coordinatesList = new ArrayList();
    for (int i = 0; i < coordinatesReadableArray.size(); i++) {
      ReadableMap coordinatesMap = coordinatesReadableArray.getMap(i);
      try {
        JSONObject coordinatesJson = ReactNativeJson.convertMapToJson(coordinatesMap);
        Coordinates coordinates = Coordinates.fromJson(coordinatesJson);
        coordinatesList.add(coordinates);
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }

    PolylineOptions options = new PolylineOptions();

    if(optionsReadableMap != null) {
      if(optionsReadableMap.hasKey("color")) {
        options.color = Color.parseColor(optionsReadableMap.getString("color"));
      }
      if(optionsReadableMap.hasKey("opacity")) {
        options.opacity = (float) optionsReadableMap.getDouble("opacity");
      }
      if(optionsReadableMap.hasKey("width")) {
        options.width = (float) optionsReadableMap.getDouble("width");
      }
      if(optionsReadableMap.hasKey("useNetwork")) {
        options.useNetwork = optionsReadableMap.getBoolean("useNetwork");
      }
    }

    mLivemapView.livemap.drawPolyline(coordinatesList, options, id -> promise.resolve(id));
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

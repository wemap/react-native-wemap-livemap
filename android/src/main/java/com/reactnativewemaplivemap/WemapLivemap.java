package com.reactnativewemaplivemap;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.getwemap.livemap.sdk.Livemap;
import com.getwemap.livemap.sdk.LivemapView;
import com.getwemap.livemap.sdk.OnLivemapReadyCallback;
import com.reactnativewemaplivemap.utils.ReactNativeJson;

import org.json.JSONException;

public class WemapLivemap extends LivemapView implements OnLivemapReadyCallback {

  public Livemap livemap;

  public WemapLivemap(Context context) {
    super(context);
    this.getLivemapAsync(this);
  }

  private void sendNativeEvent(String name, BuildEvent buildEvent) {
    WritableMap event = Arguments.createMap();

    buildEvent.build(event);

    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), name + "Event", event);
  }

  @Override
  public void onLivemapReady(Livemap livemap) {
    Log.e("onLivemapReady", "map ready");
    this.livemap = livemap;

    sendNativeEvent("onMapReady", event -> event.putNull("value"));

    livemap.addPinpointOpenListener((pinpoint) -> sendNativeEvent("onPinpointOpen", e -> {
      e.putInt("id", pinpoint.getId());
      e.putString("name", pinpoint.getName());
      e.putString("description", pinpoint.getDescription());
      e.putDouble("latitude", pinpoint.getLatLngAlt().getLat());
      e.putDouble("longitude", pinpoint.getLatLngAlt().getLng());
      try {
        e.putMap("external_data", ReactNativeJson.convertJsonToMap(pinpoint.getExternalData()));
      } catch (JSONException jsonProcessingException) {
        jsonProcessingException.printStackTrace();
      }
    }));
    livemap.addPinpointCloseListener(() -> sendNativeEvent("onPinpointClose", e -> e = null));
    livemap.addUserLoginListener(() -> sendNativeEvent("onUserLogin", e -> e = null));
    livemap.addUserLogoutListener(() -> sendNativeEvent("onUserLogout", e -> e = null));
    livemap.addEventOpenListener((event) -> sendNativeEvent("onEventOpen", e -> e.putInt("id", event.getId())));
    livemap.addEventCloseListener(() -> sendNativeEvent("onEventClose", e -> e = null));
    livemap.addGuidingStartedListener(() -> sendNativeEvent("onGuidingStarted", e -> e = null));
    livemap.addGuidingStoppedListener(() -> sendNativeEvent("onGuidingStopped", e -> e = null));

    this.setUrlChangeListener((previousUrl, nextUrl) -> sendNativeEvent("onUrlChange", e -> {
      e.putString("previousUrl", previousUrl);
      e.putString("nextUrl", nextUrl);
    }));
  }

  interface BuildEvent {
    void build(WritableMap event);
  }
}

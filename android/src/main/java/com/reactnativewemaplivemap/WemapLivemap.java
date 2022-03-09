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
import java.lang.NullPointerException;

public class WemapLivemap extends LivemapView implements OnLivemapReadyCallback {

  public Livemap livemap;

  public WemapLivemap(Context context) {
    super(context);
    this.getLivemapAsync(this);
  }

  private void sendNativeEvent(String name, BuildEvent buildEvent) {
    WritableMap event = Arguments.createMap();
    WritableMap eventValue = Arguments.createMap();

    buildEvent.build(eventValue);
    event.putMap("value", eventValue);

    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), name + "Event", event);
  }

  private void sendNativeEvent(String name) {
    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), name + "Event", null);
  }

  @Override
  public void onLivemapReady(Livemap livemap) {
    Log.e("onLivemapReady", "map ready");
    this.livemap = livemap;

    sendNativeEvent("onMapReady");

    livemap.addPinpointOpenListener((pinpoint) -> sendNativeEvent("onPinpointOpen", e -> {
      e.putInt("id", pinpoint.getId());
      e.putString("name", pinpoint.getName());
      e.putString("description", pinpoint.getDescription());
      e.putDouble("latitude", pinpoint.getLatLngAlt().getLat());
      e.putDouble("longitude", pinpoint.getLatLngAlt().getLng());
      e.putString("image_url", pinpoint.getImageUrl());
      e.putString("media_url", pinpoint.getMediaUrl());
      e.putString("media_type", pinpoint.getMediaType());
      try {
        e.putArray("tags", ReactNativeJson.convertJsonToArray(pinpoint.getTags()));
      } catch (JSONException | NullPointerException jsonProcessingException) {
        jsonProcessingException.printStackTrace();
      }
      try {
        e.putMap("geo_entity_shape", ReactNativeJson.convertJsonToMap(pinpoint.getGeoEntityShape()));
      } catch (JSONException | NullPointerException jsonProcessingException) {
        jsonProcessingException.printStackTrace();
      }
      try {
        e.putMap("external_data", ReactNativeJson.convertJsonToMap(pinpoint.getExternalData()));
      } catch (JSONException | NullPointerException jsonProcessingException) {
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
    livemap.addMapMovedListener((mapMoved) -> sendNativeEvent("onMapMoved", e -> {
      e.putDouble("zoom", mapMoved.zoom);
      //e.put("bounds", mapMoved.bounds.toJson());
      e.putDouble("latitude", mapMoved.point.getLat());
      e.putDouble("longitude", mapMoved.point.getLng());
      try {
          e.putMap("bounds", ReactNativeJson.convertJsonToMap(mapMoved.bounds.toJson(mapMoved.bounds)));
      } catch (JSONException | NullPointerException jsonProcessingException) {
          jsonProcessingException.printStackTrace();
      }
    }));
    livemap.addMapClickListener((point) -> sendNativeEvent("onMapClick", e -> {
        e.putDouble("latitude", point.getLat());
        e.putDouble("longitude", point.getLng());
    }));
    livemap.addMapLongClickListener((point) -> sendNativeEvent("onMapLongClick", e -> {
        e.putDouble("latitude", point.getLat());
        e.putDouble("longitude", point.getLng());
    }));

    this.setUrlChangeListener((previousUrl, nextUrl) -> sendNativeEvent("onUrlChange", e -> {
      e.putString("previousUrl", previousUrl);
      e.putString("nextUrl", nextUrl);
    }));
  }

  interface BuildEvent {
    void build(WritableMap event);
  }
}

package com.reactnativewemaplivemap;


import android.app.Activity;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.getwemap.livemap.sdk.LivemapOptions;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.getwemap.livemap.sdk.model.Filters;
import com.getwemap.livemap.sdk.model.Pinpoint;
import com.reactnativewemaplivemap.utils.ReactNativeJson;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@ReactModule(name = WemapLivemapManager.REACT_CLASS)
public class WemapLivemapManager extends SimpleViewManager<WemapLivemap> {

  public static final String REACT_CLASS = "WemapLivemap";
  private ThemedReactContext mContext;

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  public static WemapLivemapModule getModule(ReactContext reactContext) {
    return reactContext.getNativeModule(WemapLivemapModule.class);
  }

  private PermissionAwareActivity getPermissionAwareActivity() {
    Activity activity = mContext.getCurrentActivity();
    if (activity == null) {
      throw new IllegalStateException("Tried to use permissions API while not attached to an Activity.");
    } else if (!(activity instanceof PermissionAwareActivity)) {
      throw new IllegalStateException("Tried to use permissions API but the host Activity doesn't implement PermissionAwareActivity.");
    }
    return (PermissionAwareActivity) activity;
  }

  @ReactProp(name = "mapConfig")
  public void setMapConfig(WemapLivemap view, ReadableMap mapConfig) {

    LivemapOptions livemapOptions = new LivemapOptions();

    if (mapConfig.hasKey("webappEndpoint")) {
      livemapOptions.webappEndpoint = mapConfig.getString("webappEndpoint");
    }

    if (mapConfig.hasKey("enableProviders")) {
      livemapOptions.enableProviders = mapConfig.getBoolean("enableProviders");
    }

    if (mapConfig.hasKey("ufe") && mapConfig.getBoolean("ufe")) {
      livemapOptions.ufe = mapConfig.getBoolean("ufe");
    } else {
      livemapOptions.emmid = mapConfig.getInt("emmid");
      livemapOptions.token = mapConfig.getString("token");
      try {
          ReadableMap boundsMap = mapConfig.getMap("maxbounds");
          if (boundsMap != null) {
              JSONObject maxbounds = ReactNativeJson.convertMapToJson(boundsMap);
              livemapOptions.maxbounds = livemapOptions.maxbounds.fromJson(maxbounds);
          }
      } catch (JSONException | NullPointerException jsonProcessingException) {
          jsonProcessingException.printStackTrace();
      }
    }

    view.setLivemapOptions(livemapOptions);
    view.loadMap(this.mContext);
    initializePermissionsManager(view);
    initializeStartActivityForResult(view);
  }

  private void initializePermissionsManager(WemapLivemap view) {
    view.setRequestPermissionsListener((sdkPermissions, sdkRequestCode) -> {
      PermissionAwareActivity activity = getPermissionAwareActivity();
      activity.requestPermissions(sdkPermissions, sdkRequestCode,
        (requestCode, permissions, grantResults) -> {
          view.onRequestPermissionsResult(requestCode, permissions, grantResults);
          return false;
        });
    });
  }

  private void initializeStartActivityForResult(WemapLivemap view) {
    getModule(mContext).setLivemapView(view);
    view.setStartActivityForResultListener((intent, requestCode)
      -> mContext.getCurrentActivity().startActivityForResult(intent, requestCode));
  }

  @NonNull
  @Override
  protected WemapLivemap createViewInstance(@NonNull ThemedReactContext reactContext) {
    this.mContext = reactContext;
    return new WemapLivemap(reactContext);
  }

  @Nullable
  @Override
  public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {

    MapBuilder.Builder events = MapBuilder.builder();

    String[] eventNames = new String[]{
      "onMapMoved",
      "onMapClick",
      "onMapLongClick",
      "onMapReady",
      "onPinpointOpen",
      "onPinpointClose",
      "onUserLogin",
      "onUserLogout",
      "onEventOpen",
      "onEventClose",
      "onGuidingStarted",
      "onGuidingStopped",
      "onUrlChange",
      "onContentUpdated"
    };

    for (String eventName : eventNames) {
      Map eventHandler = MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", eventName));
      events.put(eventName + "Event", eventHandler);
    }

    return events.build();
  }

  @Override
  public void receiveCommand(@NonNull WemapLivemap root, String commandId, @Nullable ReadableArray args) {
    super.receiveCommand(root, commandId, args);

    switch (commandId) {
      case "openEventViaManager":
        root.livemap.openEvent(args.getInt(0));
        break;
      case "closeEventViaManager":
        root.livemap.closeEvent();
        break;
      case "openPinpointViaManager":
        root.livemap.openPinpoint(args.getInt(0));
        break;
      case "closePinpointViaManager":
        root.livemap.closePinpoint();
        break;
      case "setFiltersViaManager":
        Filters filters = new Filters(args.getString(0), args.getString(1), args.getString(2), (String[]) args.getArray(3).toArrayList().toArray());
        root.livemap.setFilters(filters);
        break;
      case "navigateToPinpointViaManager":
        root.livemap.navigateToPinpoint(args.getInt(0));
        break;
      case "stopNavigationViaManager":
        root.livemap.stopNavigation();
        break;
      case "signInByTokenViaManager":
        root.livemap.signInByToken(args.getString(0));
        break;
      case "enableSidebarViaManager":
          root.livemap.enableSidebar();
        break;
      case "disableSidebarViaManager":
          root.livemap.disableSidebar();
        break;
      case "setPinpointsViaManager":
        List<Pinpoint> pinpoints = new ArrayList();
        ReadableArray readableArray = args.getArray(0);

        for (int i = 0; i < readableArray.size(); i++) {
          ReadableMap pinpointMap = readableArray.getMap(i);
          try {
            JSONObject json = ReactNativeJson.convertMapToJson(pinpointMap);
            Pinpoint pinpoint = Pinpoint.fromJson(json);
            pinpoints.add(pinpoint);
          } catch (JSONException e) {
            e.printStackTrace();
          }
        }
        root.livemap.setPinpoints(pinpoints);
        break;
      case "loadMapUrlViaManager":
        root.loadMapUrl();
        break;
      case "signOutViaManager":
          root.livemap.signOut();
        break;
      case "setSourceListsViaManager":
          List<Integer> result = new ArrayList();
          try {
              ReadableArray readableArray2 = args.getArray(0);
              ArrayList<Object> array2 = readableArray2.toArrayList();
              for (int i = 0; i < array2.size(); i++) {
                  Double val1 = (Double)array2.get(i);
                  Integer val2 = val1.intValue();
                  result.add(val2);
              }
          } catch (Exception e) {
              e.printStackTrace();
          }
          root.livemap.setSourceLists(result);
        break;
      case "aroundMeViaManager":
          root.livemap.aroundMe();
        break;
    }
  }
}

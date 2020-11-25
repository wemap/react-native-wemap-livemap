package com.reactnativewemaplivemap;


import com.getwemap.livemap.sdk.LivemapOptions;
import com.getwemap.livemap.sdk.LivemapView;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;


public class WemapLivemapManager extends SimpleViewManager<LivemapView> {

  public static final String REACT_CLASS = "WemapLivemap";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public LivemapView createViewInstance(ThemedReactContext context) {

    LivemapOptions options = new LivemapOptions();
    options.emmid = 9432;

    return new LivemapView(context, options);
  }

}

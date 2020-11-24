package com.reactnativewemaplivemap;

import android.content.Context;
import android.view.LayoutInflater;

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
    LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    return (LivemapView) inflater.inflate(R.layout.wemap_livemap, null);
  }

}

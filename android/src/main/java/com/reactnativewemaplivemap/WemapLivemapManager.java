package com.reactnativewemaplivemap;

import android.content.Context;
import android.view.LayoutInflater;

import com.facebook.react.common.MapBuilder.Builder;

import com.reactnativewemaplivemap.R;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class WemapLivemapManager extends SimpleViewManager<WemapLivemap> {

    public static final String REACT_CLASS = "WemapLivemap";

    @Override
    public String getName() { return REACT_CLASS; }

    @Override
    public WemapLivemap createViewInstance(ThemedReactContext context) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        WemapLivemap view = (WemapLivemap)inflater.inflate(R.layout.wemap_livemap, null);
        return view;
    }

    @ReactProp(name = "status")
    public void setStatus(WemapLivemap view, Boolean status) {
        view.setStatus(status);
    }

    public Map getExportedCustomBubblingEventTypeConstants() {

        String eventName = "onClickEvent";
        String propName = "onClick";
        Map onClickHandler = MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", propName));

        Builder events = MapBuilder.builder();
        events.put(eventName, onClickHandler);
        return events.build();

    }

}
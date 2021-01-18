package com.reactnativewemaplivemap;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.View;
import android.widget.RelativeLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class WemapLivemap extends RelativeLayout {

    private boolean status = false;

    public WemapLivemap(Context context) {
        super(context);
    }

    public WemapLivemap(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public WemapLivemap(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public void onFinishInflate() {
        super.onFinishInflate();

        this.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                WemapLivemap.this.onClick();
            }
        });
    }

    public void setStatus(boolean status) {
        this.status = status;
        setBackgroundColor( this.status ? Color.GREEN : Color.RED);
    }

    public void onClick() {
        WritableMap event = Arguments.createMap();

        event.putString("value1","react demo");
        event.putInt("value2",1);

        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(getId(), "onClickEvent", event);
    }

}
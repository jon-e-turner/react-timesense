package com.timesense

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.TimesenseViewManagerInterface
import com.facebook.react.viewmanagers.TimesenseViewManagerDelegate

@ReactModule(name = TimesenseViewManager.NAME)
class TimesenseViewManager : SimpleViewManager<TimesenseView>(),
  TimesenseViewManagerInterface<TimesenseView> {
  private val mDelegate: ViewManagerDelegate<TimesenseView>

  init {
    mDelegate = TimesenseViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<TimesenseView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): TimesenseView {
    return TimesenseView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: TimesenseView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "TimesenseView"
  }
}

# 通用可配项

<Toc />

`Appearance.swift` 是容纳了所有可配项的类。这些可配项都有默认值，如果要修改某些配置项，需要在初始化对应 UI 控件之前修改其中的属性，配置项才生效。

注意下述 `value` 为要设置的值，会改变对应配置项的 UI 样式或者数据源等。请查看[源码](https://github.com/Shengwang-Community/ShengwangChat-UIKit-ios)后使用。

## 设置底部弹窗页面样式

`Appearance.pageContainerConstraintsSize = value`：底部弹窗页面的宽度和高度。主要使用类在 Xcode 中查找到 `PageContainersDialogController.swift` 查看该属性。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/configurationitem/common/message_report_bottom.png" title="消息审核弹窗" />
</ImageGallery>

## 设置 Alert 的样式

1. `Appearance.alertContainerConstraintsSize = value`：Alert 居中类型弹窗的宽度和高度。主要使用类在 Xcode 中查找到 `AlertController.swift`。

2. `Appearance.alertStyle = value`：弹窗的圆角样式，即是大圆角还是小圆角。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/configurationitem/common/alert_radius_large.png" title="大圆角" />
  <ImageItem src="/images/uikit/chatuikit/ios/configurationitem/common/alert_radius_small.png" title="小圆角" />
</ImageGallery>

## 设置页面色调

1. `Appearance.primaryHue = value`：主色调，用于按钮、输入框等控件的背景色。

2. `Appearance.secondaryHue = value`：辅色调，用于按钮、输入框等控件的背景色。

3. `Appearance.errorHue = value`：错误色调。

4. `Appearance.neutralHue = value`：中性色调。

5. `Appearance.neutralSpecialHue = value`：中性特殊色调。

## 设置头像

1. `Appearance.avatarRadius = value`：头像圆角，分为极小、小、中、大等四个等级。

2. `Appearance.avatarPlaceHolder = value` 头像占位图。

## 设置 ActionSheet Cell 的行高

`Appearance.actionSheetRowHeight = value`：ActionSheet Cell 的行高。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/configurationitem/common/conversation_operation_row_height.png" title="ActionSheet Cell 的行高" />
</ImageGallery>























# 常见问题

**Q**：如果推送通知栏未展示推送通知，是什么原因？

**A**：你可以按照以下顺序排查：

1. 查看 Android 端通知权限是否打开，即通道通知权限是否打开。

![image](/images/android/push/push_notification_channel_android.png)

2. 检查推送通知的接收用户是否存在。

![image](/images/android/push/push_notification_user_search.png)

3. 查看推送通知的接收用户是否绑定了推送信息。

![image](/images/android/push/push_notification_user_bind.png)

![image](/images/android/push/push_notification_user_bind_info.png)

4. 查看推送证书是否存和证书推送测试。

在[声网控制台](https://console.easemob.com) 的 **即时通讯** > **功能配置** > **消息推送** > **证书管理**页面选择要测试的推送证书（用户绑定的推送证书），选择 **更多** > **测试**。

![image](/images/android/push/push_notification_test.png)

在弹出的 **测试推送证书** 对话框中输入用户绑定的**设备Token**、**推送标题**、**推送内容**，然后点击**测试**，返回对应平台的测试结果。

![image](/images/android/push/huawei_push_notification_test.png)

5. 查看是否超过了厂商通道限制。

详见[推送消息分类](push_message_classification.html)。

1. 若以上均已排查后问题仍存在，请联系声网技术支持进一步排查问题原因。
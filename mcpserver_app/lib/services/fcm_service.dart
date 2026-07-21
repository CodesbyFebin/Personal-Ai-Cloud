import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
class FCMService {
  static Future<void> registerDevice(String agentId) async {
    final fcmToken = await FirebaseMessaging.instance.getToken();
    if (fcmToken == null) return;
    final prefs = await SharedPreferences.getInstance();
    final authToken = prefs.getString('auth_token');
    final deviceId = "android_${DateTime.now().millisecondsSinceEpoch}";
    await http.post(Uri.parse('https://mcpserver.in/api/android/register'), headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer $authToken' }, body: jsonEncode({ 'fcmToken': fcmToken, 'deviceId': deviceId, 'agentId': agentId }));
  }
  static void setupForegroundListener(Function(String) onMessageReceived) {
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      if (message.data['action'] == 'REFRESH_CHAT') { onMessageReceived(message.data['messageId'] ?? 'new'); }
    });
  }
}

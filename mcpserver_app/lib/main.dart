import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'widgets/login_screen.dart';
import 'widgets/chat_webview.dart';
import 'services/fcm_service.dart';
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async { await Firebase.initializeApp(); }
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  await FirebaseMessaging.instance.requestPermission();
  runApp(const McpServerApp());
}
class McpServerApp extends StatelessWidget {
  const McpServerApp({super.key});
  @override Widget build(BuildContext context) => MaterialApp(title: 'mcpserver.in', theme: ThemeData(primarySwatch: Colors.indigo, useMaterial3: true), home: const AuthWrapper());
}
class AuthWrapper extends StatefulWidget {
  const AuthWrapper({super.key});
  @override State<AuthWrapper> createState() => _AuthWrapperState();
}
class _AuthWrapperState extends State<AuthWrapper> {
  bool _isLoggedIn = false, _isLoading = true;
  @override void initState() { super.initState(); _checkLoginStatus(); }
  Future<void> _checkLoginStatus() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() { _isLoggedIn = prefs.getString('auth_token') != null; _isLoading = false; });
  }
  void onLoginSuccess(String token) async {
    await SharedPreferences.getInstance().then((p) => p.setString('auth_token', token));
    setState(() => _isLoggedIn = true);
  }
  void onLogout() async {
    await SharedPreferences.getInstance().then((p) => p.remove('auth_token'));
    setState(() => _isLoggedIn = false);
  }
  @override Widget build(BuildContext context) {
    if (_isLoading) return const Scaffold(body: Center(child: CircularProgressIndicator()));
    return _isLoggedIn ? ChatWebViewScreen(onLogout: onLogout) : LoginScreen(onLoginSuccess: onLoginSuccess);
  }
}

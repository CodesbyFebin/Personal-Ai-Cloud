import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
class LoginScreen extends StatefulWidget {
  final Function(String) onLoginSuccess;
  const LoginScreen({super.key, required this.onLoginSuccess});
  @override State<LoginScreen> createState() => _LoginScreenState();
}
class _LoginScreenState extends State<LoginScreen> {
  late final WebViewController _controller;
  @override void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel('FlutterBridge', onMessageReceived: (message) { widget.onLoginSuccess('mock_token'); })
      ..loadRequest(Uri.parse('https://mcpserver.in/api/auth/signin'));
  }
  @override Widget build(BuildContext context) => Scaffold(body: WebViewWidget(controller: _controller));
}

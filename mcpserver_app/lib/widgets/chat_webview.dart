import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/fcm_service.dart';
class ChatWebViewScreen extends StatefulWidget {
  final VoidCallback onLogout;
  const ChatWebViewScreen({super.key, required this.onLogout});
  @override State<ChatWebViewScreen> createState() => _ChatWebViewScreenState();
}
class _ChatWebViewScreenState extends State<ChatWebViewScreen> {
  late final WebViewController _controller;
  bool _isLoading = true;
  @override void initState() { super.initState(); _initWebView(); }
  void _initWebView() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token') ?? '';
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel('FlutterBridge', onMessageReceived: (JavaScriptMessage message) { if (message.message.contains('logout')) widget.onLogout(); })
      ..setNavigationDelegate(NavigationDelegate(onPageFinished: (url) {
        if (!mounted) return;
        setState(() => _isLoading = false);
        _controller.runJavaScript('window.localStorage.setItem("auth_token", "$token"); window.postMessage({ type: "APP_CONTEXT", isNativeApp: true }, "*");');
        FCMService.registerDevice('default-agent-id');
      }))
      ..loadRequest(Uri.parse('https://mcpserver.in'));
    FCMService.setupForegroundListener((messageId) {
      _controller.runJavaScript('window.dispatchEvent(new CustomEvent("fcm-new-message", {detail: "$messageId"}));');
    });
  }
  @override Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('mcpserver.in'), actions: [
      IconButton(icon: const Icon(Icons.refresh), onPressed: () => _controller.reload()),
      IconButton(icon: const Icon(Icons.logout), onPressed: () { _controller.runJavaScript('window.localStorage.removeItem("auth_token");'); widget.onLogout(); }),
    ]),
    body: Stack([WebViewWidget(controller: _controller), if (_isLoading) const Center(child: CircularProgressIndicator(color: Colors.indigo))]),
  );
}

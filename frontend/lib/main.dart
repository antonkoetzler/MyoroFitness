import 'package:flutter/material.dart';
import 'package:frontend/modules/food/screens/food_screen.dart';

void main() => runApp(const App());

final class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'MyoroFitness',
      home: FoodScreen(),
    );
  }
}

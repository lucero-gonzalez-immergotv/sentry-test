import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Sentry from "@sentry/react-native";
import React from 'react';
import { SENTRY_ENVIRONMENT } from '@env';
import { Button, View, StyleSheet } from 'react-native';
import NetworkLogger from 'react-native-network-logger';

Sentry.init({
  dsn: "https://immergo@tunel.immergo.tv/0010900117001080011600105001150009900114001010010100110000450010900111000980010500108001010004500097001100010000114001110010500100",
  debug: true,
  environment: SENTRY_ENVIRONMENT || 'production',
  tracesSampleRate: 1,
  sampleRate: 1,
  // integrations: (integrations) =>
  //   integrations.filter(
  //     (integration) =>
  //       !["TouchEvents", "UserInteraction"].includes(integration.name)
  //   ),
});

Sentry.captureMessage("Testing Sentry")

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const handleLogEnvironment = () => {
    console.log(SENTRY_ENVIRONMENT);
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>      
    <NetworkLogger />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <View style={styles.container}>
      <Button
        title="Test Sentry Post"
        onPress={() => Sentry.captureMessage("Testing Sentry POST")}
      />
        <Button title="Log Environment" onPress={handleLogEnvironment} />
      </View>
      <Button
  title="Send Message"
  onPress={() => {
    Sentry.captureMessage('holu', 'info');
  }}
/>

        <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
  },
  buttonSpacing: {
    marginVertical: 10, 
  },
});


export default Sentry.wrap(RootLayout);

import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>This is a stopwatch app with works cross platform on web, android and IOS. </ThemedText>
      <ThemedText type="defaultSemiBold">Build with React Native</ThemedText>
      <Image source={require('@/assets/images/react-logo.png')}/>
      {/* Bulleted List */}
      <ThemedText>Features include starting and pausing the timer, reset back to zero, and lap. Only a maximum of five laps are supported. Clear laps will reset lap count to zero.</ThemedText>
      <ExternalLink href="https://github.com/calebwestra/Stopwatch-Assignment">
        <ThemedText type="link">See Github repository.</ThemedText>

      </ExternalLink>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

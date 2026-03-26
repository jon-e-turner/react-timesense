import { defaultTheme } from '@/themes/default-theme';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.aboutScreen}>
      <View style={styles.headerRow}>
        <MaterialIcons
          name="bookmark"
          style={styles.appIcon}
        />
        <Text style={styles.appTitle}>TimeSense</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          This is a trainer project by Jon E. Turner that I hope other
          neuro-spicy folks also find useful. I am slowly building a more
          comprehensive app that will include TimeSense as a component, but this
          app will always be open source and MIT-licensed.
        </Text>
        <Text style={styles.infoText}>
          My goal was to create a combination reminder and timer app that I
          would actually use. The name is a play on how ADHD robs you of
          your&nbsp;
          <Link
            style={styles.link}
            href="https://health.clevelandclinic.org/time-blindness"
          >
            sense of time
          </Link>{' '}
          and the app tracks the time since an event occurred.
        </Text>
      </View>
      <View style={styles.footerRow}>
        <Link href="https://github.com/jon-e-turner/react-timesence">
          <MaterialCommunityIcons
            name="github"
            style={styles.linkIcon}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutScreen: {
    backgroundColor: defaultTheme.container.backgroundColor,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 8,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '12%',
  },
  appIcon: {
    fontSize: 80,
    color: '#25292e',
  },
  appTitle: {
    fontSize: 70,
    color: '#f0f0f0',
  },
  link: {
    color: '#ffd33d',
  },
  linkIcon: {
    fontSize: 80,
    color: '#ffd33d',
  },
  infoText: {
    fontSize: 20,
    color: '#f0f0f0',
    paddingBottom: 8,
    textAlign: 'justify',
  },
  hr: {
    borderBottomColor: '#25292e',
    borderBottomWidth: 8,
    marginStart: '7.5%', // Should always be half of 100 - width
    width: '85%',
  },
});

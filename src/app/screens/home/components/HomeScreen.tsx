import AppBar from '@/commons/components/app_bars/AppBar';
import Text from '@/commons/components/text/Text';

/**
 * Main screen of the application.
 */
export default function HomeScreen() {
  return (
    <>
      <_AppBar />
      <_Body />
    </>
  );
}

/**
 * App bar of HomeScreen.
 *
 * @see HomeScreen
 */
function _AppBar() {
  return (
    <AppBar>
      <Text>Text</Text>
    </AppBar>
  );
}

/**
 * _Body of HomeScreen.
 *
 * @see HomeScreen
 */
function _Body() {
  return (
    <Text>I lyke GIRLS</Text>
  );
}

import { ReactNode } from 'react';
import { View } from 'react-native';

/**
 * Appbar props.
 *
 * @see AppBar
 */
interface AppBarProps {
  children: ReactNode;
}

/**
 * Default app bar.
 */
export default function AppBar({
  children,
}: AppBarProps) {
  return (
    <View
      className={'border-b-[0.5px] border-b-secondary'}
    >{children}</View>
  );
}

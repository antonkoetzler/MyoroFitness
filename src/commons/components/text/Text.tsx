import clsx from 'clsx';
import { Text as RNText, TextProps } from 'react-native';

/**
 * Default text component.
 */
export default function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      className={
        clsx(
          'font-nunito-regular text-secondary text-lg',
          props.className,
        )
      }
    />
  );
}
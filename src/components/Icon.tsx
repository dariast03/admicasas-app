import Colors from "@/constants/Colors";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { useColorScheme } from "nativewind";

export enum IconType {
  MatetrialIcon,
  FontAweomseIcon,
  Ionicon,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  Fontisto,
  Feather,
}

export type TIcon = {
  icon:
    | {
        type: IconType.MatetrialIcon;
        name: keyof typeof MaterialIcons.glyphMap;
      }
    | {
        type: IconType.FontAweomseIcon;
        name: keyof typeof FontAwesome.glyphMap;
      }
    | { type: IconType.Ionicon; name: keyof typeof Ionicons.glyphMap }
    | { type: IconType.AntDesign; name: keyof typeof AntDesign.glyphMap }
    | {
        type: IconType.MaterialCommunityIcons;
        name: keyof typeof MaterialCommunityIcons.glyphMap;
      }
    | { type: IconType.EvilIcons; name: keyof typeof EvilIcons.glyphMap }
    | { type: IconType.Fontisto; name: keyof typeof Fontisto.glyphMap }
    | { type: IconType.Feather; name: keyof typeof Feather.glyphMap };
} & Omit<IconProps<keyof typeof FontAwesome.glyphMap>, "name">;

const Icon = ({ icon, ...props }: TIcon) => {
  const isDark = useColorScheme().colorScheme === "dark";

  return (
    <>
      {icon.type === IconType.FontAweomseIcon && (
        <FontAwesome
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}
      {icon.type === IconType.MatetrialIcon && (
        <MaterialIcons
          name={icon.name}
          size={20}
          color={isDark ? Colors.primario[100] : Colors.primario[600]}
          style={{
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.Ionicon && (
        <Ionicons
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.AntDesign && (
        <AntDesign
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.MaterialCommunityIcons && (
        <MaterialCommunityIcons
          name={icon.name}
          size={20}
          color={isDark ? Colors.primario[100] : Colors.primario[600]}
          style={{
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.EvilIcons && (
        <EvilIcons
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.Fontisto && (
        <Fontisto
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}

      {icon.type === IconType.Feather && (
        <Feather
          name={icon.name}
          size={20}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
          {...props}
        />
      )}
    </>
  );
};

export default Icon;

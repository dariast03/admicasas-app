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
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { useColorScheme } from "nativewind";

export enum IconType {
  MaterialIcon,
  FontAweomseIcon,
  Ionicon,
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
  Fontisto,
  Feather,
  FontAwesome5,
  Entypo,
}

export type TIcon = {
  icon:
    | {
        type: IconType.MaterialIcon;
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
    | { type: IconType.Feather; name: keyof typeof Feather.glyphMap }
    | { type: IconType.Entypo; name: keyof typeof Entypo.glyphMap }
    | { type: IconType.FontAwesome5; name: keyof typeof FontAwesome5.glyphMap };
} & Omit<IconProps<keyof typeof FontAwesome.glyphMap>, "name">;

const Icon = ({ icon, ...props }: TIcon) => {
  const isDark = useColorScheme().colorScheme === "dark";

  const color = props.color
    ? props.color
    : isDark
    ? Colors.primario[100]
    : Colors.primario[600];

  return (
    <>
      {icon.type === IconType.FontAweomseIcon && (
        <FontAwesome
          size={20}
          color={color}
          {...props}
          name={icon.name}
          style={{
            marginRight: 10,
          }}
        />
      )}
      {icon.type === IconType.MaterialIcon && (
        <MaterialIcons
          name={icon.name}
          size={20}
          color={color}
          {...props}
          style={{
            marginRight: 10,
          }}
        />
      )}

      {icon.type === IconType.Ionicon && (
        <Ionicons
          name={icon.name}
          size={20}
          color={color}
          {...props}
          style={{
            marginRight: 10,
          }}
        />
      )}

      {icon.type === IconType.AntDesign && (
        <AntDesign
          name={icon.name}
          size={20}
          color={color}
          {...props}
          style={{
            marginRight: 10,
          }}
        />
      )}

      {icon.type === IconType.MaterialCommunityIcons && (
        <MaterialCommunityIcons
          {...props}
          name={icon.name}
          size={20}
          style={{
            fontSize: 22,
            marginRight: 10,
          }}
          color={color}
        />
      )}

      {icon.type === IconType.EvilIcons && (
        <EvilIcons
          {...props}
          name={icon.name}
          size={20}
          color={color}
          style={{
            fontSize: 22,
            marginRight: 10,
          }}
        />
      )}

      {icon.type === IconType.Fontisto && (
        <Fontisto
          {...props}
          name={icon.name}
          size={20}
          color={color}
          style={{
            fontSize: 22,
            marginRight: 10,
          }}
        />
      )}

      {icon.type === IconType.Feather && (
        <Feather
          name={icon.name}
          size={props.size ? props.size : 20}
          color={props.color ? props.color : color}
          style={{
            marginRight: 10,
          }}
          {...props}
        />
      )}
      {icon.type === IconType.Entypo && (
        <Entypo
          name={icon.name}
          size={props.size ? props.size : 20}
          color={props.color ? props.color : color}
          style={{
            marginRight: 10,
          }}
          {...props}
        />
      )}
      {icon.type === IconType.FontAwesome5 && (
        <FontAwesome5
          size={20}
          name={icon.name}
          color={color}
          {...props}
          style={{
            marginRight: 10,
          }}
        />
      )}
    </>
  );
};

export default Icon;

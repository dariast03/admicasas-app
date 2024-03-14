import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as RNDropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import {
  DropdownProps,
  IDropdownRef,
} from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import Icon, { TIcon } from "./Icon";

type Props = {
  label: string;
  icon?: TIcon["icon"];
  error?: string;
  withAsterisk?: boolean;
  dropdownRef?: React.RefObject<IDropdownRef>;
  disabled?: boolean;
} & DropdownProps<any>;

const Dropdown: React.FC<Props> = ({
  label,
  icon,
  error,
  withAsterisk,
  dropdownRef,
  disabled,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const isDark = useColorScheme().colorScheme === "dark";

  const isError = !!error;

  return (
    <View style={styles.container}>
      <Text className="mb-1 text-md text-primario-600 dark:text-white font-bold">
        {label} {withAsterisk && <Text className="text-red-400">*</Text>}
      </Text>

      <View>
        <RNDropdown
          ref={dropdownRef}
          placeholder="Selecciona un item"
          {...props}
          onChange={(item) => {
            props.onChange && props.onChange(item);
            setIsFocus(false);
          }}
          style={[
            styles.dropdown,
            isError && { borderColor: "red" },
            isFocus && { borderColor: Colors.primario[700] },
            isDark
              ? { backgroundColor: Colors.primario[800] }
              : { backgroundColor: Colors.primario[100] },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            isDark
              ? { color: Colors.primario[100] }
              : { color: Colors.primario[600] },
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            isDark ? { color: "white" } : { color: Colors.primario[600] },
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          maxHeight={300}
          searchPlaceholder="Buscar..."
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          renderLeftIcon={() => (
            <>
              {icon && (
                <Icon
                  icon={icon}
                  style={{
                    color: isDark ? Colors.primario[900] : Colors.primario[100],
                    fontSize: 22,
                    marginRight: 10,
                  }}
                />
              )}

              {/* <AntDesign
            style={styles.icon}
            color={isDark ? Colors.primario[100] : Colors.primario[600]}
            name="Safety"
            size={20}
          /> */}
            </>
          )}
        />
        {disabled && (
          <View className="absolute top-0 right-0 bottom-0 left-0 bg-white/40"></View>
        )}
      </View>

      {error && <Text className="text-red-400">{error}</Text>}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  dropdown: {
    padding: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

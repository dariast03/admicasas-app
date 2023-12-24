import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, TextInput, TextInputProps } from "react-native";
import clsx from "clsx";
import Colors from "@/constants/Colors";
import { forwardRef, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Icon, { TIcon } from "./Icon";
import { setHours, setMinutes, setSeconds } from "date-fns";
import { useColorScheme } from "nativewind";

type Props = {
  label: string;
  icon?: TIcon["icon"];
  error?: string;
  password?: boolean;
  withAsterisk?: boolean;
  disabled?: boolean;
  //
  /*   type?: "text" | "calendar";
  mode?: AndroidNativeProps["mode"];
  name: string;
  onDateChange?: Function; */
} & TextInputProps;

type InputBase = {
  label: string;
  isFocused: boolean;
  error?: string;
  icon?: TIcon["icon"];
  withAsterisk?: boolean;
  disabled?: boolean;
};

const InputBase: React.FC<React.PropsWithChildren<InputBase>> = ({
  error,
  isFocused,
  label,
  icon,
  withAsterisk,
  disabled,
  children,
}) => {
  const isDark = useColorScheme().colorScheme === "dark";
  return (
    <View className="">
      <Text className="mb-1 text-md  font-bold">
        {label} {withAsterisk && <Text className="text-red-400">*</Text>}
      </Text>
      <View
        className={clsx([
          "bg-primario-100 dark:bg-primario-500 flex-row p-3  border-[0.5px]  rounded-lg items-center overflow-hidden",
          {
            "border-red-500": error,
            "border-primario-700 dark:border-primario-950 ":
              isFocused && !error,
            "border-primario-200 dark:border-primario-600":
              !error && !isFocused,
          },
        ])}
      >
        {icon && (
          <Icon
            icon={icon}
            style={{
              color: isDark ? Colors.primario[100] : Colors.primario[600],
              fontSize: 22,
              marginRight: 10,
            }}
          />
        )}
        {children}

        {disabled && (
          <View className="absolute top-0 right-0 bottom-0 left-0 bg-white/40"></View>
        )}
      </View>

      {error && <Text className="text-red-400">{error}</Text>}
    </View>
  );
};

export const InputText = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, withAsterisk, disabled, ...props }, ref) => {
    const [hidePassword, setHidePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);

    const isDark = useColorScheme().colorScheme === "dark";

    return (
      <InputBase
        label={label}
        isFocused={isFocused}
        error={error}
        icon={icon}
        withAsterisk={withAsterisk}
        disabled={disabled}
      >
        <TextInput
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          className="text-primario-600 dark:text-primario-100 flex-1 "
          textAlignVertical="top"
          {...props}
        />

        {password && (
          <MaterialCommunityIcons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: Colors.primario[600], fontSize: 22 }}
          />
        )}
      </InputBase>
    );
  }
);

export const InputDatePicker = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, withAsterisk, disabled, ...props }, ref) => {
    const isDark = useColorScheme().colorScheme === "dark";

    const parseFecha = (dateString: string) => {
      const dateValue = dateString;
      const dateSplit = dateValue.split(" ")[0].split("/");
      return new Date(`${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`);
    };

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(parseFecha(props.value || ""));

    const showDatePicker = () => {
      setShowDate(true);
      setShowTime(false);
    };

    const showTimePicker = () => {
      setShowTime(true);
      setShowDate(false);
    };

    const hideDate = () => {
      setShowDate(false);
      setShowTime(true);
    };

    const hideDateTime = () => {
      setShowDate(false);
      setShowTime(false);
    };

    const handleDateChange = (
      event: DateTimePickerEvent,
      selectedDate?: Date
    ) => {
      if (!selectedDate || event.type == "dismissed") return hideDateTime();
      hideDate();
      setDate(selectedDate);
      //@ts-ignore
      props.onChangeText && props.onChangeText(selectedDate);
    };

    const handleDateTimeChange = (
      event: DateTimePickerEvent,
      selectedDate?: Date
    ) => {
      if (!selectedDate || event.type == "dismissed") return hideDateTime();
      hideDateTime();
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const seconds = selectedDate.getSeconds();

      /*       const dateValue = props.value || "";
      const dateSplit = dateValue.split(" ")[0].split("/");
      const date = new Date(`${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`); */
      console.log(date);
      props.onChangeText &&
        props.onChangeText(
          //@ts-ignore
          setSeconds(setMinutes(setHours(date, hours), minutes), seconds)
        );
    };

    return (
      <InputBase
        label={label}
        isFocused={isFocused}
        error={error}
        icon={icon}
        withAsterisk={withAsterisk}
        disabled={disabled}
      >
        <TextInput
          ref={ref}
          editable={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-primario-600 dark:text-primario-100 flex-1"
          {...props}
          //   value={format(date, "dd/MM/yyyy HH:mm a")}
        />

        <MaterialCommunityIcons
          name="calendar"
          onPress={showDatePicker}
          style={{
            color: isDark ? Colors.primario[100] : Colors.primario[600],
            fontSize: 22,
            marginRight: 10,
          }}
        />

        {showDate && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={handleDateChange}
            accentColor={isDark ? Colors.primario[100] : Colors.primario[600]}
            textColor={isDark ? Colors.primario[100] : Colors.primario[600]}
            style={{
              backgroundColor: "red",
            }}
          />
        )}

        {showTime && (
          <DateTimePicker
            value={date}
            mode="time"
            onChange={handleDateTimeChange}
          />
        )}
      </InputBase>
    );
  }
);

export const InputCustom = forwardRef<TextInput, Props & { rightContent: any }>(
  ({ label, icon, error, rightContent, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <InputBase
        label={label}
        isFocused={isFocused}
        error={error}
        disabled={disabled}
      >
        <TextInput
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-primario-600 dark:text-primario-100 flex-1 mr-1"
          {...props}
        />

        {rightContent}
      </InputBase>
    );
  }
);

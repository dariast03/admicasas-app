import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import clsx from "clsx";
import Colors from "@/constants/Colors";
import { forwardRef, useState } from "react";
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Icon, { TIcon } from "./Icon";
import { Controller } from "react-hook-form";
import { format, setHours, setMinutes, setSeconds } from "date-fns";
import { useColorScheme } from "nativewind";

type Props = {
  label: string;
  icon?: TIcon["icon"];
  error?: string;
  password?: boolean;
  withAsterisk?: boolean;

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
};

const InputBase: React.FC<React.PropsWithChildren<InputBase>> = ({
  error,
  isFocused,
  label,
  icon,
  withAsterisk,
  children,
}) => {
  const isDark = useColorScheme().colorScheme === "dark";
  return (
    <View>
      <Text className="mb-1 text-md  font-bold">
        {label} {withAsterisk && <Text className="text-red-400">*</Text>}
      </Text>
      <View
        className={clsx([
          "bg-primario-100 dark:bg-primario-500 flex-row p-3  border-[0.5px]  rounded-lg items-center",
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
      </View>

      {error && <Text className="text-red-400">{error}</Text>}
    </View>
  );
};

export const InputText = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, withAsterisk, ...props }, ref) => {
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
  ({ label, icon, error, password, withAsterisk, ...props }, ref) => {
    const isDark = useColorScheme().colorScheme === "dark";

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(new Date());

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
      setDate(setSeconds(setMinutes(setHours(date, hours), minutes), seconds));
    };

    return (
      <InputBase
        label={label}
        isFocused={isFocused}
        error={error}
        icon={icon}
        withAsterisk={withAsterisk}
      >
        <TextInput
          ref={ref}
          editable={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-primario-600 dark:text-primario-100 flex-1"
          {...props}
          value={format(date, "dd/MM/yyyy HH:mm a")}
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
  ({ label, icon, error, rightContent, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <InputBase label={label} isFocused={isFocused} error={error}>
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

export const CustomInput = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, ...props }, ref) => {
    const [hidePassword, setHidePassword] = useState(password);
    const [isFocused, setIsFocused] = useState(false);

    const isDark = useColorScheme().colorScheme === "dark";

    return (
      <View>
        <Text className="mb-1 text-md  font-bold">{label}</Text>
        <View
          className={clsx([
            "bg-primario-100 dark:bg-primario-500 flex-row p-3  border  rounded-lg items-center",
            {
              "border-red-500": error,
              "border-primario-700 ": isFocused && !error,
              "border-primario-200": !error && !isFocused,
            },
          ])}
        >
          {icon && (
            <Icon
              icon={icon}
              onPress={() => setHidePassword(!hidePassword)}
              style={{
                color: isDark ? Colors.primario[100] : Colors.primario[600],
                fontSize: 22,
                marginRight: 10,
                /* padding: 3, */
              }}
            />
          )}

          <TextInput
            ref={ref}
            autoCorrect={false}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            secureTextEntry={hidePassword}
            className="text-primario-600 dark:text-primario-100 flex-1"
            {...props}
          />

          {password && (
            <MaterialCommunityIcons
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              style={{ color: Colors.primario[600], fontSize: 22 }}
            />
          )}
        </View>

        {error && <Text className="text-red-400">{error}</Text>}
      </View>
    );
  }
);

export const CustomInputCalendar = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, ...props }, ref) => {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(new Date());

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
      setDate(setSeconds(setMinutes(setHours(date, hours), minutes), seconds));
    };

    return (
      <View>
        <Text className="mb-1 text-md font-bold">{label}</Text>
        <View
          className={clsx([
            "bg-primario-100 dark:bg-primario-500 flex-row p-3  border  rounded-lg items-center",
            {
              "border-red-500": error,
              "border-primario-700 ": isFocused && !error,
              "border-primario-200": !error && !isFocused,
            },
          ])}
        >
          <TouchableOpacity onPress={showTimePicker}>
            <MaterialCommunityIcons
              name="clock-outline"
              style={{
                color: Colors.primario[600],
                fontSize: 22,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TextInput
            {...props}
            value={format(date, "dd/MM/yyyy HH:mm a")}
            editable={false}
            style={{ flex: 1, color: Colors.primario[600] }}
          />

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
            />
          )}

          <MaterialCommunityIcons
            name="calendar"
            onPress={showDatePicker}
            style={{
              color: Colors.primario[600],
              fontSize: 22,
              marginRight: 10,
            }}
          />

          {showTime && (
            <DateTimePicker
              value={date}
              mode="time"
              onChange={handleDateTimeChange}
            />
          )}
        </View>

        {error && <Text className="text-red-400">{error}</Text>}
      </View>
    );
  }
);

export const CustomInputFile = forwardRef<TextInput, Props>(
  ({ label, icon, error, password, ...props }, ref) => {
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(new Date());

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
      setDate(setSeconds(setMinutes(setHours(date, hours), minutes), seconds));
    };

    return (
      <View>
        <Text className="mb-1 text-md font-bold">{label}</Text>
        <View
          className={clsx([
            "bg-primario-100 dark:bg-primario-500 flex-row p-3  border  rounded-lg items-center",
            {
              "border-red-500": error,
              "border-primario-700 ": isFocused && !error,
              "border-primario-200": !error && !isFocused,
            },
          ])}
        >
          <TouchableOpacity onPress={showTimePicker}>
            <MaterialCommunityIcons
              name="clock-outline"
              style={{
                color: Colors.primario[600],
                fontSize: 22,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>

          <TextInput
            {...props}
            value={format(date, "dd/MM/yyyy HH:mm a")}
            editable={false}
            style={{ flex: 1, color: Colors.primario[600] }}
          />

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={handleDateChange}
            />
          )}

          <MaterialCommunityIcons
            name="calendar"
            onPress={showDatePicker}
            style={{
              color: Colors.primario[600],
              fontSize: 22,
              marginRight: 10,
            }}
          />

          {showTime && (
            <DateTimePicker
              value={date}
              mode="time"
              onChange={handleDateTimeChange}
            />
          )}
        </View>

        {error && <Text className="text-red-400">{error}</Text>}
      </View>
    );
  }
);
